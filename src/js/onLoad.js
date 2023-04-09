import apiService from './apiservice'
import renderFilms from './renderFilms';
import localStore from './service/localstorage'

export default async function onLoad() {
    const refs = {
  filmsContainer: document.querySelector('.gallery'),
          
    };

    localStore.remove('trandingFilmDay') ;
    
    try {

        await apiService.saveTrandingFilmDayToLocalStorage();    
        const films = apiService.getTrandingFilmDay();
        console.log('films onload', films);
        refs.filmsContainer.insertAdjacentHTML('beforeend', await renderFilms(films.results));
    } catch (error) {
        console.error('Get state error: ', error.message);
    };
}

