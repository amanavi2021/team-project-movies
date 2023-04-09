import apiService from './apiservice'
import renderFilms from './renderfilms';

export default async function onLoad() {
    const refs = {
  filmsContainer: document.querySelector('.gallery'),
          
    };

    localStorage.removeItem('trandingFilmDay') ;
    
    try {

        await apiService.saveTrandingFilmDayToLocalStorage();    
        const films = apiService.getTrandingFilmDay();
        refs.filmsContainer.insertAdjacentHTML('beforeend', await renderFilms(films.results));
    } catch (error) {
        console.error(error);
    };
}

