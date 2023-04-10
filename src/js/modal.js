import markupModalMovie from '../templates/markup-modal-movie.hbs';
import apiService from './apiService';
import renderFilms from './renderFilms';
import localStore from './service/localstorage';

export function toggleModal() {
  const refs = {
    // openModal: document.querySelector('[data-modal-open]'),
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    filmClick: document.querySelector('.gallery'),
    filmInfo: document.querySelector('.film-info__wrap'),
  };

  // function openModal(e) {
  //   if (
  //     e.target === e.currentTarget ||
  //     e.target.nodeName === `BUTTON` ||
  //     e.target.classList.contains(`trailer-player-wrapper`)
  //   ) {
  //     return;
  //   }
  //   console.log(e.target.nodeName)
  //   refs.modal.classList.remove('is-hidden');
  //   window.addEventListener('keydown', closeModalOnEsc);
  //   refs.modal.addEventListener('click', closeModalOnClickOutside);
  //   renderList();
  // }

  window.removeEventListener('keydown', closeModalOnEsc);
  refs.modal.removeEventListener('click', closeModalOnClickOutside);

  function closeModal() {
    refs.modal.classList.add('is-hidden');
    document.body.style.overflow = '';
    clearModalMovie(refs.filmInfo);
  }

  function closeModalOnEsc(event) {
    if (event.code !== 'Escape') {
      return;
    }
    window.removeEventListener('keydown', closeModalOnEsc);
    closeModal();
  }

  function closeModalOnClickOutside(event) {
    if (event.target === refs.modal) {
      closeModal();
    }
  }

  // refs.openModal.addEventListener('click', openModal);
  // refs.closeModal.addEventListener('click', closeModal);
  refs.filmClick.addEventListener('click', onClickOpen);
  refs.closeModal.addEventListener('click', closeModal);

  async function onClickOpen(e) {
       if (
         e.target === e.currentTarget ||
         e.target.nodeName === `BUTTON` ||
         e.target.classList.contains(`trailer-player-wrapper`)
       ) {
         return;
       }
    // console.log('id', e.target.dataset.id);

    try {
      let movieId = e.target.dataset.id;
      const movies = apiService.getSavedFilms();


       let movieId = e.target.dataset.id;
       const movies = apiService.getSavedFilms();

      //  console.log('movies', movies);

       const movie = movies.results.find(({id}) => id === Number(movieId));
      //  console.log('movie by method find', movie)
       //  refs.filmInfo.insertAdjacentHTML('beforeend', renderList(movie)) ;
       refs.filmInfo.innerHTML = await renderList(movie);


      const movie = movies.results.find(({ id }) => id === Number(movieId));
      console.log('movie by method find', movie);
      //  refs.filmInfo.insertAdjacentHTML('beforeend', renderList(movie)) ;
      refs.filmInfo.innerHTML = await renderList(movie);
    } catch (error) {
      console.error(error);
    }
    window.addEventListener('keydown', closeModalOnEsc);
    refs.modal.classList.remove('is-hidden');

    // renderList();
    //document.body.style.overflow = 'hidden';

  }

  // function onClickClose() {
  //   refs.modal.classList.add('is-hidden');
  //   clearModalMovie(refs.filmInfo);
  // }

  async function renderList(movie) {

    // console.log('renderList called with movie:', movie);
    await apiService.saveGenresToLocalStorage();
    const genres = localStore.load('genres') || [];
    // console.log('GENRES', genres);

        const { poster_path, backdrop_path, title, genre_ids, release_date, id, popularity, vote_average, vote_count, overview
    } = movie;

    if (poster_path !== null) {
      const date = new Date(release_date);
      const year = date.getFullYear();
      let genreList = genre_ids.map(genreId => {
        const genre = genres.find(g => g.id === genreId);
        return genre.name;
      });
      if (genreList.length > 2 || genre_ids.length === 0) {
        genreList = genreList.slice(0, 2);
        genreList.push('Other');
      }
      genreList = genreList.join(', ');
      return markupModalMovie({ poster_path, backdrop_path, title, genreList, year, id, popularity, vote_average, vote_count, overview

      });
    }
  }

  function clearModalMovie(ref) {
    ref.innerHTML = '';
  }
}

toggleModal();
