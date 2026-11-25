// LA CARO-KANN — les coups du plateau et la phrase sous chaque coup.
// Même modèle que l’Italienne (ouvertures/italienne/donnees.js) : une ouverture = un fichier comme celui-ci, et sa page index.html pour les textes.
// « de » et « vers » : les cases du coup. Le roque s’écrit par le coup du roi (e1 → g1) : ouverture.js déplace la tour.
// « nom » : le coup comme on l’écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// Ici, le « tu » des phrases est celui qui joue les Noirs : c’est lui qui choisit cette ouverture.
// Chaque coup a été vérifié légal avec python-chess le 25 novembre 2026.
window.OUVERTURE = {
  nom: 'la Caro-Kann',
  // Le plateau est montré du côté des Noirs : les Noirs en bas (ouverture.js le retourne).
  cote: 'noirs',
  // La position montrée à l’arrivée : après ce nombre de demi-coups (4 = après 2… d5, la position qui donne son nom à l’ouverture).
  depart: 4,
  phraseDepart: 'La position de départ. Avance coup par coup : chaque coup a sa raison.',
  coups: [
    { de: 'e2', vers: 'e4', nom: 'e4', phrase: 'Les Blancs posent un pion au centre.' },
    { de: 'c7', vers: 'c6', nom: 'c6', phrase: 'Un petit pas qui prépare le suivant : ton pion ira en d5, et celui-ci le soutiendra.' },
    { de: 'd2', vers: 'd4', nom: 'd4', phrase: 'Les Blancs posent un deuxième pion au centre.' },
    { de: 'd7', vers: 'd5', nom: 'd5', phrase: 'Voilà la Caro-Kann. Ton pion d5, soutenu par c6, attaque le pion e4. Et la route de ton fou c8 reste ouverte.' },
    { de: 'b1', vers: 'c3', nom: 'Cc3', phrase: 'Le cavalier blanc sort et défend e4.' },
    { de: 'd5', vers: 'e4', nom: 'dxe4', phrase: 'Tu prends le pion e4. Le centre s’ouvre un peu : ton fou va pouvoir sortir.' },
    { de: 'c3', vers: 'e4', nom: 'Cxe4', phrase: 'Le cavalier blanc reprend et s’installe au centre.' },
    { de: 'c8', vers: 'f5', nom: 'Ff5', phrase: 'Ton fou sort avant que tes pions ne lui ferment la route, et il attaque le cavalier e4.' },
    { de: 'e4', vers: 'g3', nom: 'Cg3', phrase: 'Le cavalier blanc recule et attaque ton fou à son tour.' },
    { de: 'f5', vers: 'g6', nom: 'Fg6', phrase: 'Ton fou recule d’un pas et garde sa belle diagonale : il regarde jusqu’au pion c2.' },
    { de: 'g1', vers: 'f3', nom: 'Cf3', phrase: 'Le deuxième cavalier blanc sort. Il aimerait bien aller en e5.' },
    { de: 'b8', vers: 'd7', nom: 'Cd7', phrase: 'Ton cavalier sort et surveille la case e5.' },
    { de: 'f1', vers: 'd3', nom: 'Fd3', phrase: 'Les Blancs proposent l’échange des fous.' },
    { de: 'g6', vers: 'd3', nom: 'Fxd3', phrase: 'Tu acceptes l’échange : ton fou a bien travaillé.' },
    { de: 'd1', vers: 'd3', nom: 'Dxd3', phrase: 'La dame blanche reprend.' },
    { de: 'e7', vers: 'e6', nom: 'e6', phrase: 'Tu ouvres la route à ton deuxième fou. Ta position est solide : place aux plans.' },
  ],
};
