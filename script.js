function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  document.getElementById(pageId).classList.add('active');
}

function saveForm() {
  alert("Form saved (frontend only for now)");
}
