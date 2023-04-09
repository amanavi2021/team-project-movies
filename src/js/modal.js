export function toggleModal() {
  const refs = {
    openModal: document.querySelector('[data-modal-open]'),
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  function openModal() {
    refs.modal.classList.remove('is-hidden');
    window.addEventListener('keydown', closeModalOnEsc);
    refs.modal.addEventListener('click', closeModalOnClickOutside);
  }

  function closeModal() {
    refs.modal.classList.add('is-hidden');
    window.removeEventListener('keydown', closeModalOnEsc); 
    refs.modal.removeEventListener('click', closeModalOnClickOutside); 
  }

  function closeModalOnEsc(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }

  function closeModalOnClickOutside(event) {
    if (event.target === refs.modal) {
      closeModal();
    }
  }

  refs.openModal.addEventListener('click', openModal);
  refs.closeModal.addEventListener('click', closeModal);
}


toggleModal();