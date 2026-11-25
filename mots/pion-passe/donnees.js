// LE PION PASSÉ — la position de l'exemple, les cases surlignées et les coups que joue « Montre-moi ».
// Un autre mot = un autre fichier comme celui-ci (et sa page index.html pour les textes).
// « fen » : la position de départ. « cases » : les cases surlignées avant le premier coup.
// « de » et « vers » : les cases du coup. « nom » : le coup comme on l'écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// « cases » dans un coup (facultatif) : les cases à surligner après ce coup, à la place des deux cases du coup.
// Position et coups vérifiés avec python-chess le 25 novembre 2026 (position légale, coups légaux, le thème est bien là).
window.MOT = {
  nom: 'pion passé',
  fen: '2r5/5pkp/6p1/P7/8/6P1/5PKP/R7 w - - 0 1',
  cases: ['a5', 'a1'],
  description: 'L’échiquier de l’exemple. Ton pion en a5 est passé : aucun pion noir devant lui, ni sur la colonne b. Et ta tour est juste derrière.',
  titreDepart: 'La position',
  phraseDepart: 'Ton pion en a5 est passé : aucun pion noir devant lui, ni sur la colonne b. Et ta tour est juste derrière.',
  coups: [
    { de: 'a5', vers: 'a6', nom: 'a6', phrase: 'Le pion avance. Ta tour le protège de loin, par-derrière.', cases: ['a5', 'a6', 'a1'] },
    { de: 'c8', vers: 'a8', nom: 'Ta8', phrase: 'La tour noire vient se mettre devant lui pour l’arrêter.' },
    { de: 'a6', vers: 'a7', nom: 'a7', phrase: 'Encore un pas. La tour noire est coincée devant le pion : si elle s’en va, il arrive au bout.', cases: ['a6', 'a7', 'a8', 'a1'] },
  ],
};
