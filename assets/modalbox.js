const modal = document.getElementById('myModal');
const modalBackground = document.getElementById('modalBackground');

function openModal() {
  modal.style.display = 'block';
  modalBackground.style.display = 'block';
  document.body.style.overflow = 'hidden'; 
}

function closeModal() {
  modal.style.display = 'none';
  modalBackground.style.display = 'none';
  document.body.style.overflow = 'auto'; 
}

modalBackground.addEventListener('click', function(event) {
  if (event.target === modalBackground) {
    closeModal();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});