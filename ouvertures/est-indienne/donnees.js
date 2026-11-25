// L’EST-INDIENNE (page écrite du côté des Noirs : « tu » = les Noirs) — les coups du plateau et la phrase sous chaque coup.
// Même modèle que l’Italienne (ouvertures/italienne/donnees.js) ; les textes de la page sont dans index.html.
// « de » et « vers » : les cases du coup. Le roque s’écrit par le coup du roi (e1 → g1, e8 → g8) : ouverture.js déplace la tour.
// « nom » : le coup comme on l’écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// Chaque coup a été vérifié légal avec python-chess le 25 novembre 2026.
window.OUVERTURE = {
  nom: 'l’Est-indienne',
  // Le plateau est montré du côté des Noirs : les Noirs en bas (ouverture.js le retourne).
  cote: 'noirs',
  // La position montrée à l’arrivée : après ce nombre de demi-coups (4 = après 2… g6, le coup qui donne son nom à l’ouverture).
  depart: 4,
  phraseDepart: 'La position de départ. Avance coup par coup : chaque coup a sa raison.',
  coups: [
    { de: 'd2', vers: 'd4', nom: 'd4', phrase: 'Les Blancs posent un pion au centre.' },
    { de: 'g8', vers: 'f6', nom: 'Cf6', phrase: 'Ton cavalier sort et surveille la case e4.' },
    { de: 'c2', vers: 'c4', nom: 'c4', phrase: 'Les Blancs prennent encore plus de place.' },
    { de: 'g7', vers: 'g6', nom: 'g6', phrase: 'Voilà l’Est-indienne. Tu prépares une maison pour ton fou en g7.' },
    { de: 'b1', vers: 'c3', nom: 'Cc3', phrase: 'Le cavalier blanc sort et soutient la poussée e4.' },
    { de: 'f8', vers: 'g7', nom: 'Fg7', phrase: 'Ton fou s’installe sur la grande diagonale. C’est une de tes meilleures pièces : prends-en soin.' },
    { de: 'e2', vers: 'e4', nom: 'e4', phrase: 'Les Blancs ont trois pions au centre. Tu les laisses s’installer : tu les attaqueras juste après.' },
    { de: 'd7', vers: 'd6', nom: 'd6', phrase: 'Ton pion surveille la case e5 et prépare ta propre poussée au centre.' },
    { de: 'g1', vers: 'f3', nom: 'Cf3', phrase: 'Le deuxième cavalier blanc sort et surveille e5, lui aussi.' },
    { de: 'e8', vers: 'g8', nom: 'O-O', phrase: 'Tu roques : ton roi est à l’abri, juste derrière ton fou.' },
    { de: 'f1', vers: 'e2', nom: 'Fe2', phrase: 'Le fou blanc sort d’un pas pour préparer le roque.' },
    { de: 'e7', vers: 'e5', nom: 'e5', phrase: 'Tu attaques le centre blanc. Si les Blancs échangent les pions, puis les dames, et prennent ton pion e5, ton cavalier prend leur pion e4 : le compte est bon.' },
    { de: 'e1', vers: 'g1', nom: 'O-O', phrase: 'Les Blancs roquent à leur tour.' },
    { de: 'b8', vers: 'c6', nom: 'Cc6', phrase: 'Ton cavalier sort et ajoute de la pression sur d4.' },
    { de: 'd4', vers: 'd5', nom: 'd5', phrase: 'Le pion blanc avance et attaque ton cavalier. Le centre se ferme.' },
    { de: 'c6', vers: 'e7', nom: 'Ce7', phrase: 'Ton cavalier file en e7, du côté de ton roi. Le centre est fermé : place aux plans.' },
  ],
};
