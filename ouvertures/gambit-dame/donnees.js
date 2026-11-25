// LE GAMBIT DAME REFUSÉ — les coups du plateau et la phrase sous chaque coup.
// Même modèle que l’Italienne (ouvertures/italienne/donnees.js) ; les textes de la page sont dans index.html.
// « de » et « vers » : les cases du coup. Le roque s’écrit par le coup du roi (e1 → g1, e8 → g8) : ouverture.js déplace la tour.
// « nom » : le coup comme on l’écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// Chaque coup a été vérifié légal avec python-chess le 25 novembre 2026.
window.OUVERTURE = {
  nom: 'le Gambit dame refusé',
  // La position montrée à l’arrivée : après ce nombre de demi-coups (4 = après 2… e6, le coup qui donne son nom à l’ouverture).
  depart: 4,
  phraseDepart: 'La position de départ. Avance coup par coup : chaque coup a sa raison.',
  coups: [
    { de: 'd2', vers: 'd4', nom: 'd4', phrase: 'Tu poses un pion au centre. Ta dame le défend déjà.' },
    { de: 'd7', vers: 'd5', nom: 'd5', phrase: 'Les Noirs font pareil : un pion au centre, face au tien.' },
    { de: 'c2', vers: 'c4', nom: 'c4', phrase: 'Voilà le gambit dame : ton pion attaque d5. S’il est pris, le centre est à toi, et tu regagnes ce pion le plus souvent.' },
    { de: 'e7', vers: 'e6', nom: 'e6', phrase: 'Les Noirs ne prennent pas. Leur pion e6 défend d5 : c’est le Gambit dame refusé.' },
    { de: 'b1', vers: 'c3', nom: 'Cc3', phrase: 'Ton cavalier sort et attaque d5 à son tour.' },
    { de: 'g8', vers: 'f6', nom: 'Cf6', phrase: 'Le cavalier noir sort et défend d5.' },
    { de: 'c1', vers: 'g5', nom: 'Fg5', phrase: 'Ton fou sort et vise le cavalier f6, un des gardiens de d5.' },
    { de: 'f8', vers: 'e7', nom: 'Fe7', phrase: 'Le fou noir sort d’un pas et soutient son cavalier.' },
    { de: 'e2', vers: 'e3', nom: 'e3', phrase: 'Tu ouvres la route à ton deuxième fou. Du même coup, il défend ton pion c4.' },
    { de: 'e8', vers: 'g8', nom: 'O-O', phrase: 'Les Noirs roquent : leur roi est à l’abri.' },
    { de: 'g1', vers: 'f3', nom: 'Cf3', phrase: 'Ton deuxième cavalier sort et surveille la case e5.' },
    { de: 'b8', vers: 'd7', nom: 'Cbd7', phrase: 'Le cavalier noir sort en d7. Il soutient l’autre cavalier et laisse le pion c libre.' },
    { de: 'a1', vers: 'c1', nom: 'Tc1', phrase: 'Ta tour se place sur la colonne c, celle qui s’ouvrira quand les pions s’échangeront.' },
    { de: 'c7', vers: 'c6', nom: 'c6', phrase: 'Les Noirs soutiennent d5 une fois de plus. Tout le monde est prêt : place aux plans.' },
  ],
  // La suite du bon réflexe, pour le bouton « Voir sur le plateau » : on garde les 7 premiers demi-coups (jusqu’à 4. Fg5), puis ceux-ci.
  // Vérifiés légaux avec python-chess, et au moteur (après 7… Fb4+, les Noirs gagnent une pièce), le 25 novembre 2026.
  reflexe: {
    depuis: 7,
    coups: [
      { de: 'b8', vers: 'd7', nom: 'Cbd7', phrase: 'Un autre coup des Noirs. Leur cavalier f6 a l’air cloué : leur dame est juste derrière lui.' },
      { de: 'c4', vers: 'd5', nom: 'cxd5', phrase: 'Tu prends en d5.' },
      { de: 'e6', vers: 'd5', nom: 'exd5', phrase: 'Les Noirs reprennent avec le pion.' },
      { de: 'c3', vers: 'd5', nom: 'Cxd5', phrase: 'Ton cavalier prend le pion d5. Si le cavalier f6 reprend, ton fou prend la dame.' },
      { de: 'f6', vers: 'd5', nom: 'Cxd5', phrase: 'Il reprend quand même, et laisse sa dame.' },
      { de: 'g5', vers: 'd8', nom: 'Fxd8', phrase: 'Ton fou prend la dame. Cherche l’échec des Noirs.' },
      { de: 'f8', vers: 'b4', nom: 'Fb4+', phrase: 'Échec. Ton seul coup : ta dame en d2. Leur fou la prend, leur roi reprend ton fou, et ils gardent une pièce de plus.' },
    ],
  },
};
