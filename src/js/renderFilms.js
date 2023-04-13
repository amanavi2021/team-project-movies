
import markupTpl from '../templates/markupFilmMainPage.hbs';
import apiService from './apiService';
import localStore from './service/localstorage'


export default async function renderFilms(films) {

  await apiService.saveGenresToLocalStorage();
  const genres = localStore.load('genres') || [] ;
 
  return films.map(({ poster_path, backdrop_path, title, genre_ids, release_date, id, popularity, vote_average, vote_count, overview
  }) => {
    if (poster_path !== null) {
      const date = new Date(release_date);
      const year = date.getFullYear();
       
      let genreList = genre_ids.map((genreId) => {
          const genre = genres.find((g) => g.id === genreId);
          return genre.name;
        });

    if (genreList.length > 2 || genre_ids.length === 0) {
      genreList = genreList.slice(0, 2);
      genreList.push('Other');
    };

    genreList = genreList.join(', ');
    return markupTpl({ poster_path, backdrop_path, title, genreList, year, id, popularity, vote_average, vote_count, overview
    });
  }
}).join('');
  
};

