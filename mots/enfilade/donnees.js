// L'ENFILADE — la position de l'exemple, les cases surlignées et les coups que joue « Montre-moi ».
// Un autre mot = un autre fichier comme celui-ci (et sa page index.html pour les textes).
// « fen » : la position de départ. « cases » : les cases surlignées avant le premier coup.
// « de » et « vers » : les cases du coup. « nom » : le coup comme on l'écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// « cases » dans un coup (facultatif) : les cases à surligner après ce coup, à la place des deux cases du coup.
// Position et coups vérifiés avec python-chess le 25 novembre 2026 (position légale, coups légaux, le thème est bien là).
window.MOT = {
  nom: 'enfilade',
  fen: '8/r3k3/p3p1p1/1p3p2/8/P3P1P1/1P3PK1/7R w - - 0 1',
  cases: ['e7', 'a7', 'h1'],
  description: 'L’échiquier de l’exemple. Le roi noir et sa tour sont sur la même rangée, et rien ne les sépare. Ta tour peut y arriver en un coup.',
  titreDepart: 'La position',
  phraseDepart: 'Le roi noir et sa tour sont sur la même rangée, et rien ne les sépare. Ta tour peut y arriver en un coup.',
  coups: [
    { de: 'h1', vers: 'h7', nom: 'Th7+', phrase: 'Échec ! Ta tour attaque le roi. Et derrière lui, sur la même rangée, il y a la tour noire.', cases: ['h7', 'e7', 'a7'] },
    { de: 'e7', vers: 'd6', nom: 'Rd6', phrase: 'Le roi doit s’écarter. La rangée est ouverte.' },
    { de: 'h7', vers: 'a7', nom: 'Txa7', phrase: 'Tu prends la tour, que personne ne défendait.' },
  ],
};
