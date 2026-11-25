// Les exemples de l'échiquier du haut de page.
// Ce sont de vraies réponses du coach de l'appli (25 novembre 2026, branché sur Claude), recopiées mot pour mot,
// choisies et relues : chaque coup est vérifié par le moteur Stockfish.
window.EXEMPLES = [
  {
    "titre": "Le coup à trouver : mat en 2 avec sacrifice de dame",
    "fen": "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
    "trait": "blancs",
    "source": "Partie classique : Paul Morphy – duc de Brunswick et comte Isouard, Paris 1858 (« la partie de l'Opéra »), position avant le 16e coup blanc.",
    "question": "Je joue quoi ici ?",
    "question_en": "What do I play here?",
    "reponse_du_coach": "Joue Db8+ : tu as un mat en 2 ! Le cavalier est obligé de prendre ta dame, ce qui libère la colonne d, et ta tour donne mat en d8 : le roi noir n'a aucune case de fuite sur sa dernière rangée. Avant de jouer, regarde si un sacrifice avec échec ouvre une ligne vers le roi adverse.",
    "meilleur_coup": {
      "notation_appli": "Db8+",
      "cases": "b3b8"
    }
  },
  {
    "titre": "Le plan : roques opposés, la course des pions",
    "fen": "r1bq1rk1/1p2bppp/p1nppn2/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 5 10",
    "trait": "blancs",
    "source": "Position de théorie connue : défense sicilienne, « attaque anglaise » (1. e4 c5 2. Cf3 d6 3. d4 cxd4 4. Cxd4 Cf6 5. Cc3 a6 6. Fe3 e6 7. f3 Fe7 8. Dd2 O-O 9. O-O-O Cc6). Pas une partie précise.",
    "question": "C'est quoi le plan ici ?",
    "question_en": "What's the plan here?",
    "reponse_du_coach": "Le plan : attaquer à l'aile roi, où se trouve son roi, en avançant tes pions de ce côté pour ouvrir des lignes, par exemple g4. Vos rois sont de côtés opposés, c'est donc une course où il faut arriver le premier. Ne touche pas aux pions devant ton roi en c1, et tu restes un peu mieux."
  },
  {
    "titre": "La finale : roi et pion, le roi passe devant",
    "fen": "8/4k3/8/3K4/4P3/8/8/8 w - - 0 1",
    "trait": "blancs",
    "source": "Position d'école construite (finale roi et pion contre roi : le roi devant son pion). Pas tirée d'une partie.",
    "question": "Comment je gagne ça ?",
    "question_en": "How do I win this?",
    "reponse_du_coach": "Joue Re5 : ton roi passe devant ton pion, sur les cases qu'il devra traverser, et lui ouvre la route vers la promotion. Après Rd7, ton roi continue vers f6, puis le pion avance sous sa protection et tu gagnes. Repère : dans une finale roi et pion contre roi, ton roi marche devant son pion, il ne le suit pas.",
    "meilleur_coup": {
      "notation_appli": "Re5",
      "cases": "d5e5"
    }
  }
];
