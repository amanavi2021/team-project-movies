import apiService from './apiService'
import renderFilms from './renderFilms';
import localStore from './service/localstorage'
import notifier from './service/notifier'
import refs from './service/refs';

export default async function onLoad() {
   
    localStore.remove('trandingFilmDay') ;
    
    try {

        await apiService.saveTrandingFilmDayToLocalStorage();
        const films = apiService.getTrandingFilmDay();
        console.log('films onload', films);
        refs.filmsContainer.insertAdjacentHTML('beforeend', await renderFilms(films.results));
    } catch { catchError };
};

function catchError(error) {
    notifier.error('Something went wrong...');
    console.error('Get onLoad error: ', error.message);
};