// LA SCANDINAVE (page écrite du côté des Noirs : « tu » = les Noirs) — les coups du plateau et la phrase sous chaque coup.
// Même modèle que l’Italienne (ouvertures/italienne/donnees.js) ; les textes de la page sont dans index.html.
// « de » et « vers » : les cases du coup. Le roque s’écrit par le coup du roi (e1 → g1, e8 → g8) : ouverture.js déplace la tour.
// « nom » : le coup comme on l’écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// Chaque coup a été vérifié légal avec python-chess le 25 novembre 2026.
window.OUVERTURE = {
  nom: 'la Scandinave',
  // Le plateau est montré du côté des Noirs : les Noirs en bas (ouverture.js le retourne).
  cote: 'noirs',
  // La position montrée à l’arrivée : après ce nombre de demi-coups (2 = après 1… d5, le coup qui donne son nom à l’ouverture).
  depart: 2,
  phraseDepart: 'La position de départ. Avance coup par coup : chaque coup a sa raison.',
  coups: [
    { de: 'e2', vers: 'e4', nom: 'e4', phrase: 'Les Blancs posent un pion au centre.' },
    { de: 'd7', vers: 'd5', nom: 'd5', phrase: 'Voilà la Scandinave. Tu attaques le pion e4 dès le premier coup.' },
    { de: 'e4', vers: 'd5', nom: 'exd5', phrase: 'Les Blancs prennent ton pion.' },
    { de: 'd8', vers: 'd5', nom: 'Dxd5', phrase: 'Tu reprends avec ta dame. La voilà au centre, bien en vue.' },
    { de: 'b1', vers: 'c3', nom: 'Cc3', phrase: 'Le cavalier blanc sort en attaquant ta dame.' },
    { de: 'd5', vers: 'a5', nom: 'Da5', phrase: 'Ta dame se range sur le côté. De là, elle garde un œil sur le cavalier c3.' },
    { de: 'd2', vers: 'd4', nom: 'd4', phrase: 'Les Blancs posent un pion au centre et ouvrent la route à leur fou.' },
    { de: 'g8', vers: 'f6', nom: 'Cf6', phrase: 'Ton cavalier sort et surveille les cases d5 et e4.' },
    { de: 'g1', vers: 'f3', nom: 'Cf3', phrase: 'Le deuxième cavalier blanc sort.' },
    { de: 'c7', vers: 'c6', nom: 'c6', phrase: 'Un petit coup très utile : ta dame a un chemin pour rentrer, par c7 ou d8.' },
    { de: 'f1', vers: 'c4', nom: 'Fc4', phrase: 'Le fou blanc sort et vise f7.' },
    { de: 'c8', vers: 'f5', nom: 'Ff5', phrase: 'Ton fou sort d’abord. Ton pion ira en e6 juste après, sans l’enfermer.' },
    { de: 'c1', vers: 'd2', nom: 'Fd2', phrase: 'Le fou blanc se place devant son roi. Le cavalier c3, que ta dame tenait immobile, peut bouger.' },
    { de: 'e7', vers: 'e6', nom: 'e6', phrase: 'Ton pion ferme la diagonale du fou blanc et ouvre la route à ton fou de f8. Place aux plans.' },
  ],
};
