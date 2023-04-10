import markupTpl from '../templates/markupFilmMainPage.hbs';
import apiService from './apiService';
import renderFilms from './renderFilms';
import onClickPlayer from './trailerplayer';



const formRef = document.querySelector('#search-form');
const containerRef = document.querySelector('.gallery');
const BtnRef = document.querySelector('.search__button');

formRef.addEventListener('submit', onClick);

async function onClick (e) {
 e.preventDefault();

 apiService.query = e.currentTarget.elements.searchQuery.value.trim();
 console.log(apiService.query)

 if(e.target.elements.searchQuery.value.trim() === "") {
    return
  }

apiService.resetPage();

try {
   await apiService.saveFindingFilmsToLocalStorage();
   const movies = apiService.getSavedFilms();
    // const movies = await apiService.fetchFilmByName();
   //  const trending = await apiService.fetchTrandingFilmDay();
   //  console.log('trending', trending);
    console.log('by the name', movies) 
    await renderMoviesByName(movies);

} catch (error) {
 console.error (error)
  }
  
  //  Вішаємо слухача на кнопку на картці і при натиску, запускаємо Відео
  const trailerPlayBTNs = document.querySelectorAll('.trailer-player-btn');
  trailerPlayBTNs.forEach((button) => button.addEventListener('click', onClickPlayer));
  
formRef.reset();
}

async function renderMoviesByName (movies) {
 if (movies.results.length === 0) {

    alert("We haven't found movies with that name");
    return;

 }

//  const films = apiService.fetchFilmByName();

 console.log('Last console', movies.results);
 containerRef.innerHTML = '';
 containerRef.insertAdjacentHTML('beforeend', await renderFilms(movies.results));

}

// А навіщо ідентична функція, коли я робила вже renderFilms ? вона просто асинхронна ..
function renderMovies(movies) {

   
   const genres = JSON.parse(localStorage.getItem('genres'));
  
   return movies.map(({ poster_path, title, genre_ids, release_date }) => {
     const date = new Date(release_date);
     const year = date.getFullYear();
        
     let genreList = genre_ids.map((genreId) => {
         const genre = genres.find((g) => g.id === genreId);
         return genre.name;
     });
 
     if (genreList.length > 2) {
       genreList = genreList.slice(0, 2);
       genreList.push('Other');
     };
 
     genreList = genreList.join(', ');
 
     return markupTpl({ poster_path, title, genreList, year });
   }).join('');
 };
 
