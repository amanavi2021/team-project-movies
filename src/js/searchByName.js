import markupTpl from '../templates/markupfilmmainpage.hbs';
import apiService from './apiService';
import renderFilms from './renderFilms';




const formRef = document.querySelector('.search-form');
const containerRef = document.querySelector('.gallery');
const BtnRef = document.querySelector('button');

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
    const movies = await apiService.fetchFilmByName();
   //  const trending = await apiService.fetchTrandingFilmDay();
   //  console.log('trending', trending);
    console.log('by the name', movies) 
    renderMoviesByName(movies);
    

} catch (error) {
 console.error (error)
}
}

function renderMoviesByName (movies) {
 if (movies.results.length === 0) {

    alert("We haven't found movies with that name");
    return;

 }

//  const films = apiService.fetchFilmByName();

 console.log('Last console', movies.results);
 containerRef.innerHTML = '';
 containerRef.insertAdjacentHTML('beforeend', renderMovies(movies.results));

}


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
 
