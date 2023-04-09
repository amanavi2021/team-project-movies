import apiService from './js/apiService';
import onLoad from './js/onLoad' 
import {mask} from './js/loader';
import { toggleModal } from './js/modal';
import { paginationFeach } from './js/pagination';

toggleModal();
saveGenres();
paginationFeach();

async function saveGenres() {
  if (!localStorage.getItem('genres')) {
    const fetchedGenres = await apiService.fetchGenres();
    const genres = fetchedGenres.genres;
    localStorage.setItem('genres', JSON.stringify(genres));
  }
}



