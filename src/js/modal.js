import markupModalMovie from '../templates/markup-modal-movie.hbs';
import markupModalMovieUa from '../templates/markup-modal-movie-ua.hbs';
import apiService from './apiService';
import renderFilms from './renderFilms';
import localStore from './service/localstorage';
import onClickPlayer from './trailerplayer';
import { addToQueue, addToWatched } from './add-to-queue-or-watched';
import catchError from './service/catcherror';
import * as onTouch from './service/ontouch-scroll-check';

export function toggleModal() {
  const refs = {
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    playerClick: document.querySelector('.modal'),
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

  // window.removeEventListener('keydown', closeModalOnEsc);
  refs.modal.addEventListener('click', closeModalOnClickOutside);

  function closeModal() {
    refs.modal.classList.add('is-hidden');
    document.body.style.overflow = '';
    removeEventListenerKeydown();
  }
  //////// пагінація при закритті модалки

  function closeModalOnEsc(event) {
    if (event.code !== 'Escape') {
      return;
    }
    closeModal();
  }

  function closeModalOnClickOutside(event) {
    if (event.target === refs.modal) {
      closeModal();
    }
  }

  function removeEventListenerKeydown() {
    window.removeEventListener('keydown', closeModalOnEsc);
  }

 function onTouchMove(event) {
    if (onTouch.onTouchMove(event) === true) {
      onClickOpen();
    }
  }

  // вішаємо слухача для відкриття модалкі на компі, а також на мобільних пристраях
  refs.filmClick.addEventListener('click', onClickOpen);
  refs.filmClick.addEventListener('touchstart', onTouch.onTouchStart);
  refs.filmClick.addEventListener('touchmove', onTouchMove);

  refs.closeModal.addEventListener('click', closeModal);
  refs.playerClick.addEventListener('click', onClickPlayer);

  async function onClickOpen(e) {

    const teamRef = document.querySelector('.team-list');
    teamRef.innerHTML = '';
    // console.log(e.target.nodeName);
    if (
      e.target === e.currentTarget ||
      e.target.nodeName === `BUTTON` ||
      e.target.classList.contains(`trailer-player__svg`) ||
      e.target.classList.contains(`trailer-player-wrapper`) ||
      e.target.nodeName === `path` ||
      e.target.nodeName !== `IMG`
    ) {
      return;
    }
    // console.log(e.target.nodeName);
    // console.log('id', e.target.dataset.id);
    clearModalMovie(refs.filmInfo);
    try {
      let movieId = e.target.dataset.id;
      let movies = [];
      if  (
    document.querySelector('.nav__link--current').textContent === 'Home' ||
    document.querySelector('.nav__link--current').textContent === 'Головна'
){
        movies = apiService.getSavedFilms().results;
        } else {
          if (document.querySelector('.btn--active').dataset.add === 'watched') {
            movies = apiService.getWatchedFilms();
          } else {
            movies = apiService.getQueuedFilms();
          } 
      }
      //const movie = movies.results.find(({ id }) => id === Number(movieId));
      const movie = movies.find(({ id }) => id === Number(movieId));
      // console.log('movie by method find', movie);
      refs.filmInfo.innerHTML = await renderList(movie);

      // Кнопка PLAY з'являється після картинки
      showPlayBtnAfterImgLoad();

      // зміна стилю кнопок
      const queueBtn = document.querySelector('#queueInModal');
      const watchedBtn = document.querySelector('#watchedInModal');
      const queueLocalStorage = localStore.load('queue');
      const watchedLocalStorage = localStore.load('watched');

      if (queueLocalStorage) {
        for (const film of queueLocalStorage) {
          if (movie.id === film.id) {
            if (localStorage.getItem('language') === 'ua') {
              queueBtn.classList.add('button-list--active');
              queueBtn.textContent = 'Видалити з черги';
            } else {
              queueBtn.classList.add('button-list--active');
              queueBtn.textContent = 'Remove from queue';
            };
          };
        };
      };
      if (watchedLocalStorage) {
        for (const film of watchedLocalStorage) {
          if (movie.id === film.id) {
            if (localStorage.getItem('language') === 'ua') {
              watchedBtn.classList.add('button-list--active');
              watchedBtn.textContent = 'Видалити з переглянутого';
            } else {
              watchedBtn.classList.add('button-list--active');
              watchedBtn.textContent = 'Remove from watched';
            };
          };
        };
      };
      // зміна стилю кнопок
    } catch (error) {
      catchError(error, 'Something went wrong, kindly reload')
    }
    window.addEventListener('keydown', closeModalOnEsc);
    refs.modal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
    // renderList();
  
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
    const isLanguageUA = localStorage.getItem('language') === 'ua';
    const {
      poster_path,
      backdrop_path,
      title,
      original_title,
      genre_ids,
      release_date,
      id,
      popularity,
      vote_average,
      vote_count,
      overview,
    } = movie;

    if (poster_path !== null) {
      const date = new Date(release_date);
      const year = date.getFullYear();
      let genreList = genre_ids.map(genreId => {
        const genre = genres.find(g => g.id === genreId);
        return genre.name;
      });
      if (genre_ids.length === 0) {
        if (localStorage.getItem('language') === 'ua') {
          genreList.push('Інше');
        } else {
          genreList.push('Other');
        }
      }
      genreList = genreList.join(', ');
      if (localStorage.getItem('language') === 'ua') {
        return markupModalMovieUa({
          isLanguageUA,
          poster_path,
          backdrop_path,
          title,
          genreList,
          year,
          id,
          popularity,
          vote_average,
          vote_count,
          overview,
          original_title,
        });
      } else {
        return markupModalMovie({
          isLanguageUA,
          poster_path,
          backdrop_path,
          title,
          genreList,
          year,
          id,
          popularity,
          vote_average,
          vote_count,
          overview,
          original_title,
        });
      }
    }
  }

  function showPlayBtnAfterImgLoad() {
    const imgFilm = document.querySelector('.modal__image');
    const trailerPlayBtn = document.querySelector('[data-btn-modal]');

    if (imgFilm.complete) {
      trailerPlayBtn.classList.remove('visually-hidden');
    } else {
      imgFilm.addEventListener('load', () => {
        trailerPlayBtn.classList.remove('visually-hidden');
      });
    }
  }

  function clearModalMovie(ref) {
    ref.innerHTML = '';
  }
}

toggleModal();
