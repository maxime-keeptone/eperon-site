// Le menu « Apprendre » du téléphone (le pli du bandeau, liens.css) : il se ferme tout seul.
// Quand on touche ailleurs, quand on choisit un lien, avec la touche Échap, et quand on revient par « retour ».
(function () {
  var pli = document.querySelector('.barre-pli');
  if (!pli) return;
  var titre = pli.querySelector('summary');
  function fermer() {
    pli.open = false;
  }
  // Un toucher à côté ferme le menu, et rien d'autre : ce qu'il y a derrière ne s'ouvre pas.
  document.addEventListener(
    'click',
    function (e) {
      if (!pli.open) return;
      if (pli.contains(e.target)) {
        if (e.target.closest && e.target.closest('a')) fermer();
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      fermer();
    },
    true
  );
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !pli.open) return;
    fermer();
    if (titre) titre.focus();
  });
  // Le navigateur garde parfois la page telle qu'on l'a quittée : au retour, le menu est fermé.
  window.addEventListener('pageshow', fermer);
  window.addEventListener('pagehide', fermer);
})();
