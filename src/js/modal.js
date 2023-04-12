import markupModalMovie from '../templates/markup-modal-movie.hbs';
import apiService from './apiService';
import renderFilms from './renderFilms';
import localStore from './service/localstorage';
import onClickPlayer from './trailerplayer';

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

  refs.filmClick.addEventListener('click', onClickOpen);
  refs.closeModal.addEventListener('click', closeModal);
  refs.playerClick.addEventListener('click', onClickPlayer);

  async function onClickOpen(e) {
    if (
      e.target === e.currentTarget ||
      e.target.nodeName === `BUTTON` ||
      e.target.classList.contains(`trailer-player__svg`) ||
      e.target.classList.contains(`trailer-player-wrapper`) ||
      e.target.nodeName === `path`
    ) {
      return;
    }
    console.log(e.target.nodeName);
    // console.log('id', e.target.dataset.id);

    try {
      let movieId = e.target.dataset.id;
     //тест
     console.log('document', document.querySelector('.nav__link--current').textContent);
     console.log('document', document.querySelector('.nav__link--current').textContent === 'Home');
     console.log('document', document.querySelector('.btn--active').dataset.add);
     //тест
     let movies =[];
      if (document.querySelector('.nav__link--current').textContent ==='Home') {
        movies = apiService.getSavedFilms().results;
      } else {
        movies = apiService.getWatchedFilms();
      }
      // const movies = apiService.getSavedFilms();
      
      //        let movieId = e.target.dataset.id;
      //        const movies = apiService.getSavedFilms();

      //  console.log('movies', movies);

      //const movie = movies.results.find(({id}) => id === Number(movieId));
      //  console.log('movie by method find', movie)
      //  refs.filmInfo.insertAdjacentHTML('beforeend', renderList(movie)) ;
      //refs.filmInfo.innerHTML = await renderList(movie);

      //const movie = movies.results.find(({ id }) => id === Number(movieId));
      const movie = movies.find(({ id }) => id === Number(movieId));
      console.log('movie by method find', movie);
      //  refs.filmInfo.insertAdjacentHTML('beforeend', renderList(movie)) ;
      refs.filmInfo.innerHTML = await renderList(movie);


// зміна стилю кнопок(РЕФАКТОРИТИ БУДЕ РУСЛАН!!!)
// КОД ІНШІ ЧАСТИНИ СКРИПТУ НЕ ЗМІНЮЄ І НЕ ЧІПАЄ(крім використанні id)
      const queueBtn = document.querySelector('#queueInModal');
      const watchedBtn = document.querySelector('#watchedInModal');
      const queueLocalStorage = localStore.load('queue');
      const watchedLocalStorage = localStore.load('watched');

      if (queueLocalStorage) {
        for (const film of queueLocalStorage) {
          if (movie.id === film.id) {
            queueBtn.classList.add('button-list--active');
            queueBtn.textContent = 'Added to queue';
        }
      }
      }
      if (watchedLocalStorage) {
        for (const film of watchedLocalStorage) {
          if (movie.id === film.id) {
            watchedBtn.classList.add('button-list--active');
            watchedBtn.textContent = 'Added to queue';
        }
        }
      }
// зміна стилю кнопок


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

    const {
      poster_path,
      backdrop_path,
      title,
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
        genreList.push('Other');
      }
      genreList = genreList.join(', ');
      return markupModalMovie({
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
      });
    }
  }

  function clearModalMovie(ref) {
    ref.innerHTML = '';
  }
}

toggleModal();
