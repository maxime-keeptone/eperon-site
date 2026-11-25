// L’ESPAGNOLE — les coups du plateau et la phrase sous chaque coup.
// Même modèle que l’Italienne (ouvertures/italienne/donnees.js) : une ouverture = un fichier comme celui-ci, et sa page index.html pour les textes.
// « de » et « vers » : les cases du coup. Le roque s’écrit par le coup du roi (e1 → g1) : ouverture.js déplace la tour.
// « nom » : le coup comme on l’écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// Chaque coup a été vérifié légal avec python-chess le 25 novembre 2026.
window.OUVERTURE = {
  nom: 'l’Espagnole',
  // La position montrée à l’arrivée : après ce nombre de demi-coups (5 = après 3. Fb5, la position qui donne son nom à l’ouverture).
  depart: 5,
  phraseDepart: 'La position de départ. Avance coup par coup : chaque coup a sa raison.',
  coups: [
    { de: 'e2', vers: 'e4', nom: 'e4', phrase: 'Tu poses un pion au centre et tu ouvres la route à ton fou et à ta dame.' },
    { de: 'e7', vers: 'e5', nom: 'e5', phrase: 'Les Noirs font pareil : un pion au centre, des lignes ouvertes.' },
    { de: 'g1', vers: 'f3', nom: 'Cf3', phrase: 'Ton cavalier sort et attaque le pion e5.' },
    { de: 'b8', vers: 'c6', nom: 'Cc6', phrase: 'Le cavalier noir sort à son tour et défend le pion e5.' },
    { de: 'f1', vers: 'b5', nom: 'Fb5', phrase: 'Voilà l’Espagnole. Ton fou attaque le cavalier c6, celui qui défend e5.' },
    { de: 'a7', vers: 'a6', nom: 'a6', phrase: 'Les Noirs posent une question à ton fou : tu prends le cavalier ou tu recules ?' },
    { de: 'b5', vers: 'a4', nom: 'Fa4', phrase: 'Tu recules et tu gardes ton fou. Il regarde toujours le cavalier c6.' },
    { de: 'g8', vers: 'f6', nom: 'Cf6', phrase: 'Le deuxième cavalier noir sort et attaque ton pion e4.' },
    { de: 'e1', vers: 'g1', nom: 'O-O', phrase: 'Tu roques, et tu laisses e4 sans défenseur : c’est permis. Si le cavalier noir le prend, tu pousses d4 ou tu joues ta tour en e1. Le roi noir est encore au milieu, et tu regagnes ton pion.' },
    { de: 'f8', vers: 'e7', nom: 'Fe7', phrase: 'Les Noirs sortent leur fou et préparent leur roque.' },
    { de: 'f1', vers: 'e1', nom: 'Te1', phrase: 'Ta tour défend le pion e4. Maintenant, ton fou peut vraiment prendre le cavalier c6, le seul gardien de e5.' },
    { de: 'b7', vers: 'b5', nom: 'b5', phrase: 'Les Noirs chassent ton fou : leur cavalier c6 reste en place. Et ils gagnent de la place de ce côté.' },
    { de: 'a4', vers: 'b3', nom: 'Fb3', phrase: 'Ton fou recule en b3. De là, il vise f7, tout près du roi noir.' },
    { de: 'd7', vers: 'd6', nom: 'd6', phrase: 'Les Noirs soutiennent e5 et ouvrent la route à leur deuxième fou.' },
    { de: 'c2', vers: 'c3', nom: 'c3', phrase: 'Un petit coup qui en prépare un grand : pousser d4. Et la case c2 devient une cachette pour ton fou.' },
    { de: 'e8', vers: 'g8', nom: 'O-O', phrase: 'Les Noirs roquent. Les deux rois sont en sécurité : place aux plans.' },
  ],
};
