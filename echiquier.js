// L'échiquier vivant du haut de page : le visiteur cherche le coup, puis lit la réponse du coach.
// Les exemples viennent de exemples.js (window.EXEMPLES), les mots de textes.js (clés « ev-… »).
// Rien n'est écrit en style dans la page (protection stricte) : tout passe par des classes et des attributs SVG.
(function () {
  'use strict';

  // =====================================================================
  // 1. LES RÈGLES DU JEU — un petit générateur de coups légaux
  //    (échecs, clouages, roque, prise en passant, promotion).
  //    Une case = un nombre de 0 (a8) à 63 (h1).
  // =====================================================================
  var COLONNES = 'abcdefgh';
  var CAVALIER = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
  var ROI = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  var DROIT = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  var DIAGONALE = [[1, 1], [-1, 1], [-1, -1], [1, -1]];

  function numero(nom) {
    return (8 - Number(nom.charAt(1))) * 8 + COLONNES.indexOf(nom.charAt(0));
  }
  function nomCase(i) {
    return COLONNES.charAt(i % 8) + (8 - (i >> 3));
  }
  function dedans(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }
  function autre(camp) {
    return camp === 'w' ? 'b' : 'w';
  }

  // Lit une position écrite en FEN. Rend null si elle est mal écrite.
  function lireFen(fen) {
    if (typeof fen !== 'string') return null;
    var morceaux = fen.trim().split(/\s+/);
    var b = [];
    var lignes = morceaux[0].split('/');
    if (lignes.length !== 8) return null;
    for (var l = 0; l < 8; l++) {
      for (var k = 0; k < lignes[l].length; k++) {
        var c = lignes[l].charAt(k);
        if (/[1-8]/.test(c)) {
          for (var n = 0; n < Number(c); n++) b.push('');
        } else if (/[prnbqkPRNBQK]/.test(c)) {
          b.push((c === c.toUpperCase() ? 'w' : 'b') + c.toUpperCase());
        } else {
          return null;
        }
      }
      if (b.length !== (l + 1) * 8) return null;
    }
    if (b.indexOf('wK') < 0 || b.indexOf('bK') < 0) return null;
    return {
      b: b,
      trait: morceaux[1] === 'b' ? 'b' : 'w',
      roque: morceaux[2] && morceaux[2] !== '-' ? morceaux[2] : '',
      pep: morceaux[3] && /^[a-h][36]$/.test(morceaux[3]) ? numero(morceaux[3]) : -1,
    };
  }

  // La case i est-elle attaquée par le camp « par » ?
  function attaquee(b, i, par) {
    var x = i % 8;
    var y = i >> 3;
    var k, nx, ny, p;
    var dy = par === 'w' ? 1 : -1; // un pion blanc attaque vers le haut : il est donc une rangée plus bas
    for (k = -1; k <= 1; k += 2) {
      nx = x + k;
      ny = y + dy;
      if (dedans(nx, ny) && b[ny * 8 + nx] === par + 'P') return true;
    }
    for (k = 0; k < 8; k++) {
      nx = x + CAVALIER[k][0];
      ny = y + CAVALIER[k][1];
      if (dedans(nx, ny) && b[ny * 8 + nx] === par + 'N') return true;
      nx = x + ROI[k][0];
      ny = y + ROI[k][1];
      if (dedans(nx, ny) && b[ny * 8 + nx] === par + 'K') return true;
    }
    for (k = 0; k < 4; k++) {
      nx = x + DROIT[k][0];
      ny = y + DROIT[k][1];
      while (dedans(nx, ny)) {
        p = b[ny * 8 + nx];
        if (p) {
          if (p === par + 'R' || p === par + 'Q') return true;
          break;
        }
        nx += DROIT[k][0];
        ny += DROIT[k][1];
      }
      nx = x + DIAGONALE[k][0];
      ny = y + DIAGONALE[k][1];
      while (dedans(nx, ny)) {
        p = b[ny * 8 + nx];
        if (p) {
          if (p === par + 'B' || p === par + 'Q') return true;
          break;
        }
        nx += DIAGONALE[k][0];
        ny += DIAGONALE[k][1];
      }
    }
    return false;
  }

  // Tous les coups « à première vue » (sans regarder si le roi reste en échec).
  function coupsBruts(pos) {
    var b = pos.b;
    var moi = pos.trait;
    var lui = autre(moi);
    var coups = [];

    function ajouterPion(de, vers, extra) {
      var y = vers >> 3;
      if (y === 0 || y === 7) {
        ['Q', 'R', 'B', 'N'].forEach(function (p) {
          coups.push({ de: de, vers: vers, promo: p });
        });
      } else {
        var c = { de: de, vers: vers };
        if (extra) c[extra] = true;
        coups.push(c);
      }
    }

    for (var i = 0; i < 64; i++) {
      var piece = b[i];
      if (!piece || piece.charAt(0) !== moi) continue;
      var x = i % 8;
      var y = i >> 3;
      var sorte = piece.charAt(1);
      var k, nx, ny, cible;

      if (sorte === 'P') {
        var sens = moi === 'w' ? -1 : 1;
        var depart = moi === 'w' ? 6 : 1;
        if (dedans(x, y + sens) && !b[(y + sens) * 8 + x]) {
          ajouterPion(i, (y + sens) * 8 + x);
          if (y === depart && !b[(y + 2 * sens) * 8 + x]) coups.push({ de: i, vers: (y + 2 * sens) * 8 + x, double: true });
        }
        for (k = -1; k <= 1; k += 2) {
          nx = x + k;
          ny = y + sens;
          if (!dedans(nx, ny)) continue;
          cible = ny * 8 + nx;
          if (b[cible] && b[cible].charAt(0) === lui) ajouterPion(i, cible);
          else if (cible === pos.pep && !b[cible]) ajouterPion(i, cible, 'enPassant');
        }
      } else if (sorte === 'N' || sorte === 'K') {
        var pas = sorte === 'N' ? CAVALIER : ROI;
        for (k = 0; k < 8; k++) {
          nx = x + pas[k][0];
          ny = y + pas[k][1];
          if (!dedans(nx, ny)) continue;
          cible = ny * 8 + nx;
          if (!b[cible] || b[cible].charAt(0) === lui) coups.push({ de: i, vers: cible });
        }
      } else {
        var lignes = sorte === 'R' ? DROIT : sorte === 'B' ? DIAGONALE : DROIT.concat(DIAGONALE);
        for (k = 0; k < lignes.length; k++) {
          nx = x + lignes[k][0];
          ny = y + lignes[k][1];
          while (dedans(nx, ny)) {
            cible = ny * 8 + nx;
            if (!b[cible]) {
              coups.push({ de: i, vers: cible });
            } else {
              if (b[cible].charAt(0) === lui) coups.push({ de: i, vers: cible });
              break;
            }
            nx += lignes[k][0];
            ny += lignes[k][1];
          }
        }
      }
    }

    // Le roque : le roi et la tour à leur place, rien entre eux, et le roi ne passe par aucune case attaquée.
    var rang = moi === 'w' ? 56 : 0;
    var roi = rang + 4;
    if (b[roi] === moi + 'K') {
      var petit = moi === 'w' ? 'K' : 'k';
      var grand = moi === 'w' ? 'Q' : 'q';
      if (pos.roque.indexOf(petit) >= 0 && b[rang + 7] === moi + 'R' && !b[rang + 5] && !b[rang + 6] &&
          !attaquee(b, roi, lui) && !attaquee(b, rang + 5, lui) && !attaquee(b, rang + 6, lui)) {
        coups.push({ de: roi, vers: rang + 6, roque: 'petit' });
      }
      if (pos.roque.indexOf(grand) >= 0 && b[rang] === moi + 'R' && !b[rang + 1] && !b[rang + 2] && !b[rang + 3] &&
          !attaquee(b, roi, lui) && !attaquee(b, rang + 3, lui) && !attaquee(b, rang + 2, lui)) {
        coups.push({ de: roi, vers: rang + 2, roque: 'grand' });
      }
    }
    return coups;
  }

  // Joue un coup et rend la nouvelle position (l'ancienne n'est pas touchée).
  function jouer(pos, c) {
    var b = pos.b.slice();
    var moi = pos.trait;
    var piece = b[c.de];
    var roque = pos.roque;
    b[c.de] = '';
    if (c.enPassant) b[(c.de >> 3) * 8 + (c.vers % 8)] = '';
    if (c.roque) {
      var rang = moi === 'w' ? 56 : 0;
      if (c.roque === 'petit') {
        b[rang + 5] = b[rang + 7];
        b[rang + 7] = '';
      } else {
        b[rang + 3] = b[rang];
        b[rang] = '';
      }
    }
    b[c.vers] = c.promo ? moi + c.promo : piece;
    function oter(lettres) {
      roque = roque.replace(lettres.charAt(0), '').replace(lettres.charAt(1) || lettres.charAt(0), '');
    }
    if (piece === 'wK') oter('KQ');
    if (piece === 'bK') oter('kq');
    [[56, 'Q'], [63, 'K'], [0, 'q'], [7, 'k']].forEach(function (coin) {
      if (c.de === coin[0] || c.vers === coin[0]) oter(coin[1]);
    });
    return { b: b, trait: autre(moi), roque: roque, pep: c.double ? (c.de + c.vers) / 2 : -1 };
  }

  // Les coups vraiment permis : ceux qui ne laissent pas son propre roi en échec.
  function coupsLegaux(pos) {
    return coupsBruts(pos).filter(function (c) {
      var apres = jouer(pos, c);
      return !attaquee(apres.b, apres.b.indexOf(pos.trait + 'K'), apres.trait);
    });
  }
  function enEchec(pos) {
    return attaquee(pos.b, pos.b.indexOf(pos.trait + 'K'), autre(pos.trait));
  }

  var REGLES = { lireFen: lireFen, coupsLegaux: coupsLegaux, jouer: jouer, enEchec: enEchec, numero: numero, nomCase: nomCase };

  // Hors d'une page (essais des règles) : on s'arrête ici.
  if (typeof document === 'undefined') {
    if (typeof module !== 'undefined') module.exports = REGLES;
    return;
  }

  // =====================================================================
  // 2. L'ÉCRAN
  // =====================================================================
  var SVG = 'http://www.w3.org/2000/svg';
  var C = 100; // une case, dans les mesures du dessin (800 × 800)
  var racine = document.getElementById('echiquier-vivant');
  if (!racine) return;

  // On ne garde que les exemples dont la position se lit.
  var exemples = (window.EXEMPLES || []).filter(function (e) {
    return e && lireFen(e.fen);
  });
  if (!exemples.length) {
    racine.hidden = true;
    return;
  }

  var langue = document.documentElement.lang === 'en' ? 'en' : 'fr';
  function mot(cle) {
    var T = window.TEXTES || {};
    var m = (T[langue] || {})[cle];
    return typeof m === 'string' ? m : '';
  }
  function calme() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function el(nom, classe, parent) {
    var e = document.createElement(nom);
    if (classe) e.className = classe;
    if (parent) parent.appendChild(e);
    return e;
  }
  function svg(nom, attributs, parent) {
    var e = document.createElementNS(SVG, nom);
    Object.keys(attributs || {}).forEach(function (k) {
      e.setAttribute(k, attributs[k]);
    });
    if (parent) parent.appendChild(e);
    return e;
  }
  function vider(e) {
    while (e.firstChild) e.removeChild(e.firstChild);
  }

  // ---- L'état : où on en est ----
  var rang = 0; // l'exemple montré
  var ex = null;
  var pos = null; // la position sur le plateau
  var retourne = false; // true = vu du côté des noirs
  var etat = 'jeu'; // 'jeu' (on cherche), 'trouve' (bon coup joué), 'montre' (le coach a montré)
  var messageCle = ''; // la clé du message affiché dans la ligne du haut de la carte
  var choisie = -1; // la case de la pièce choisie
  var verrou = false; // pendant que le bon coup se joue, on ne touche à rien
  var retour = null; // un mauvais coup en train de rentrer chez lui : un nouveau toucher le finit tout de suite
  var numeroGlisse = 0; // chaque glissade porte un numéro : une nouvelle glissade de la même pièce arrête l'ancienne
  var tour = 0; // change à chaque nouvel exemple : un mouvement en cours d'un ancien exemple s'arrête
  var imagesPieces = {}; // case → image de la pièce
  var glisse = null; // un glisser-déposer en cours (souris)
  var dernierPointeur = 'mouse';

  // ---- La carte, construite une fois ----
  vider(racine);
  var carte = el('div', 'ev-carte', racine);
  // La ligne du haut : « À toi », ou le mot du moment à sa place (sa hauteur est gardée : rien ne bouge quand il arrive).
  var tete = el('div', 'ev-tete', carte);
  var sur = el('p', 'ev-sur', tete);
  var message = el('p', 'ev-message', tete);
  message.setAttribute('role', 'status');
  // La question, et les petits points des exemples.
  var ligne = el('div', 'ev-ligne', carte);
  var question = el('p', 'ev-question', ligne);
  var points = el('div', 'ev-points', ligne);
  points.setAttribute('role', 'group');
  var noteLangue = el('p', 'ev-note ev-note-langue', carte);
  var plateau = el('div', 'ev-plateau', carte);
  var dessin = svg('svg', { viewBox: '0 0 800 800', role: 'img', class: 'ev-dessin' }, plateau);
  var coucheCases = svg('g', {}, dessin);
  var coucheMarques = svg('g', {}, dessin);
  var coucheFleche = svg('g', {}, dessin); // sous les pièces : la flèche ne recouvre jamais la pièce arrivée
  var couchePieces = svg('g', {}, dessin);
  var coucheCibles = svg('g', {}, dessin);
  var bas = el('div', 'ev-bas', carte);
  var reponse = el('div', 'ev-reponse', bas);
  reponse.setAttribute('aria-live', 'polite');
  var boutons = el('div', 'ev-boutons', bas);
  var bMontre = el('button', 'ev-bouton', boutons);
  bMontre.type = 'button';
  var bRecommencer = el('button', 'ev-bouton', boutons);
  bRecommencer.type = 'button';
  var bSuivant = el('button', 'ev-bouton ev-suivant', boutons);
  bSuivant.type = 'button';

  var boutonsPoints = exemples.map(function (e, i) {
    var b = el('button', 'ev-point', points);
    b.type = 'button';
    b.addEventListener('click', function () {
      charger(i);
    });
    return b;
  });
  if (exemples.length < 2) points.hidden = true;

  // ---- Les cases (dessinées une fois par orientation) ----
  function coin(i) {
    var x = i % 8;
    var y = i >> 3;
    if (retourne) {
      x = 7 - x;
      y = 7 - y;
    }
    return { x: x * C, y: y * C };
  }
  function dessinerCases() {
    vider(coucheCases);
    for (var i = 0; i < 64; i++) {
      var p = coin(i);
      var claire = ((i % 8) + (i >> 3)) % 2 === 0;
      svg('rect', { x: p.x, y: p.y, width: C, height: C, class: claire ? 'ev-claire' : 'ev-foncee' }, coucheCases);
      // Les repères, comme dans l'appli : le chiffre en haut à gauche de la première colonne, la lettre en bas à droite de la dernière rangée.
      var autreTon = claire ? 'ev-repere ev-sur-claire' : 'ev-repere ev-sur-foncee';
      if (p.x === 0) svg('text', { x: 7, y: p.y + 22, class: autreTon }, coucheCases).textContent = String(8 - (i >> 3));
      if (p.y === 700) svg('text', { x: p.x + 93, y: 791, class: autreTon + ' ev-a-droite' }, coucheCases).textContent = COLONNES.charAt(i % 8);
    }
  }

  // ---- Les pièces ----
  function dessinerPieces() {
    vider(couchePieces);
    imagesPieces = {};
    for (var i = 0; i < 64; i++) {
      if (!pos.b[i]) continue;
      var p = coin(i);
      imagesPieces[i] = svg('image', { href: 'images/pieces/' + pos.b[i] + '.svg', x: p.x, y: p.y, width: C, height: C, class: 'ev-piece' }, couchePieces);
    }
    dessin.setAttribute('aria-label', decrire());
  }

  // Le texte de remplacement : la position, dite avec des mots.
  function decrire() {
    var un = mot('ev-pieces-1').split(',');
    var plusieurs = mot('ev-pieces-n').split(',');
    var ordre = 'KQRBNP';
    function camp(c) {
      var groupes = [];
      for (var s = 0; s < 6; s++) {
        var cases = [];
        // de a1 vers h8, pour lire dans l'ordre habituel
        for (var y = 7; y >= 0; y--) for (var x = 0; x < 8; x++) if (pos.b[y * 8 + x] === c + ordre.charAt(s)) cases.push(nomCase(y * 8 + x));
        if (cases.length) groupes.push((cases.length > 1 ? plusieurs[s] : un[s]) + ' ' + cases.join(', '));
      }
      return groupes.join(' ; ');
    }
    return (
      mot('ev-alt-debut') + ' ' + mot(pos.trait === 'w' ? 'ev-alt-trait-blancs' : 'ev-alt-trait-noirs') + ' ' +
      mot('ev-alt-blancs') + ' ' + camp('w') + '. ' + mot('ev-alt-noirs') + ' ' + camp('b') + '.'
    );
  }

  // ---- Les marques : la case choisie, et les cases où la pièce peut vraiment aller ----
  function marquer() {
    vider(coucheMarques);
    vider(coucheCibles);
    if (choisie < 0) return;
    var p = coin(choisie);
    svg('rect', { x: p.x, y: p.y, width: C, height: C, class: 'ev-choisie' }, coucheMarques);
    var vues = {};
    coupsLegaux(pos).forEach(function (c) {
      if (c.de !== choisie || vues[c.vers]) return;
      vues[c.vers] = true;
      var q = coin(c.vers);
      var prise = pos.b[c.vers] || c.enPassant;
      svg('circle', { cx: q.x + C / 2, cy: q.y + C / 2, r: prise ? 43 : 15, class: prise ? 'ev-cible ev-prise' : 'ev-cible' }, coucheCibles);
    });
  }
  function choisir(i) {
    choisie = i;
    marquer();
  }

  // ---- La flèche verte du meilleur coup ----
  function fleche(de, vers) {
    vider(coucheFleche);
    var a = coin(de);
    var b = coin(vers);
    var x1 = a.x + C / 2;
    var y1 = a.y + C / 2;
    var x2 = b.x + C / 2;
    var y2 = b.y + C / 2;
    var long = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) || 1;
    var ux = (x2 - x1) / long;
    var uy = (y2 - y1) / long;
    // La pointe s'arrête au bord de la case d'arrivée. Pour un coup tout court (une case), la flèche irait trop court :
    // elle va alors jusqu'au milieu de la case, et passe sous la pièce.
    var bord = C / 2 / Math.max(Math.abs(ux), Math.abs(uy));
    var recul = long >= 190 ? bord + 2 : -6;
    var px = x2 - ux * recul; // le bout de la pointe
    var py = y2 - uy * recul;
    var bx = px - ux * 54; // la base de la pointe
    var by = py - uy * 54;
    var g = svg('g', { class: 'ev-fleche' }, coucheFleche);
    var debut = long >= 190 ? 28 : 6; // un coup tout court part du milieu de sa case, pour qu'on voie le trait
    svg('line', { x1: x1 + ux * debut, y1: y1 + uy * debut, x2: bx, y2: by }, g);
    svg('polygon', { points: [px, py, bx - uy * 30, by + ux * 30, bx + uy * 30, by - ux * 30].join(' ') }, g);
  }

  // ---- Une pièce glisse d'un point à un autre (par attributs, sans style écrit) ----
  function glisser(image, vers, duree, fin) {
    var monTour = tour;
    var moi = ++numeroGlisse;
    image.ev_glisse = moi;
    var x0 = Number(image.getAttribute('x'));
    var y0 = Number(image.getAttribute('y'));
    function poser(k) {
      image.setAttribute('x', x0 + (vers.x - x0) * k);
      image.setAttribute('y', y0 + (vers.y - y0) * k);
    }
    if (calme() || !duree || (x0 === vers.x && y0 === vers.y)) {
      poser(1);
      if (fin) fin();
      return;
    }
    var debut = null;
    function pas(t) {
      if (monTour !== tour || image.ev_glisse !== moi) return;
      if (debut === null) debut = t;
      var k = Math.min(1, (t - debut) / duree);
      poser(1 - Math.pow(1 - k, 3));
      if (k < 1) requestAnimationFrame(pas);
      else if (fin) fin();
    }
    requestAnimationFrame(pas);
  }
  function dessus(image) {
    couchePieces.appendChild(image);
  }

  // En français, l'espace devant « : ; ? ! » ne se coupe pas : le signe ne part jamais seul à la ligne. Aucun mot ne change.
  function insecable(t) {
    return String(t || '').replace(/ (?=[:;?!])/g, '\u00a0');
  }

  // Coupe un texte après sa première phrase, sans rien y changer : [la première phrase, tout le reste].
  // Une phrase finit par un point (ou ! ? …) suivi d'un blanc puis d'une majuscule ; le point de « 1. e4 » n'en est pas une fin.
  function premierePhrase(t) {
    for (var i = 0; i < t.length - 1; i++) {
      var c = t.charAt(i);
      if ('.!?…'.indexOf(c) < 0 || !/\s/.test(t.charAt(i + 1))) continue;
      if (c === '.' && /(^|\s)\d+$/.test(t.slice(0, i))) continue; // un numéro de coup, pas une fin de phrase
      var reste = t.slice(i + 1);
      var suite = reste.search(/\S/);
      if (suite < 0) break;
      if (!/[A-ZÀ-ÖØ-Þ]/.test(reste.charAt(suite))) continue;
      return [t.slice(0, i + 1), reste];
    }
    return [t, ''];
  }

  // ---- Les mots : tout se repose d'un coup (au départ, et quand la langue change) ----
  function peindre() {
    var plan = !coupAttendu();
    // L'étiquette : « À toi » seulement quand il y a un coup à jouer ; une fois la réponse donnée, elle s'efface.
    // Quand un mot du moment est là (« Pas celui-là… »), il prend sa place.
    sur.textContent = etat === 'jeu' && !messageCle ? mot(plan ? 'ev-question-coach' : 'ev-a-toi') : '';
    // La question : en anglais si l'exemple la donne et que la page est en anglais.
    var enAnglais = langue === 'en' && !!ex.question_en;
    question.textContent = enAnglais ? ex.question_en : insecable(ex.question);
    question.lang = enAnglais ? 'en' : 'fr';
    // La réponse du coach, elle, reste en français : on le dit avant de jouer, sous la question.
    noteLangue.textContent = mot('ev-en-francais');
    points.setAttribute('aria-label', mot('ev-exemples'));
    boutonsPoints.forEach(function (b, i) {
      // Le titre de l'exemple : celui de exemples.js en français, sa traduction (textes.js) en anglais.
      var titre = (langue === 'en' && mot('ev-titre-' + (window.EXEMPLES.indexOf(exemples[i]) + 1))) || exemples[i].titre;
      b.setAttribute('aria-label', mot('ev-exemple') + ' ' + (i + 1) + (titre ? (langue === 'en' ? ': ' + titre : insecable(' : ' + titre)) : ''));
      if (i === rang) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    message.textContent = etat === 'jeu' && messageCle ? mot(messageCle) : '';
    bMontre.textContent = mot(plan ? 'ev-demander' : 'ev-montre');
    bRecommencer.textContent = mot('ev-recommencer');
    bSuivant.textContent = mot('ev-suivant');
    var fini = etat !== 'jeu';
    bMontre.hidden = fini;
    bRecommencer.hidden = !fini;
    bSuivant.hidden = !fini || exemples.length < 2;
    carte.setAttribute('data-etat', etat);
    plateau.classList.toggle('ev-jouable', etat === 'jeu' && !plan);
    // La réponse du coach : son texte reste tel qu'il a été écrit, en français.
    vider(reponse);
    if (fini) {
      // « Le coach », et « Bien vu » sur la même ligne quand le visiteur a trouvé : on les lit avec la réponse.
      var enTete = el('div', 'ev-coach-tete', reponse);
      el('p', 'ev-coach-nom', enTete).textContent = mot('ev-coach');
      if (etat === 'trouve') el('p', 'ev-bravo', enTete).textContent = mot('ev-bien');
      var texte = el('p', 'ev-coach-texte', reponse);
      texte.lang = 'fr';
      // Aucun mot ne change : la première phrase est seulement montrée en clair, la suite en gris.
      var morceaux = premierePhrase(ex.reponse_du_coach || '');
      el('span', 'ev-coach-debut', texte).textContent = insecable(morceaux[0]);
      if (morceaux[1]) el('span', 'ev-coach-suite', texte).textContent = insecable(morceaux[1]);
    }
    if (pos) dessin.setAttribute('aria-label', decrire());
  }
  function dire(cle) {
    messageCle = cle;
    peindre();
  }

  // ---- Garder la carte en vue ----
  // Quand la réponse arrive, la page défile doucement, une seule fois, juste assez pour qu'on la lise en entier avec les boutons.
  // Le bas de la carte vient en bas de l'écran ; si la carte est plus haute que l'écran, le haut du plateau vient en haut.
  // Si tout est déjà en vue, rien ne bouge.
  function cadrer() {
    var H = window.innerHeight;
    var y = window.pageYOffset;
    var c = carte.getBoundingClientRect();
    var p = plateau.getBoundingClientRect();
    var mini = y + c.bottom - H + 12; // pour voir le bas de la carte
    var maxiCarte = y + c.top - 8; // pour voir encore le haut de la carte
    var maxiPlateau = y + p.top - 6; // pour voir encore le haut du plateau
    var but;
    if (mini <= maxiCarte) but = Math.min(Math.max(y, mini), maxiCarte);
    else if (mini <= maxiPlateau) but = Math.min(Math.max(y, mini), maxiPlateau);
    else but = maxiPlateau;
    but = Math.max(0, Math.round(but));
    if (Math.abs(but - y) < 2) return;
    window.scrollTo({ top: but, behavior: calme() ? 'instant' : 'smooth' });
  }

  // ---- Le coup attendu, lu dans l'exemple (« e4e5 », ou « e7e8q ») ----
  // Un coup s'écrit « e4e5 », ou bien { cases: 'e4e5', … } comme dans exemples-coach.json : les deux se lisent.
  function enCases(v) {
    if (v && typeof v === 'object') v = v.cases;
    return String(v || '').trim().toLowerCase();
  }
  function coupAttendu() {
    var m = enCases(ex.meilleur_coup);
    return /^[a-h][1-8][a-h][1-8][qrbn]?$/.test(m) ? m : '';
  }
  function memeCoup(texte, de, vers) {
    return enCases(texte).slice(0, 4) === nomCase(de) + nomCase(vers);
  }
  // Parmi les coups légaux, celui qui va de « de » à « vers » (dame par défaut à la promotion).
  function trouverCoup(de, vers, promo) {
    var voulu = (promo || 'q').toUpperCase();
    var trouve = null;
    coupsLegaux(pos).forEach(function (c) {
      if (c.de !== de || c.vers !== vers) return;
      if (!c.promo || c.promo === voulu) trouve = c;
    });
    return trouve;
  }

  // ---- Charger un exemple (ou le recommencer) ----
  function charger(i) {
    tour++;
    rang = (i + exemples.length) % exemples.length;
    ex = exemples[rang];
    pos = lireFen(ex.fen);
    // Vu du côté de celui qui doit jouer. Le champ « trait » décide ; à défaut, la position elle-même.
    var t = String(ex.trait || '').trim().toLowerCase();
    if (['noirs', 'noir', 'n', 'b', 'black'].indexOf(t) >= 0) retourne = true;
    else if (['blancs', 'blanc', 'w', 'white'].indexOf(t) >= 0) retourne = false;
    else retourne = pos.trait === 'b';
    etat = 'jeu';
    messageCle = '';
    choisie = -1;
    verrou = false;
    retour = null;
    glisse = null;
    vider(coucheFleche);
    dessinerCases();
    dessinerPieces();
    marquer();
    peindre();
  }

  // ---- Montrer la réponse ----
  function reveler(nouvelEtat, cle) {
    etat = nouvelEtat;
    choisie = -1;
    marquer();
    messageCle = cle;
    peindre();
    cadrer();
  }

  // Joue le coup sur le plateau, pour de bon, puis appelle « fin ».
  function poserCoup(coup, fin) {
    var monTour = tour;
    var image = imagesPieces[coup.de];
    dessus(image);
    glisser(image, coin(coup.vers), 240, function () {
      if (monTour !== tour) return;
      pos = jouer(pos, coup);
      dessinerPieces();
      fin();
    });
  }

  // Le visiteur propose un coup (les deux cases sont déjà un coup légal).
  function essayer(de, vers) {
    var attendu = coupAttendu();
    var monTour = tour;
    verrou = true;
    choisie = -1;
    marquer();
    if (attendu && memeCoup(attendu, de, vers)) {
      var coup = trouverCoup(de, vers, attendu.charAt(4));
      dire('');
      poserCoup(coup, function () {
        verrou = false;
        fleche(de, vers);
        reveler('trouve', 'ev-bien');
      });
      return;
    }
    // Un autre coup : la pièce va voir, puis revient vite. Rien n'est verrouillé pendant ce temps :
    // un nouveau toucher la remet chez elle sur-le-champ et compte tout de suite (finirRetour).
    verrou = false;
    var image = imagesPieces[de];
    dessus(image);
    dire(memeCoup(ex.coup_joue_fautif, de, vers) ? 'ev-partie' : 'ev-pas');
    var ceRetour = { image: image, de: de };
    retour = ceRetour;
    glisser(image, coin(vers), 130, function () {
      setTimeout(function () {
        if (monTour !== tour || retour !== ceRetour) return;
        glisser(image, coin(de), 220, function () {
          if (retour === ceRetour) retour = null;
        });
      }, calme() ? 0 : 90);
    });
  }
  // Finit tout de suite le retour d'un mauvais coup : la pièce est chez elle, le plateau est prêt.
  function finirRetour() {
    if (!retour) return;
    var r = retour;
    retour = null;
    var chez = coin(r.de);
    r.image.ev_glisse = 0; // arrête la glissade en cours
    r.image.setAttribute('x', chez.x);
    r.image.setAttribute('y', chez.y);
  }

  // « Montre-moi » (ou « Demander au coach » quand il n'y a pas de coup à trouver).
  function montrer() {
    if (etat !== 'jeu' || verrou) return;
    finirRetour();
    var attendu = coupAttendu();
    var auClavier = document.activeElement === bMontre;
    function suite() {
      verrou = false;
      reveler('montre', '');
      if (auClavier) (bSuivant.hidden ? bRecommencer : bSuivant).focus({ preventScroll: true });
    }
    choisie = -1;
    marquer();
    dire('');
    if (!attendu) {
      suite();
      return;
    }
    var de = numero(attendu.slice(0, 2));
    var vers = numero(attendu.slice(2, 4));
    fleche(de, vers);
    var coup = trouverCoup(de, vers, attendu.charAt(4));
    if (!coup) {
      suite(); // un exemple mal écrit : on montre quand même la flèche et la réponse
      return;
    }
    verrou = true;
    var monTour = tour;
    setTimeout(function () {
      if (monTour !== tour) return;
      poserCoup(coup, suite);
    }, calme() ? 0 : 350);
  }

  bMontre.addEventListener('click', montrer);
  bRecommencer.addEventListener('click', function () {
    var auClavier = document.activeElement === bRecommencer;
    charger(rang);
    if (auClavier) bMontre.focus({ preventScroll: true });
    cadrer();
  });
  bSuivant.addEventListener('click', function () {
    var auClavier = document.activeElement === bSuivant;
    charger(rang + 1);
    if (auClavier) bMontre.focus({ preventScroll: true });
    // Après une longue réponse, le haut de la carte (la nouvelle question) a pu sortir de l'écran : la page le ramène doucement.
    cadrer();
  });

  // ---- Jouer : toucher une pièce puis une case ; à la souris, on peut aussi glisser-déposer ----
  function caseSous(e) {
    var r = dessin.getBoundingClientRect();
    var x = Math.floor(((e.clientX - r.left) / r.width) * 8);
    var y = Math.floor(((e.clientY - r.top) / r.height) * 8);
    if (!dedans(x, y)) return -1;
    if (retourne) {
      x = 7 - x;
      y = 7 - y;
    }
    return y * 8 + x;
  }
  function pointDessin(e) {
    var r = dessin.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 800, y: ((e.clientY - r.top) / r.height) * 800 };
  }
  function jouable() {
    return etat === 'jeu' && !verrou && !!coupAttendu();
  }
  function aMoi(i) {
    return i >= 0 && pos.b[i] && pos.b[i].charAt(0) === pos.trait;
  }
  function permis(de, vers) {
    return de >= 0 && vers >= 0 && !!trouverCoup(de, vers);
  }
  // Un toucher (ou un clic) sur une case. Rend true si une pièce vient d'être choisie.
  function toucher(i) {
    finirRetour();
    if (!jouable() || i < 0) return false;
    if (choisie >= 0 && permis(choisie, i)) {
      essayer(choisie, i);
      return false;
    }
    if (aMoi(i) && i !== choisie) {
      choisir(i);
      return true;
    }
    choisir(-1);
    return false;
  }

  dessin.addEventListener('pointerdown', function (e) {
    dernierPointeur = e.pointerType || 'mouse';
    if (dernierPointeur !== 'mouse' || e.button !== 0) return;
    var i = caseSous(e);
    var dejaChoisie = i >= 0 && i === choisie;
    if (dejaChoisie ? jouable() : toucher(i)) {
      finirRetour();
      // La pièce est en main : elle suivra la souris si on la tire.
      glisse = { de: i, depart: { x: e.clientX, y: e.clientY }, bouge: false, dejaChoisie: dejaChoisie };
      try {
        dessin.setPointerCapture(e.pointerId);
      } catch (err) {}
      e.preventDefault();
    }
  });
  dessin.addEventListener('pointermove', function (e) {
    if (!glisse) return;
    if (!glisse.bouge && Math.abs(e.clientX - glisse.depart.x) + Math.abs(e.clientY - glisse.depart.y) < 5) return;
    var image = imagesPieces[glisse.de];
    if (!image) return;
    if (!glisse.bouge) {
      glisse.bouge = true;
      dessus(image);
      plateau.classList.add('ev-en-main');
    }
    var p = pointDessin(e);
    image.setAttribute('x', Math.max(-C / 2, Math.min(800 - C / 2, p.x - C / 2)));
    image.setAttribute('y', Math.max(-C / 2, Math.min(800 - C / 2, p.y - C / 2)));
  });
  function lacher(e, annule) {
    if (!glisse) return;
    var g = glisse;
    glisse = null;
    plateau.classList.remove('ev-en-main');
    var image = imagesPieces[g.de];
    if (!g.bouge) {
      // Un simple clic sur la pièce déjà choisie : on la repose.
      if (g.dejaChoisie) choisir(-1);
      return;
    }
    var i = annule ? -1 : caseSous(e);
    if (i !== g.de && permis(g.de, i)) {
      essayer(g.de, i);
    } else if (image) {
      glisser(image, coin(g.de), 180); // pas un coup permis : la pièce rentre chez elle, sans un mot
    }
  }
  dessin.addEventListener('pointerup', function (e) {
    lacher(e, false);
  });
  dessin.addEventListener('pointercancel', function (e) {
    lacher(e, true);
  });
  // Au doigt (ou au stylet) : on touche, tout simplement. La page continue de défiler sous le doigt.
  dessin.addEventListener('click', function (e) {
    if (dernierPointeur === 'mouse') return;
    toucher(caseSous(e));
  });

  // ---- La langue : page.js appelle cette fonction à chaque changement ----
  window.EchiquierVivant = {
    langue: function (l) {
      langue = l === 'en' ? 'en' : 'fr';
      peindre();
    },
  };

  charger(0);
  // L'échiquier est construit : la ligne « De vraies réponses du coach… » peut se montrer (echiquier.css).
  racine.classList.add('ev-pret');
})();
