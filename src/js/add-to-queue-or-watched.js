import renderFilms from './renderFilms';
import localstorage from './service/localstorage';
import { onGalleryReview, showBlankPage } from './service/blank-page';
import apiService from './apiService';

const modalContainer = document.querySelector('.modal');
const filmContainer = document.querySelector('.libary-gallery');
const queueInGallery = document.querySelector('[data-add="queue"]');
const watchedInGallery = document.querySelector('[data-add="watched"]');

modalContainer.addEventListener('click', onClickBtn);

let queueBtn = null;
let watchedBtn = null;

const queue = localstorage.load('queue') || [];
const watched = localstorage.load('watched') || [];

function onClickBtn(e) {
  const target = e.target;
  const id = target.closest('div').dataset.id;

  if (target.id === 'queueInModal') {
    getBtnRefs(target);
    return addToQueue(id);
  }
  if (target.id === 'watchedInModal') {
    getBtnRefs(target);
    return addToWatched(id);
  }
}

export function addToQueue(id) {
  // console.log(id);
  const filmsFromLocalStorage = localstorage.load('currentFilms');
  const indexFilm = queue.findIndex(film => film.id === Number(id));
  const findFilm = queue.find(film => film.id === Number(id));

  let results = {};

  for (const film of filmsFromLocalStorage.results) {
    if (film.id === Number(id)) {
      results = {
        genre_ids: film.genre_ids,
        release_date: film.release_date,
        poster_path: film.poster_path,
        backdrop_path: film.backdrop_path,
        title: film.title,
        popularity: film.popularity,
        vote_average: film.vote_average,
        vote_count: film.vote_count,
        overview: film.overview,
        id: film.id,
      };
    }
  }

  if (findFilm) {
    queue.splice(indexFilm, 1);
    localstorage.save('queue', queue);
    queueBtn.classList.remove('button-list--active');
    if (filmContainer && queueInGallery.classList.contains('btn--active')) {
      updateFilmContainer('queue');
    }
    if (localStorage.getItem('language') === 'ua') {
      queueBtn.textContent = 'Додати до черги';
    } else {
      queueBtn.textContent = 'Add to queue';
    }
  } else {
    queue.push(results);
    localstorage.save('queue', queue);
    if (filmContainer && queueInGallery.classList.contains('btn--active')) {
      updateFilmContainer('queue');
    }
    queueBtn.classList.add('button-list--active');
    if (localStorage.getItem('language') === 'ua') {
      queueBtn.textContent = 'Видалити з черги';
    } else {
      queueBtn.textContent = 'Remove from queue';
    }
  }
}

export function addToWatched(id) {
  let filmsFromLocalStorage = {};
  if (
    document.querySelector('.nav__link--current').textContent === 'Home' ||
    document.querySelector('.nav__link--current').textContent === 'Головна'
  ) {
    filmsFromLocalStorage = localstorage.load('currentFilms').results;
  } else {
    if (document.querySelector('.btn--active').dataset.add === 'watched') {
      filmsFromLocalStorage = apiService.getWatchedFilms();
    } else {
      filmsFromLocalStorage = apiService.getQueuedFilms();
    }
  }

  const indexFilm = watched.findIndex(film => film.id === Number(id));
  const findFilm = watched.find(film => film.id === Number(id));

  let results = {};

  for (const film of filmsFromLocalStorage) {
    if (film.id === Number(id)) {
      results = {
        genre_ids: film.genre_ids,
        release_date: film.release_date,
        poster_path: film.poster_path,
        backdrop_path: film.backdrop_path,
        title: film.title,
        popularity: film.popularity,
        vote_average: film.vote_average,
        vote_count: film.vote_count,
        overview: film.overview,
        id: film.id,
      };
    }
  }

  if (findFilm) {
    watched.splice(indexFilm, 1);
    localstorage.save('watched', watched);
    watchedBtn.classList.remove('button-list--active');
    if (filmContainer && watchedInGallery.classList.contains('btn--active')) {
      updateFilmContainer('watched');
    }
    if (localStorage.getItem('language') === 'ua') {
      watchedBtn.textContent = 'Додати до переглянутого';
    } else {
      watchedBtn.textContent = 'Add to watched';
    }
  } else {
    watched.push(results);
    localstorage.save('watched', watched);
    watchedBtn.classList.add('button-list--active');
    if (filmContainer && watchedInGallery.classList.contains('btn--active')) {
      updateFilmContainer('watched');
    }
    if (localStorage.getItem('language') === 'ua') {
      watchedBtn.textContent = 'Видалити з переглянутого';
    } else {
      watchedBtn.textContent = 'Remove from watched';
    }
  }
}

function getBtnRefs(target) {
  if (target.id === 'queueInModal') {
    queueBtn = target;
    return;
  }
  if (target.id === 'watchedInModal') {
    watchedBtn = target;
    return;
  }
}

async function updateFilmContainer(key) {
  try {
    const parsedFilms = localstorage.load(`${key}`);
    const markup = await renderFilms(parsedFilms).then(result => result);
    filmContainer.innerHTML = markup;
    //виводить картинку
    showBlankPage(markup);
    //
  } catch (error) {
    console.error(error);
  }
}
