import markupTpl from '../templates/markupFilmMainPage.hbs';
import apiService from './apiService'


export default async function renderFilms(films) {
  const genresResponse = await apiService.fetchGenres();
  const genres = genresResponse.genres;

  return films.map(({ poster_path, title, genre_ids, release_date }) => {
    const date = new Date(release_date);
    const year = date.getFullYear();
       
    let genreList = genre_ids.map((genreId) => {
        const genre = genres.find((g) => g.id === genreId);
        return genre.name;
    });

    if (genreList.length > 2) {
      genreList = genreList.slice(0, 2);
      genreList.push('Other');
    }
    genreList = genreList.join(', ');

    return markupTpl({ poster_path, title, genreList, year });
  }).join('');
};