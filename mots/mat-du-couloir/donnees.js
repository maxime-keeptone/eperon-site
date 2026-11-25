// LE MAT DU COULOIR — la position de l'exemple, les cases surlignées et les coups que joue « Montre-moi ».
// Un autre mot = un autre fichier comme celui-ci (et sa page index.html pour les textes).
// « fen » : la position de départ. « cases » : les cases surlignées avant le premier coup.
// « de » et « vers » : les cases du coup. « nom » : le coup comme on l'écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// « cases » dans un coup (facultatif) : les cases à surligner après ce coup, à la place des deux cases du coup.
// Position et coups vérifiés avec python-chess le 25 novembre 2026 (position légale, coups légaux, le thème est bien là).
window.MOT = {
  nom: 'mat du couloir',
  fen: '6k1/p4ppp/8/8/8/P6P/1r3PP1/4R1K1 w - - 0 1',
  cases: ['g8', 'f7', 'g7', 'h7'],
  description: 'L’échiquier de l’exemple. Le roi noir est bien au chaud derrière ses trois pions. Mais il n’a aucune case de sortie, et personne ne garde sa dernière rangée.',
  titreDepart: 'La position',
  phraseDepart: 'Le roi noir est bien au chaud derrière ses trois pions. Mais il n’a aucune case de sortie, et personne ne garde sa dernière rangée.',
  coups: [
    { de: 'e1', vers: 'e8', nom: 'Te8#', phrase: 'Échec et mat. Ta tour donne échec sur la dernière rangée, et le roi est enfermé par ses propres pions.', cases: ['e1', 'e8', 'g8', 'f7', 'g7', 'h7'] },
  ],
};
