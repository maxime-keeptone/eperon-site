// LA FOURCHETTE — la position de l'exemple, les cases surlignées et les coups que joue « Montre-moi ».
// Un autre mot = un autre fichier comme celui-ci (et sa page index.html pour les textes).
// « fen » : la position de départ. « cases » : les cases surlignées avant le premier coup.
// « de » et « vers » : les cases du coup. « nom » : le coup comme on l'écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// « cases » dans un coup (facultatif) : les cases à surligner après ce coup, à la place des deux cases du coup.
// Position et coups vérifiés avec python-chess le 25 novembre 2026 (position légale, coups légaux, le thème est bien là).
window.MOT = {
  nom: 'fourchette',
  fen: 'r3kb2/pp3ppp/3p4/3N4/8/8/PPP2PPP/5RK1 w - - 0 1',
  cases: ['d5', 'e8', 'a8'],
  description: 'L’échiquier de l’exemple. Ton cavalier est en d5. D’un seul saut, il peut attaquer le roi noir et la tour en même temps.',
  titreDepart: 'La position',
  phraseDepart: 'Ton cavalier est en d5. D’un seul saut, il peut attaquer le roi noir et la tour en même temps.',
  coups: [
    { de: 'd5', vers: 'c7', nom: 'Cc7+', phrase: 'Échec ! Ton cavalier attaque le roi et la tour à la fois. Personne ne peut le prendre.', cases: ['c7', 'e8', 'a8'] },
    { de: 'e8', vers: 'd7', nom: 'Rd7', phrase: 'Le roi doit se mettre à l’abri. La tour reste seule.' },
    { de: 'c7', vers: 'a8', nom: 'Cxa8', phrase: 'Tu prends la tour. Deux pièces attaquées, une seule sauvée.' },
  ],
};
