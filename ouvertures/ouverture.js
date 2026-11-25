// Le plateau des pages « ouvertures » : on avance coup par coup, une phrase simple sous chaque coup.
// Les coups et les phrases viennent du fichier donnees.js de chaque page (window.OUVERTURE).
// Ce programme ne juge pas les coups : il les rejoue tels qu'ils sont écrits (vérifiés avant, à part).
// « cote: 'noirs' » dans les données : le plateau est montré Noirs en bas (cases, pièces, repères et surlignage suivent).
// « reflexe: { depuis, coups } » dans les données (facultatif) : la suite du bon réflexe. Un bouton « Voir sur le plateau »
// apparaît alors dans le bon réflexe : il garde les « depuis » premiers demi-coups de la ligne principale, puis joue « coups ».
(function () {
  var D = window.OUVERTURE;
  var racine = document.getElementById('ouverture-plateau');
  if (!D || !D.coups || !racine) return;

  var NS = 'http://www.w3.org/2000/svg';
  var C = 100; // côté d'une case, dans le dessin
  var COLONNES = 'abcdefgh';
  var NOMS = { K: 'roi', Q: 'dame', R: 'tour', B: 'fou', N: 'cavalier', P: 'pion' };

  // ---- Les positions, calculées une fois : la case 0 est a8, la case 63 est h1 ----
  function numero(nom) {
    return COLONNES.indexOf(nom.charAt(0)) + (8 - Number(nom.charAt(1))) * 8;
  }
  function depart() {
    var b = [];
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'.split('/').forEach(function (rangee) {
      rangee.split('').forEach(function (c) {
        if (c >= '1' && c <= '8') for (var k = 0; k < Number(c); k++) b.push('');
        else b.push((c === c.toUpperCase() ? 'w' : 'b') + c.toUpperCase());
      });
    });
    return b;
  }
  function jouer(avant, coup) {
    var b = avant.slice();
    var de = numero(coup.de);
    var vers = numero(coup.vers);
    var piece = b[de];
    // La prise en passant : un pion change de colonne et arrive sur une case vide.
    if (piece.charAt(1) === 'P' && de % 8 !== vers % 8 && !b[vers]) b[(de >> 3) * 8 + (vers % 8)] = '';
    b[de] = '';
    b[vers] = coup.promotion ? piece.charAt(0) + coup.promotion : piece;
    // Le roque : le roi fait deux pas, la tour saute par-dessus.
    if (piece.charAt(1) === 'K' && Math.abs(de - vers) === 2) {
      var coinTour = vers > de ? de + 3 : de - 4;
      b[(de + vers) / 2] = b[coinTour];
      b[coinTour] = '';
    }
    return b;
  }
  // La suite montrée : la ligne principale, ou celle du bon réflexe quand on la demande.
  var coups = D.coups;
  var positions = [];
  var dernier = 0;
  function calculer() {
    positions = [depart()];
    coups.forEach(function (coup, i) {
      positions.push(jouer(positions[i], coup));
    });
    dernier = coups.length;
  }
  calculer();
  var retourne = D.cote === 'noirs';

  // ---- Les petits outils ----
  function el(nom, classe, parent) {
    var e = document.createElement(nom);
    if (classe) e.className = classe;
    if (parent) parent.appendChild(e);
    return e;
  }
  function svg(nom, attributs, parent) {
    var e = document.createElementNS(NS, nom);
    Object.keys(attributs || {}).forEach(function (k) {
      e.setAttribute(k, attributs[k]);
    });
    if (parent) parent.appendChild(e);
    return e;
  }
  function vider(e) {
    while (e.firstChild) e.removeChild(e.firstChild);
  }
  // Où se dessine la case i. Plateau retourné : a8 passe en bas à droite, h1 en haut à gauche.
  function coin(i) {
    var colonne = i % 8;
    var rangee = i >> 3;
    if (retourne) {
      colonne = 7 - colonne;
      rangee = 7 - rangee;
    }
    return { x: colonne * C, y: rangee * C };
  }
  // « 3. Fc4 » pour les Blancs, « 3… Fc5 » pour les Noirs.
  function etiquette(n) {
    var tour = Math.ceil(n / 2);
    return tour + (n % 2 ? '. ' : '… ') + coups[n - 1].nom;
  }

  // ---- La carte, construite une fois ----
  vider(racine);
  var carte = el('div', 'ouv-carte', racine);
  var plateau = el('div', retourne ? 'ouv-plateau ouv-retourne' : 'ouv-plateau', carte);
  var dessin = svg('svg', { viewBox: '0 0 800 800', role: 'img', class: 'ouv-dessin' }, plateau);
  var coucheCases = svg('g', {}, dessin);
  var coucheMarques = svg('g', {}, dessin);
  var coucheReperes = svg('g', { 'aria-hidden': 'true' }, dessin);
  var couchePieces = svg('g', {}, dessin);
  // Les repères, comme sur l'accueil : discrets, dans le coin de la case, sous les pièces.
  // Le chiffre en haut à gauche de la colonne de gauche, la lettre en bas à droite de la rangée du bas (ils suivent le retournement).
  for (var i = 0; i < 64; i++) {
    var p = coin(i);
    var claire = ((i % 8) + (i >> 3)) % 2 === 0;
    svg('rect', { x: p.x, y: p.y, width: C, height: C, class: claire ? 'ouv-claire' : 'ouv-foncee' }, coucheCases);
    var ton = claire ? 'ouv-repere ouv-sur-claire' : 'ouv-repere ouv-sur-foncee';
    if (p.x === 0) svg('text', { x: 7, y: p.y + 22, class: ton }, coucheReperes).textContent = String(8 - (i >> 3));
    if (p.y === 700) svg('text', { x: p.x + 93, y: 791, class: ton + ' ouv-a-droite' }, coucheReperes).textContent = COLONNES.charAt(i % 8);
  }

  // Les boutons se tiennent juste sous le plateau : rien au-dessus d'eux ne change de hauteur, ils ne bougent donc jamais.
  var boutons = el('div', 'ouv-boutons', carte);
  var bAvant = el('button', 'ouv-bouton ouv-precedent', boutons);
  bAvant.type = 'button';
  bAvant.textContent = 'Précédent';
  var bApres = el('button', 'ouv-bouton ouv-suivant', boutons);
  bApres.type = 'button';
  bApres.textContent = 'Suivant';

  // Le texte du moment, lu à voix haute quand il change. Derrière lui, invisibles, toutes les phrases de la page
  // (la ligne principale et celle du bon réflexe) : elles gardent la place de la plus longue, à toutes les largeurs,
  // et rien ne bouge sous le texte non plus quand la phrase change.
  var texte = el('div', 'ouv-texte', carte);
  var courant = el('div', 'ouv-courant', texte);
  courant.setAttribute('aria-live', 'polite');
  var titreCoup = el('p', 'ouv-coup', courant);
  var phrase = el('p', 'ouv-phrase', courant);
  [{ nom: 'Départ', phrase: D.phraseDepart || '' }]
    .concat(D.coups, (D.reflexe && D.reflexe.coups) || [])
    .forEach(function (t) {
      var gabarit = el('div', 'ouv-gabarit', texte);
      gabarit.setAttribute('aria-hidden', 'true');
      el('p', 'ouv-coup', gabarit).textContent = t.nom;
      el('p', 'ouv-phrase', gabarit).textContent = t.phrase;
    });

  // La suite entière, chaque coup se touche.
  var liste = el('ol', 'ouv-suite', carte);
  liste.setAttribute('aria-label', 'Tous les coups');
  var pastilles = [];
  function lister() {
    vider(liste);
    pastilles = [];
    var ligne = null;
    coups.forEach(function (coup, k) {
      if (k % 2 === 0) {
        ligne = el('li', 'ouv-tour', liste);
        el('span', 'ouv-rang', ligne).textContent = k / 2 + 1 + '.';
      }
      var b = el('button', 'ouv-pastille', ligne);
      b.type = 'button';
      b.textContent = coup.nom;
      b.setAttribute('aria-label', etiquette(k + 1));
      b.addEventListener('click', function () {
        aller(k + 1);
      });
      pastilles.push(b);
    });
  }
  lister();
  el('p', 'ouv-aide', carte).textContent = 'Au clavier\u00a0: les flèches ← et →.';

  // ---- Montrer une position ----
  var rang = -1;
  function decrire(n) {
    var vue = retourne ? 'L’échiquier vu du côté des Noirs' : 'L’échiquier';
    return n === 0 ? vue + ', position de départ.' : vue + ' après ' + etiquette(n) + '.';
  }
  function aller(n) {
    n = Math.max(0, Math.min(dernier, n));
    if (n === rang) return;
    rang = n;
    var b = positions[n];
    vider(couchePieces);
    vider(coucheMarques);
    if (n > 0) {
      [coups[n - 1].de, coups[n - 1].vers].forEach(function (nom) {
        var p = coin(numero(nom));
        svg('rect', { x: p.x, y: p.y, width: C, height: C, class: 'ouv-marque' }, coucheMarques);
      });
    }
    for (var i = 0; i < 64; i++) {
      if (!b[i]) continue;
      var p = coin(i);
      svg('image', { href: '/images/pieces/' + b[i] + '.svg', x: p.x, y: p.y, width: C, height: C }, couchePieces);
    }
    dessin.setAttribute('aria-label', decrire(n));
    titreCoup.textContent = n === 0 ? 'Départ' : etiquette(n);
    phrase.textContent = n === 0 ? D.phraseDepart || '' : coups[n - 1].phrase;
    bAvant.disabled = n === 0;
    bApres.disabled = n === dernier;
    pastilles.forEach(function (pastille, k) {
      if (k === n - 1) pastille.setAttribute('aria-current', 'step');
      else pastille.removeAttribute('aria-current');
    });
  }

  bAvant.addEventListener('click', function () {
    aller(rang - 1);
  });
  bApres.addEventListener('click', function () {
    aller(rang + 1);
  });
  // Les flèches du clavier, partout dans la page (sauf si on écrit quelque part, ou avec une touche spéciale).
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var ou = e.target && e.target.tagName;
    if (ou === 'INPUT' || ou === 'TEXTAREA' || ou === 'SELECT') return;
    if (e.key === 'ArrowRight') aller(rang + 1);
    else if (e.key === 'ArrowLeft') aller(rang - 1);
    else return;
    e.preventDefault();
  });

  // ---- Le bon réflexe sur le plateau : aller, puis retour à la ligne principale ----
  var R = D.reflexe;
  var cadreReflexe = document.querySelector('.ouv-reflexe-corps');
  if (R && R.coups && R.coups.length && cadreReflexe) {
    var enReflexe = false;
    var rangAvant = 0;
    var changer = function (suite, n) {
      coups = suite;
      calculer();
      lister();
      rang = -1;
      aller(n);
    };
    var bRetour = el('button', 'ouv-bouton ouv-retour');
    bRetour.type = 'button';
    bRetour.textContent = 'Revenir à la ligne principale';
    bRetour.hidden = true;
    carte.insertBefore(bRetour, liste);
    var bVoir = el('button', 'ouv-voir', el('p', 'ouv-voir-place', cadreReflexe));
    bVoir.type = 'button';
    bVoir.textContent = 'Voir sur le plateau';
    bVoir.addEventListener('click', function () {
      if (!enReflexe) rangAvant = rang;
      enReflexe = true;
      changer(D.coups.slice(0, R.depuis).concat(R.coups), R.depuis + 1);
      bRetour.hidden = false;
      var calme = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      racine.scrollIntoView({ behavior: calme ? 'auto' : 'smooth', block: 'start' });
      bApres.focus({ preventScroll: true });
    });
    bRetour.addEventListener('click', function () {
      enReflexe = false;
      changer(D.coups, rangAvant);
      bRetour.hidden = true;
      (bApres.disabled ? bAvant : bApres).focus({ preventScroll: true });
    });
  }

  aller(typeof D.depart === 'number' ? D.depart : 0);
  // Téléphone avec peu de hauteur : le plateau rapetisse juste assez pour que les boutons se voient à l'arrivée,
  // sans défiler. Recalculé seulement quand la largeur change (pas quand la barre du navigateur se replie).
  var largeurVue = -1;
  function ajuster(force) {
    var l = document.documentElement.clientWidth;
    if (!force && l === largeurVue) return;
    largeurVue = l;
    plateau.style.maxWidth = '';
    if (!window.matchMedia || !window.matchMedia('(max-width: 899px)').matches) return;
    var cote = plateau.getBoundingClientRect().width;
    var bas = boutons.getBoundingClientRect().bottom + (window.pageYOffset || 0);
    var place = document.documentElement.clientHeight - (bas - cote) - 12;
    if (place < cote) plateau.style.maxWidth = Math.max(216, Math.floor(place)) + 'px';
  }
  ajuster(true);
  window.addEventListener('resize', function () {
    ajuster(false);
  });
  window.addEventListener('load', function () {
    ajuster(true);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      ajuster(true);
    });
  }
  racine.classList.add('ouv-pret');
})();
