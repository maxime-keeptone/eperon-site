// LE CLOUAGE — la position de l'exemple, les cases surlignées et les coups que joue « Montre-moi ».
// Un autre mot = un autre fichier comme celui-ci (et sa page index.html pour les textes).
// « fen » : la position de départ. « cases » : les cases surlignées avant le premier coup.
// « de » et « vers » : les cases du coup. « nom » : le coup comme on l'écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// « cases » dans un coup (facultatif) : les cases à surligner après ce coup, à la place des deux cases du coup.
// Position et coups vérifiés avec python-chess le 25 novembre 2026 (position légale, coups légaux, le thème est bien là).
window.MOT = {
  nom: 'clouage',
  fen: '4k2r/ppp3pp/3p4/4n3/8/2N5/PPP2PPP/4R1K1 w - - 0 1',
  cases: ['e1', 'e5', 'e8'],
  description: 'L’échiquier de l’exemple. Le cavalier noir est sur la même colonne que son roi, face à ta tour. Il est cloué : il n’a plus le droit de bouger.',
  titreDepart: 'La position',
  phraseDepart: 'Le cavalier noir est sur la même colonne que son roi, face à ta tour. Il est cloué : il n’a plus le droit de bouger.',
  coups: [
    { de: 'f2', vers: 'f4', nom: 'f4', phrase: 'Tu attaques le cavalier cloué avec un simple pion. Il ne peut pas se sauver.', cases: ['f4', 'e5', 'e1', 'e8'] },
    { de: 'e8', vers: 'd7', nom: 'Rd7', phrase: 'Le roi noir s’écarte de la colonne. C’est trop tard pour son cavalier.' },
    { de: 'f4', vers: 'e5', nom: 'fxe5', phrase: 'Ton pion prend le cavalier. Tu gagnes une pièce pour un pion.' },
  ],
};
