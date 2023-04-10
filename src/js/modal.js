import markupModalMovie from '../templates/markup-modal-movie.hbs';
import apiService from './apiService';

export function toggleModal() {
  const refs = {
    // openModal: document.querySelector('[data-modal-open]'),
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    filmClick: document.querySelector('.gallery'),
    filmInfo: document.querySelector('.film-info__wrap'),
  };

  function openModal(e) {
    if (
      e.target === e.currentTarget ||
      e.target.nodeName === `BUTTON` ||
      e.target.classList.contains(`trailer-player-wrapper`)
    ) {
      return;
    }
    console.log(e.target.nodeName)
    refs.modal.classList.remove('is-hidden');
    window.addEventListener('keydown', closeModalOnEsc);
    refs.modal.addEventListener('click', closeModalOnClickOutside);
    renderList();
  }

  function closeModal() {
    refs.modal.classList.add('is-hidden');
    window.removeEventListener('keydown', closeModalOnEsc);
    refs.modal.removeEventListener('click', closeModalOnClickOutside);
    clearModalMovie(refs.filmInfo);
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

  // refs.openModal.addEventListener('click', openModal);
  // refs.closeModal.addEventListener('click', closeModal);
  refs.filmClick.addEventListener('click', openModal);
  refs.closeModal.addEventListener('click', closeModal);

  // function onClickOpen() {
  //   refs.modal.classList.remove('is-hidden');
  //   renderList();
  // }

  // function onClickClose() {
  //   refs.modal.classList.add('is-hidden');
  //   clearModalMovie(refs.filmInfo);
  // }

  function renderList() {
    refs.filmInfo.insertAdjacentHTML(`beforeend`, markupModalMovie());
  }

  function clearModalMovie(ref) {
    ref.innerHTML = '';
  }
}

toggleModal();
