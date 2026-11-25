// LES RÉGLAGES DE LA PAGE D'ACCUEIL — ce qu'il reste à brancher.
// Tant qu'une ligne est vide (''), la page le dit honnêtement (« bientôt ») au lieu de montrer un lien mort.
window.REGLAGES = {
  // Le nom du produit.
  // Il change partout d'un coup.
  nom: 'Éperon',

  // Adresse du dépôt public (le code et le guide d'installation). Vide = « Le code sera publié bientôt ».
  adresseCode: '',

  // Adresse où les joueurs donnent leur avis (la boîte à idées du dépôt GitHub, gratuite). Vide = « bientôt ».
  adresseAvis: '',

  // Adresse du salon de discussion (l'invitation Discord). Vide = « Le salon de discussion ouvre bientôt ».
  // Lien sans date de fin, créé par Maxime le 25 novembre 2026 (vérifié chez Discord).
  adresseDiscussion: 'https://discord.gg/Xv5nVZFZyy',

  // LA LISTE D'ATTENTE — pas encore ouverte.
  // Le lien de partage du formulaire d'inscription. La page montre alors un bouton « Laisser mon adresse » qui y mène.
  // Vide = la page dit que la liste n'est pas encore ouverte.
  adresseFormulaire: '',

  // Autre voie, pour le jour où Éperon aura son propre serveur : une adresse qui reçoit {email, langue} en JSON.
  // La page montre alors son propre champ. Laisser vide tant que le formulaire sert.
  adresseListe: '',

  // Adresse de l'appli en ligne, le jour où elle existe. Vide = la page parle de « plus tard ».
  adresseAppli: '',
};
