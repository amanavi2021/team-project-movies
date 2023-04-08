import apiService from './js/apiService';
import {mask} from './js/loader';

saveGenres();


async function saveGenres() {
    
    if (!localStorage.getItem("genres")) {
        const fetchedGenres = await apiService.fetchGenres();
        const genres = fetchedGenres.genres;
        localStorage.setItem("genres", JSON.stringify(genres));
    }
}




