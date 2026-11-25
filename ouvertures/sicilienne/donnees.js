// LA SICILIENNE — les coups du plateau et la phrase sous chaque coup.
// Même modèle que l’Italienne (ouvertures/italienne/donnees.js) : une ouverture = un fichier comme celui-ci, et sa page index.html pour les textes.
// « de » et « vers » : les cases du coup. Le roque s’écrit par le coup du roi (e1 → g1) : ouverture.js déplace la tour.
// « nom » : le coup comme on l’écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// Ici, le « tu » des phrases est celui qui joue les Noirs : c’est lui qui choisit cette ouverture.
// Chaque coup a été vérifié légal avec python-chess le 25 novembre 2026.
window.OUVERTURE = {
  nom: 'la Sicilienne',
  // Le plateau est montré du côté des Noirs : les Noirs en bas (ouverture.js le retourne).
  cote: 'noirs',
  // La position montrée à l’arrivée : après ce nombre de demi-coups (2 = après 1… c5, le coup qui donne son nom à l’ouverture).
  depart: 2,
  phraseDepart: 'La position de départ. Avance coup par coup : chaque coup a sa raison.',
  coups: [
    { de: 'e2', vers: 'e4', nom: 'e4', phrase: 'Les Blancs posent un pion au centre.' },
    { de: 'c7', vers: 'c5', nom: 'c5', phrase: 'Voilà la Sicilienne. Ton pion surveille la case d4 depuis le côté.' },
    { de: 'g1', vers: 'f3', nom: 'Cf3', phrase: 'Le cavalier blanc sort et prépare la poussée d4.' },
    { de: 'd7', vers: 'd6', nom: 'd6', phrase: 'Tu ouvres la route à ton fou et tu surveilles la case e5.' },
    { de: 'd2', vers: 'd4', nom: 'd4', phrase: 'Les Blancs ouvrent le centre. Ton pion c5 peut prendre.' },
    { de: 'c5', vers: 'd4', nom: 'cxd4', phrase: 'Tu prends : un pion du côté contre un pion du centre. C’est toute l’idée de la Sicilienne.' },
    { de: 'f3', vers: 'd4', nom: 'Cxd4', phrase: 'Le cavalier blanc reprend et s’installe au centre. Sur la colonne c, tu n’as plus de pion : tes tours y seront bien.' },
    { de: 'g8', vers: 'f6', nom: 'Cf6', phrase: 'Ton cavalier sort et attaque le pion e4.' },
    { de: 'b1', vers: 'c3', nom: 'Cc3', phrase: 'Le deuxième cavalier blanc sort et défend e4.' },
    { de: 'g7', vers: 'g6', nom: 'g6', phrase: 'Tu prépares une belle place pour ton fou, en g7.' },
    { de: 'f1', vers: 'e2', nom: 'Fe2', phrase: 'Les Blancs sortent leur fou et préparent leur roque.' },
    { de: 'f8', vers: 'g7', nom: 'Fg7', phrase: 'Ton fou s’installe sur la grande diagonale, juste à côté de ton futur roque.' },
    { de: 'e1', vers: 'g1', nom: 'O-O', phrase: 'Les Blancs roquent : leur roi est à l’abri.' },
    { de: 'e8', vers: 'g8', nom: 'O-O', phrase: 'Tu roques aussi. Ton fou g7 reste tout près de ton roi.' },
    { de: 'c1', vers: 'e3', nom: 'Fe3', phrase: 'Le dernier fou blanc sort et soutient le cavalier d4.' },
    { de: 'b8', vers: 'c6', nom: 'Cc6', phrase: 'Ton deuxième cavalier sort et attaque le cavalier d4. Place aux plans.' },
  ],
};
