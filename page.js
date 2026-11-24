// Page d'accueil : la langue (français d'abord, anglais au choix), les réglages, la liste d'attente.
(function () {
  var R = window.REGLAGES || {};
  var T = window.TEXTES;
  var racine = document.documentElement;
  var mots = {};

  function langueDeDepart() {
    var voulue = new URLSearchParams(location.search).get('lang');
    if (voulue === 'fr' || voulue === 'en') return voulue;
    try {
      var gardee = localStorage.getItem('langue');
      if (gardee === 'fr' || gardee === 'en') return gardee;
    } catch (e) {}
    return (navigator.language || 'fr').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
  }

  function poser(langue) {
    mots = {};
    Object.keys(T[langue]).forEach(function (k) {
      mots[k] = T[langue][k].split('{nom}').join(R.nom || '');
    });
    racine.lang = langue;
    document.title = mots['titre-page'];
    document.querySelectorAll('[data-t]').forEach(function (el) {
      var mot = mots[el.getAttribute('data-t')];
      if (mot) el.textContent = mot;
    });
    document.querySelectorAll('[data-t-alt]').forEach(function (el) {
      var mot = mots[el.getAttribute('data-t-alt')];
      if (mot) el.setAttribute('alt', mot);
    });
    document.querySelectorAll('[data-t-exemple]').forEach(function (el) {
      var mot = mots[el.getAttribute('data-t-exemple')];
      if (mot) el.setAttribute('placeholder', mot);
    });
    var b = document.getElementById('bouton-langue');
    if (b) b.lang = langue === 'fr' ? 'en' : 'fr';
    // Un message déjà affiché sous la liste d'attente suit la langue ; un envoi en cours garde son mot.
    if (etatListe) dire(etatListe);
    if (bouton && bouton.disabled) bouton.textContent = mots['liste-envoi'];
  }

  // ---- Le nom, partout d'un coup ----
  document.querySelectorAll('[data-nom]').forEach(function (el) {
    if (R.nom) el.textContent = R.nom;
  });
  var marque = document.querySelector('.marque');
  if (marque && R.nom) marque.setAttribute('aria-label', R.nom);

  // ---- Les réglages : chaque chose branchée se montre, chaque chose vide dit « bientôt » ----
  function brancher(nom, valeur) {
    racine.setAttribute('data-' + nom, valeur ? 'oui' : 'non');
    document.querySelectorAll('[data-lien="' + nom + '"]').forEach(function (a) {
      if (valeur) a.href = valeur;
    });
  }
  brancher('code', R.adresseCode);
  brancher('avis', R.adresseAvis);
  brancher('appli', R.adresseAppli);
  // La liste d'attente : le formulaire de Brevo s'il est donné, sinon le champ de la page (serveur maison), sinon « pas encore ».
  brancher('formulaire', R.adresseFormulaire);
  var champMaison = !R.adresseFormulaire && R.adresseListe;
  racine.setAttribute('data-liste', champMaison ? 'oui' : 'non');
  racine.setAttribute('data-attente', R.adresseFormulaire || R.adresseListe ? 'oui' : 'non');

  // ---- La liste d'attente : rien ne se perd pendant l'envoi ----
  var formulaire = document.getElementById('liste-formulaire');
  var champ = document.getElementById('liste-courriel');
  var bouton = document.getElementById('liste-bouton');
  var message = document.getElementById('liste-message');
  var reussite = document.getElementById('liste-reussite');
  var etatListe = '';

  function dire(etat) {
    etatListe = etat;
    if (!message) return;
    // La réussite remplace le formulaire ; le reste s'écrit contre le champ.
    var ou = etat === 'ok' ? reussite : message;
    message.textContent = '';
    reussite.textContent = '';
    ou.textContent = etat ? mots['liste-' + etat] : '';
    message.setAttribute('data-etat', etat);
    if (champ) champ.setAttribute('aria-invalid', String(etat === 'invalide' || etat === 'vide'));
  }

  if (formulaire && champMaison) {
    formulaire.addEventListener('submit', function (e) {
      e.preventDefault();
      var adresse = champ.value.trim();
      if (!adresse) {
        dire('vide');
        champ.focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(adresse)) {
        dire('invalide');
        champ.focus();
        return;
      }
      // Pendant l'envoi, ce qui est tapé est gelé jusqu'à la réponse.
      champ.readOnly = true;
      bouton.disabled = true;
      bouton.textContent = mots['liste-envoi'];
      dire('');
      fetch(R.adresseListe, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adresse, langue: racine.lang }),
      })
        .then(function (r) {
          if (!r.ok) throw new Error('refus');
          formulaire.setAttribute('data-fait', 'oui');
          dire('ok');
        })
        .catch(function () {
          champ.readOnly = false;
          bouton.disabled = false;
          bouton.textContent = mots['liste-bouton'];
          dire('erreur');
        });
    });
  }

  // Dès qu'on retape, le message d'erreur s'efface.
  if (champ)
    champ.addEventListener('input', function () {
      if (etatListe && etatListe !== 'ok') dire('');
    });

  // ---- Remonter en haut ----
  var haut = document.getElementById('haut');
  if (haut)
    haut.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (marque) marque.focus({ preventScroll: true });
    });

  // ---- La langue ----
  var boutonLangue = document.getElementById('bouton-langue');
  if (boutonLangue)
    boutonLangue.addEventListener('click', function () {
      var l = racine.lang === 'fr' ? 'en' : 'fr';
      try {
        localStorage.setItem('langue', l);
      } catch (e) {}
      // Le choix fait ici passe avant un « ?lang= » resté dans l'adresse.
      var adresse = new URL(location.href);
      if (adresse.searchParams.has('lang')) {
        adresse.searchParams.delete('lang');
        history.replaceState(null, '', adresse);
      }
      poser(l);
    });
  poser(langueDeDepart());
})();
