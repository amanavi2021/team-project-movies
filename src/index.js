import apiService from './js/apiService';

saveGenres();


async function saveGenres() {
    
    if (!localStorage.getItem("genres")) {
        const fetchedGenres = await apiService.fetchGenres();
        const genres = fetchedGenres.genres;
        localStorage.setItem("genres", JSON.stringify(genres));
    }
}




