// Le plateau des pages « Les mots des échecs en clair » : UNE position, les cases importantes surlignées,
// et un bouton « Montre-moi » qui joue le premier coup. Ensuite on avance à son rythme : « Suivant », « Précédent ».
// À la fin, « Suivant » s'éteint et « Recommencer » apparaît sous la phrase, à une autre place :
// un double toucher trop rapide ne ramène jamais au départ. Comme sur les pages « ouvertures ».
// La position (en FEN), les cases et les coups viennent du fichier donnees.js de chaque page (window.MOT).
// Ce programme ne juge pas les coups : il les rejoue tels qu'ils sont écrits (vérifiés avant, à part).
(function () {
  var D = window.MOT;
  var racine = document.getElementById('mot-plateau');
  if (!D || !D.fen || !D.coups || !racine) return;

  var NS = 'http://www.w3.org/2000/svg';
  var C = 100; // côté d'une case, dans le dessin
  var COLONNES = 'abcdefgh';

  // ---- Les positions, calculées une fois : la case 0 est a8, la case 63 est h1 ----
  function numero(nom) {
    return COLONNES.indexOf(nom.charAt(0)) + (8 - Number(nom.charAt(1))) * 8;
  }
  function lire(fen) {
    var b = [];
    fen
      .split(' ')[0]
      .split('/')
      .forEach(function (rangee) {
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
  var positions = [lire(D.fen)];
  if (positions[0].length !== 64) return;
  D.coups.forEach(function (coup, i) {
    positions.push(jouer(positions[i], coup));
  });
  var dernier = D.coups.length;
  // Qui joue le premier coup : écrit dans la FEN (« w » les Blancs, « b » les Noirs).
  var noirsDabord = D.fen.split(' ')[1] === 'b';

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
  function coin(i) {
    return { x: (i % 8) * C, y: (i >> 3) * C };
  }
  // « 1. f4 » pour les Blancs, « 1… Rd7 » pour les Noirs.
  function etiquette(n) {
    var demi = n + (noirsDabord ? 1 : 0);
    return Math.ceil(demi / 2) + (demi % 2 ? '. ' : '… ') + D.coups[n - 1].nom;
  }

  // ---- La carte, construite une fois ----
  vider(racine);
  var carte = el('div', 'mot-carte-plateau', racine);
  var plateau = el('div', 'mot-plateau', carte);
  var dessin = svg('svg', { viewBox: '0 0 800 800', role: 'img', class: 'mot-dessin' }, plateau);
  var coucheCases = svg('g', {}, dessin);
  var coucheMarques = svg('g', {}, dessin);
  var coucheReperes = svg('g', { 'aria-hidden': 'true' }, dessin);
  var couchePieces = svg('g', {}, dessin);
  // Les repères, comme sur l'accueil : discrets, dans le coin de la case, sous les pièces.
  // Le chiffre en haut à gauche de la colonne de gauche, la lettre en bas à droite de la rangée du bas.
  for (var i = 0; i < 64; i++) {
    var p = coin(i);
    var claire = ((i % 8) + (i >> 3)) % 2 === 0;
    svg('rect', { x: p.x, y: p.y, width: C, height: C, class: claire ? 'mot-claire' : 'mot-foncee' }, coucheCases);
    var ton = claire ? 'mot-repere mot-sur-claire' : 'mot-repere mot-sur-foncee';
    if (p.x === 0) svg('text', { x: 7, y: p.y + 22, class: ton }, coucheReperes).textContent = String(8 - (i >> 3));
    if (p.y === 700) svg('text', { x: p.x + 93, y: 791, class: ton + ' mot-a-droite' }, coucheReperes).textContent = COLONNES.charAt(i % 8);
  }

  // Les deux boutons, juste sous le plateau, toujours à la même place. Celui de droite change de mot :
  // « Montre-moi » au départ, « Suivant » ensuite (éteint à la fin).
  var boutons = el('div', 'mot-boutons', carte);
  var bAvant = el('button', 'mot-bouton mot-precedent', boutons);
  bAvant.type = 'button';
  bAvant.textContent = 'Précédent';
  var bApres = el('button', 'mot-bouton', boutons);
  bApres.type = 'button';

  // Le texte du moment, lu à voix haute quand il change. Derrière lui, invisibles, tous les textes de l'exemple :
  // ils gardent la place du plus long, et rien ne bouge sous le texte quand la phrase change.
  var texte = el('div', 'mot-texte', carte);
  var courant = el('div', 'mot-courant', texte);
  courant.setAttribute('aria-live', 'polite');
  var titreCoup = el('p', 'mot-coup', courant);
  var phrase = el('p', 'mot-phrase', courant);
  // « Recommencer » : sous la dernière phrase, seulement à la fin.
  var bRecommencer = el('button', 'mot-recommencer', courant);
  bRecommencer.type = 'button';
  bRecommencer.textContent = 'Recommencer';
  bRecommencer.hidden = true;
  [{ titre: D.titreDepart || 'La position', phrase: D.phraseDepart || '' }]
    .concat(
      D.coups.map(function (coup, k) {
        return { titre: etiquette(k + 1), phrase: coup.phrase };
      })
    )
    .forEach(function (t) {
      var gabarit = el('div', 'mot-gabarit', texte);
      gabarit.setAttribute('aria-hidden', 'true');
      el('p', 'mot-coup', gabarit).textContent = t.titre;
      el('p', 'mot-phrase', gabarit).textContent = t.phrase;
    });
  // La place de « Recommencer » est gardée derrière la dernière phrase : rien ne bouge quand il apparaît.
  el('span', 'mot-recommencer', texte.lastChild).textContent = 'Recommencer';

  // ---- Montrer une position ----
  var rang = 0;
  function montrer(n) {
    rang = n;
    var b = positions[n];
    var coup = n > 0 ? D.coups[n - 1] : null;
    vider(couchePieces);
    vider(coucheMarques);
    // Au départ : les cases importantes du mot. Ensuite : les cases du coup (ou celles que la page a choisies).
    var cases = coup ? coup.cases || [coup.de, coup.vers] : D.cases || [];
    cases.forEach(function (nom) {
      var p = coin(numero(nom));
      svg('rect', { x: p.x, y: p.y, width: C, height: C, class: coup ? 'mot-marque' : 'mot-marque mot-marque-depart' }, coucheMarques);
    });
    for (var i = 0; i < 64; i++) {
      if (!b[i]) continue;
      var p = coin(i);
      svg('image', { href: '/images/pieces/' + b[i] + '.svg', x: p.x, y: p.y, width: C, height: C }, couchePieces);
    }
    dessin.setAttribute('aria-label', coup ? 'L’échiquier après ' + etiquette(n) + '.' : D.description || 'L’échiquier de l’exemple.');
    titreCoup.textContent = coup ? etiquette(n) : D.titreDepart || 'La position';
    phrase.textContent = coup ? coup.phrase : D.phraseDepart || '';
    var etat = n === 0 ? 'depart' : n === dernier ? 'fini' : 'joue';
    carte.setAttribute('data-etat', etat);
    bAvant.disabled = n === 0;
    bApres.textContent = etat === 'depart' ? 'Montre-moi' : 'Suivant';
    bApres.className = 'mot-bouton ' + (etat === 'depart' ? 'mot-bouton-montre' : 'mot-suivant');
    var auClavier = document.activeElement === bApres || document.activeElement === bRecommencer;
    bApres.disabled = etat === 'fini';
    bRecommencer.hidden = etat !== 'fini';
    // Le clavier ne reste jamais sur un bouton éteint ou caché.
    if (auClavier) (etat === 'fini' ? bRecommencer : bApres).focus({ preventScroll: true });
  }
  // Chaque toucher compte : aucun n'est mis de côté.
  bApres.addEventListener('click', function () {
    if (rang < dernier) montrer(rang + 1);
  });
  bRecommencer.addEventListener('click', function () {
    montrer(0);
  });
  bAvant.addEventListener('click', function () {
    if (rang > 0) montrer(rang - 1);
    // Revenu au départ, « Précédent » s'éteint : le clavier passe au bouton d'à côté.
    if (rang === 0) bApres.focus({ preventScroll: true });
  });

  montrer(0);
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
  racine.classList.add('mot-pret');
})();
