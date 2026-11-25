// L'ATTAQUE À LA DÉCOUVERTE — la position de l'exemple, les cases surlignées et les coups que joue « Montre-moi ».
// Un autre mot = un autre fichier comme celui-ci (et sa page index.html pour les textes).
// « fen » : la position de départ. « cases » : les cases surlignées avant le premier coup.
// « de » et « vers » : les cases du coup. « nom » : le coup comme on l'écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// « cases » dans un coup (facultatif) : les cases à surligner après ce coup, à la place des deux cases du coup.
// Position et coups vérifiés avec python-chess le 25 novembre 2026 (position légale, coups légaux, le thème est bien là).
window.MOT = {
  nom: 'attaque à la découverte',
  fen: 'r1b3k1/ppp1qppp/8/8/4B3/8/PPPQ1PPP/4R1K1 w - - 0 1',
  cases: ['e1', 'e4', 'e7'],
  description: 'L’échiquier de l’exemple. Ta tour regarde vers la dame noire, mais ton fou est au milieu. S’il s’en va, la colonne s’ouvre.',
  titreDepart: 'La position',
  phraseDepart: 'Ta tour regarde vers la dame noire, mais ton fou est au milieu. S’il s’en va, la colonne s’ouvre.',
  coups: [
    { de: 'e4', vers: 'h7', nom: 'Fxh7+', phrase: 'Ton fou part en donnant échec. Derrière lui, ta tour attaque maintenant la dame.', cases: ['e4', 'h7', 'e1', 'e7'] },
    { de: 'g8', vers: 'h7', nom: 'Rxh7', phrase: 'Le roi prend le fou. Il n’a pas eu le temps de sauver sa dame.' },
    { de: 'e1', vers: 'e7', nom: 'Txe7', phrase: 'Ta tour prend la dame. Tu as donné un fou, tu as gagné une dame.' },
  ],
};
