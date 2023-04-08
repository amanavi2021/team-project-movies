import apiService from './js/apiService';
import renderFilms from './js/renderFilms'; 
import {mask} from './js/loader';
import { toggleModal } from './js/modal';

toggleModal();
saveGenres();
onLoad();

async function saveGenres() {
  if (!localStorage.getItem('genres')) {
    const fetchedGenres = await apiService.fetchGenres();
    const genres = fetchedGenres.genres;
    localStorage.setItem('genres', JSON.stringify(genres));
  }
}

// !!!!!!!!!! тест рендеру карток з фільмами 

const refs = {
  filmsContainer: document.querySelector('.gallery'),
          
};

async function onLoad() {
      
    try {
        const films = await apiService.fetchTrandingFilmDay(); 
        appendFilmMarkUp(films);
    } catch (error) {
        console.error(error);
    };

}

async function appendFilmMarkUp(films) {
    refs.filmsContainer.insertAdjacentHTML('beforeend', await renderFilms(films.results));
}
// !!!!!!!!!! тест рендеру карток з фільмами 

