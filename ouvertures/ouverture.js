// Le plateau des pages « ouvertures » : on avance coup par coup, une phrase simple sous chaque coup.
// Les coups et les phrases viennent du fichier donnees.js de chaque page (window.OUVERTURE).
// Ce programme ne juge pas les coups : il les rejoue tels qu'ils sont écrits (vérifiés avant, à part).
// « cote: 'noirs' » dans les données : le plateau est montré Noirs en bas (cases, pièces, repères et surlignage suivent).
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
  var positions = [depart()];
  D.coups.forEach(function (coup, i) {
    positions.push(jouer(positions[i], coup));
  });
  var dernier = D.coups.length;
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
    return tour + (n % 2 ? '. ' : '… ') + D.coups[n - 1].nom;
  }

  // ---- La carte, construite une fois ----
  vider(racine);
  var carte = el('div', 'ouv-carte', racine);
  var plateau = el('div', retourne ? 'ouv-plateau ouv-retourne' : 'ouv-plateau', carte);
  var dessin = svg('svg', { viewBox: '0 0 800 800', role: 'img', class: 'ouv-dessin' }, plateau);
  var coucheCases = svg('g', {}, dessin);
  var coucheMarques = svg('g', {}, dessin);
  var couchePieces = svg('g', {}, dessin);
  // Les repères sont dessinés par-dessus les pièces, dans le coin de la case : une pièce ne les cache jamais.
  // Le chiffre en haut à gauche de la colonne de gauche, la lettre en bas à droite de la rangée du bas (ils suivent le retournement).
  var coucheReperes = svg('g', { 'aria-hidden': 'true' }, dessin);
  for (var i = 0; i < 64; i++) {
    var p = coin(i);
    var claire = ((i % 8) + (i >> 3)) % 2 === 0;
    svg('rect', { x: p.x, y: p.y, width: C, height: C, class: claire ? 'ouv-claire' : 'ouv-foncee' }, coucheCases);
    var ton = claire ? 'ouv-repere ouv-sur-claire' : 'ouv-repere ouv-sur-foncee';
    if (p.x === 0) svg('text', { x: 5, y: p.y + 3, dy: '0.8em', class: ton }, coucheReperes).textContent = String(8 - (i >> 3));
    if (p.y === 700) svg('text', { x: p.x + 96, y: 794, class: ton + ' ouv-a-droite' }, coucheReperes).textContent = COLONNES.charAt(i % 8);
  }

  var texte = el('div', 'ouv-texte', carte);
  texte.setAttribute('aria-live', 'polite');
  var titreCoup = el('p', 'ouv-coup', texte);
  var phrase = el('p', 'ouv-phrase', texte);

  var boutons = el('div', 'ouv-boutons', carte);
  var bAvant = el('button', 'ouv-bouton ouv-precedent', boutons);
  bAvant.type = 'button';
  bAvant.textContent = 'Précédent';
  var bApres = el('button', 'ouv-bouton ouv-suivant', boutons);
  bApres.type = 'button';
  bApres.textContent = 'Suivant';

  // La suite entière, chaque coup se touche.
  var liste = el('ol', 'ouv-suite', carte);
  liste.setAttribute('aria-label', 'Tous les coups');
  var pastilles = [];
  var ligne = null;
  D.coups.forEach(function (coup, k) {
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
  el('p', 'ouv-aide', carte).textContent = 'Au clavier : les flèches ← et →.';

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
      [D.coups[n - 1].de, D.coups[n - 1].vers].forEach(function (nom) {
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
    phrase.textContent = n === 0 ? D.phraseDepart || '' : D.coups[n - 1].phrase;
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

  aller(typeof D.depart === 'number' ? D.depart : 0);
  racine.classList.add('ouv-pret');
})();
