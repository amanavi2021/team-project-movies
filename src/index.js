import apiService from './js/apiService';

async function fetchFilms() {
    const films = await apiService.fetchTrandingFilmDay();
    console.log(films);
}

fetchFilms();