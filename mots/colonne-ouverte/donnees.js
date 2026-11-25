// LA COLONNE OUVERTE — la position de l'exemple, les cases surlignées et les coups que joue « Montre-moi ».
// Un autre mot = un autre fichier comme celui-ci (et sa page index.html pour les textes).
// « fen » : la position de départ. « cases » : les cases surlignées avant le premier coup.
// « de » et « vers » : les cases du coup. « nom » : le coup comme on l'écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// « cases » dans un coup (facultatif) : les cases à surligner après ce coup, à la place des deux cases du coup.
// Position et coups vérifiés avec python-chess le 25 novembre 2026 (position légale, coups légaux, le thème est bien là).
window.MOT = {
  nom: 'colonne ouverte',
  fen: 'r5k1/ppp2ppp/1b6/4p1B1/4P3/8/PPP2PPP/R5K1 w - - 0 1',
  cases: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'],
  description: 'L’échiquier de l’exemple. Regarde la colonne d : plus aucun pion, ni blanc ni noir. C’est une colonne ouverte.',
  titreDepart: 'La position',
  phraseDepart: 'Regarde la colonne d : plus aucun pion, ni blanc ni noir. C’est une colonne ouverte.',
  coups: [
    { de: 'a1', vers: 'd1', nom: 'Td1', phrase: 'Ta tour s’installe dessus la première. Elle voit jusqu’au bout, et ton fou surveille la case d8.', cases: ['a1', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'] },
  ],
};
