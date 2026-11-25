// L'ITALIENNE — les coups du plateau et la phrase sous chaque coup.
// Une autre ouverture = un autre fichier comme celui-ci (et sa page index.html pour les textes).
// « de » et « vers » : les cases du coup. Le roque s'écrit par le coup du roi (e1 → g1) : ouverture.js déplace la tour.
// « nom » : le coup comme on l'écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// Chaque coup a été vérifié légal avec python-chess le 25 novembre 2026.
window.OUVERTURE = {
  nom: 'l’Italienne',
  // La position montrée à l'arrivée : après ce nombre de demi-coups (5 = après 3. Fc4, la position qui donne son nom à l'ouverture).
  depart: 5,
  phraseDepart: 'La position de départ. Avance coup par coup : chaque coup a sa raison.',
  coups: [
    { de: 'e2', vers: 'e4', nom: 'e4', phrase: 'Tu poses un pion au centre et tu ouvres la route à ton fou et à ta dame.' },
    { de: 'e7', vers: 'e5', nom: 'e5', phrase: 'Les Noirs font pareil : un pion au centre, des lignes ouvertes.' },
    { de: 'g1', vers: 'f3', nom: 'Cf3', phrase: 'Ton cavalier sort et attaque le pion e5.' },
    { de: 'b8', vers: 'c6', nom: 'Cc6', phrase: 'Le cavalier noir sort à son tour et défend le pion e5.' },
    { de: 'f1', vers: 'c4', nom: 'Fc4', phrase: 'Voilà l’Italienne. Ton fou vise f7, la case que seul le roi noir défend.' },
    { de: 'f8', vers: 'c5', nom: 'Fc5', phrase: 'Les Noirs répondent avec la même idée : leur fou vise f2, la case que seul ton roi défend.' },
    { de: 'c2', vers: 'c3', nom: 'c3', phrase: 'Un petit coup qui en prépare un grand : pousser d4 plus tard, pour prendre le centre.' },
    { de: 'g8', vers: 'f6', nom: 'Cf6', phrase: 'Le deuxième cavalier noir sort et attaque ton pion e4.' },
    { de: 'd2', vers: 'd3', nom: 'd3', phrase: 'Tu défends e4 en douceur. La poussée d4 attend que tes pièces soient prêtes.' },
    { de: 'd7', vers: 'd6', nom: 'd6', phrase: 'Les Noirs soutiennent e5 et ouvrent la route à leur deuxième fou.' },
    { de: 'e1', vers: 'g1', nom: 'O-O', phrase: 'Tu roques : ton roi est à l’abri et ta tour se rapproche du centre.' },
    { de: 'e8', vers: 'g8', nom: 'O-O', phrase: 'Les Noirs roquent aussi. Les deux rois sont en sécurité, la vraie partie commence.' },
    { de: 'f1', vers: 'e1', nom: 'Te1', phrase: 'Ta tour soutient e4. Et la case f1 est libre pour ton cavalier, qui voyagera de b1 à g3.' },
    { de: 'a7', vers: 'a6', nom: 'a6', phrase: 'Les Noirs préparent une cachette pour leur fou en a7. Tout le monde est prêt : place aux plans.' },
  ],
};
