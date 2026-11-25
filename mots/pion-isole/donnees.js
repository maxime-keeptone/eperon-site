// LE PION ISOLÉ — la position de l'exemple, les cases surlignées et les coups que joue « Montre-moi ».
// Un autre mot = un autre fichier comme celui-ci (et sa page index.html pour les textes).
// « fen » : la position de départ. « cases » : les cases surlignées avant le premier coup.
// « de » et « vers » : les cases du coup. « nom » : le coup comme on l'écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// « cases » dans un coup (facultatif) : les cases à surligner après ce coup, à la place des deux cases du coup.
// Position et coups vérifiés avec python-chess le 25 novembre 2026 (position légale, coups légaux, le thème est bien là).
window.MOT = {
  nom: 'pion isolé',
  fen: '3r2k1/pp2bppp/5n2/3p4/8/4PN2/PP2BPPP/3R2K1 w - - 0 1',
  cases: ['d5', 'd4'],
  description: 'L’échiquier de l’exemple. Le pion noir en d5 est isolé : aucun pion noir sur les colonnes c et e. Ce sont la tour et le cavalier qui le gardent.',
  titreDepart: 'La position',
  phraseDepart: 'Le pion noir en d5 est isolé : aucun pion noir sur les colonnes c et e. Ce sont la tour et le cavalier qui le gardent.',
  coups: [
    { de: 'f3', vers: 'd4', nom: 'Cd4', phrase: 'Ton cavalier s’installe juste devant le pion. Aucun pion noir ne peut le chasser, et le pion est bloqué.', cases: ['f3', 'd4', 'd5'] },
  ],
};
