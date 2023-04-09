import markupModalMovie from '../templates/markupModalMovie.hbs';
import apiService from './apiService';

export function toggleModal() {
  const refs = {
    openModal: document.querySelector('[data-modal-open]'),
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    filmClick: document.querySelector('.gallery'),
    filmInfo: document.querySelector('.film-info__wrap'),
  };

  function renderList() {
    refs.filmInfo.insertAdjacentHTML(`beforeend`, markupModalMovie());
  }

  refs.openModal.addEventListener('click', toggleModal);
  refs.closeModal.addEventListener('click', toggleModal);
  refs.filmClick.addEventListener('click', onClickOpen);
  refs.closeModal.addEventListener('click', onClickClose);

  function onClickOpen() {
    refs.modal.classList.remove('is-hidden');
    renderList();
  }

  function onClickClose() {
    refs.modal.classList.add('is-hidden');
    clearModalMovie(refs.filmInfo);
  }

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }

  function clearModalMovie(ref) {
    ref.innerHTML = '';
  }
}
