// LE SYSTÈME DE LONDRES — les coups du plateau et la phrase sous chaque coup.
// Même modèle que l’Italienne (ouvertures/italienne/donnees.js) ; les textes de la page sont dans index.html.
// « de » et « vers » : les cases du coup. Le roque s’écrit par le coup du roi (e1 → g1, e8 → g8) : ouverture.js déplace la tour.
// « nom » : le coup comme on l’écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// Chaque coup a été vérifié légal avec python-chess le 25 novembre 2026.
window.OUVERTURE = {
  nom: 'le Système de Londres',
  // La position montrée à l’arrivée : après ce nombre de demi-coups (3 = après 2. Ff4, le coup qui donne son nom à l’ouverture).
  depart: 3,
  phraseDepart: 'La position de départ. Avance coup par coup : chaque coup a sa raison.',
  coups: [
    { de: 'd2', vers: 'd4', nom: 'd4', phrase: 'Tu poses un pion au centre. Ta dame le défend déjà.' },
    { de: 'd7', vers: 'd5', nom: 'd5', phrase: 'Les Noirs font pareil : un pion au centre, face au tien.' },
    { de: 'c1', vers: 'f4', nom: 'Ff4', phrase: 'Voilà le Système de Londres. Ton fou sort d’abord : ton pion ira en e3 juste après, sans l’enfermer.' },
    { de: 'g8', vers: 'f6', nom: 'Cf6', phrase: 'Le cavalier noir sort et surveille la case e4.' },
    { de: 'e2', vers: 'e3', nom: 'e3', phrase: 'Tu soutiens d4 et tu ouvres la route à ton deuxième fou.' },
    { de: 'c7', vers: 'c5', nom: 'c5', phrase: 'Les Noirs attaquent ton pion d4 par le côté.' },
    { de: 'c2', vers: 'c3', nom: 'c3', phrase: 'Tu soutiens d4 une deuxième fois. Tes pions c3, d4 et e3 forment un triangle solide.' },
    { de: 'b8', vers: 'c6', nom: 'Cc6', phrase: 'Le cavalier noir sort et ajoute de la pression sur d4.' },
    { de: 'b1', vers: 'd2', nom: 'Cd2', phrase: 'Ton cavalier sort par d2, puisque ton pion occupe c3. De là, il surveille e4.' },
    { de: 'e7', vers: 'e6', nom: 'e6', phrase: 'Les Noirs ouvrent la route à leur fou de f8.' },
    { de: 'g1', vers: 'f3', nom: 'Cgf3', phrase: 'Ton deuxième cavalier sort. Il défend d4 et vise la case e5.' },
    { de: 'f8', vers: 'd6', nom: 'Fd6', phrase: 'Le fou noir sort en face du tien et propose l’échange.' },
    { de: 'f4', vers: 'g3', nom: 'Fg3', phrase: 'Ton fou recule d’un pas. S’il est pris, ton pion h reprend et ta tour gagne une colonne.' },
    { de: 'e8', vers: 'g8', nom: 'O-O', phrase: 'Les Noirs roquent. Tout le monde est prêt : place aux plans.' },
  ],
};
