// LA FRANÇAISE — les coups du plateau et la phrase sous chaque coup.
// Même modèle que l’Italienne (ouvertures/italienne/donnees.js) : une ouverture = un fichier comme celui-ci, et sa page index.html pour les textes.
// « de » et « vers » : les cases du coup. Le roque s’écrit par le coup du roi (e1 → g1) : ouverture.js déplace la tour.
// « nom » : le coup comme on l’écrit en français (C cavalier, F fou, T tour, D dame, R roi).
// Ici, le « tu » des phrases est celui qui joue les Noirs : c’est lui qui choisit cette ouverture.
// Chaque coup a été vérifié légal avec python-chess le 25 novembre 2026.
window.OUVERTURE = {
  nom: 'la Française',
  // Le plateau est montré du côté des Noirs : les Noirs en bas (ouverture.js le retourne).
  cote: 'noirs',
  // La position montrée à l’arrivée : après ce nombre de demi-coups (4 = après 2… d5, la position qui donne son nom à l’ouverture).
  depart: 4,
  phraseDepart: 'La position de départ. Avance coup par coup : chaque coup a sa raison.',
  coups: [
    { de: 'e2', vers: 'e4', nom: 'e4', phrase: 'Les Blancs posent un pion au centre.' },
    { de: 'e7', vers: 'e6', nom: 'e6', phrase: 'Un petit pas qui prépare le suivant : ton pion ira en d5, et celui-ci le soutiendra.' },
    { de: 'd2', vers: 'd4', nom: 'd4', phrase: 'Les Blancs posent un deuxième pion au centre.' },
    { de: 'd7', vers: 'd5', nom: 'd5', phrase: 'Voilà la Française. Ton pion d5, soutenu par e6, attaque le pion e4.' },
    { de: 'e4', vers: 'e5', nom: 'e5', phrase: 'Les Blancs avancent et gagnent de la place. Le centre est fermé : tu vas l’attaquer par le côté.' },
    { de: 'c7', vers: 'c5', nom: 'c5', phrase: 'Tu attaques tout de suite le pion d4, celui qui soutient e5.' },
    { de: 'c2', vers: 'c3', nom: 'c3', phrase: 'Les Blancs soutiennent d4 avec un pion.' },
    { de: 'b8', vers: 'c6', nom: 'Cc6', phrase: 'Ton cavalier sort et attaque d4 à son tour.' },
    { de: 'g1', vers: 'f3', nom: 'Cf3', phrase: 'Le cavalier blanc sort et défend d4.' },
    { de: 'd8', vers: 'b6', nom: 'Db6', phrase: 'Ta dame vient à côté de ton pion c5 et appuie, elle aussi, sur d4. Elle regarde déjà le pion b2.' },
    { de: 'f1', vers: 'e2', nom: 'Fe2', phrase: 'Les Blancs sortent leur fou et préparent leur roque.' },
    { de: 'c5', vers: 'd4', nom: 'cxd4', phrase: 'Tu prends en d4 : la route de ta dame va s’ouvrir.' },
    { de: 'c3', vers: 'd4', nom: 'cxd4', phrase: 'Les Blancs reprennent avec le pion. Ta dame et ton cavalier attaquent maintenant d4.' },
    { de: 'g8', vers: 'e7', nom: 'Cge7', phrase: 'Ton cavalier de g8 part en voyage : e7, puis f5, d’où il attaquera d4 à son tour.' },
    { de: 'b1', vers: 'a3', nom: 'Ca3', phrase: 'Le cavalier blanc part lui aussi en voyage : il vise c2, pour soutenir d4.' },
    { de: 'e7', vers: 'f5', nom: 'Cf5', phrase: 'Ton cavalier arrive en f5. Trois de tes pièces attaquent d4 : place aux plans.' },
  ],
};
