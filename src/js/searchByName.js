import markupTpl from '../templates/markupFilmMainPage.hbs';
import apiService from './apiService';
import { paginationLocalStorage } from './paginationIn-library';
import { paginationSearch } from './pagination-search';
import renderFilms from './renderFilms';
import onClickPlayer from './trailerplayer';
import refs from './service/refs';
import { clearPagination } from './pagination-functions';



const formRef = document.querySelector('#search-form');
const containerRef = document.querySelector('.gallery');
const BtnRef = document.querySelector('.search__button');
const paginationDigits = document.querySelector('.pagination__box');

formRef.addEventListener('submit', onClick);

async function onClick (e) {
 e.preventDefault();

 apiService.query = e.currentTarget.elements.searchQuery.value.trim();
  console.log(apiService.query)
  const searchQueryName = e.currentTarget.elements.searchQuery.value.trim();

 if(e.target.elements.searchQuery.value.trim() === "") {
    return
  }

apiService.resetPage();

try {
   await apiService.saveFindingFilmsToLocalStorage();
   const movies = apiService.getSavedFilms();
  console.log(movies);


  

    // const movies = await apiService.fetchFilmByName();
   //  const trending = await apiService.fetchTrandingFilmDay();
   //  console.log('trending', trending);
  
 paginationSearch(searchQueryName) 
  
  

  

} catch (error) {
 console.error (error)
  }
  
  //  Вішаємо слухача і при click на кнопку, запускаємо Відео
  refs.filmsContainer.addEventListener('click', onClickPlayer);
  
// formRef.reset();
}


async function renderMoviesByName (movies) {
  if (movies.results.length === 0) {
     
     // alert("We haven't found movies with that name"); - в Api Service є після перевірки
     return;
 
 
 // А навіщо ідентична функція, коли я робила вже renderFilms ? вона просто ас
  }
 }