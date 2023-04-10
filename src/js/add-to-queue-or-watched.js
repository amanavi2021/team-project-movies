import localstorage from "./service/localstorage";

const filmContainer = document.querySelector('.modal');
filmContainer.addEventListener('click', onClickBtn) 

const queue = localstorage.load('queue') || [];
const watched = localstorage.load('watched') || [];

function onClickBtn(e) {
    const id = e.target.closest('div').dataset.id

    if (e.target.id === 'queueInModal') {
        return addToQueue(id);
    }
    if (e.target.id === 'watchedInModal') {
        return addToWatched(id);
    }
}

function addToQueue(id) {
    // console.log(id);
    const filmsFromLocalStorage = localstorage.load('currentFilms');
    const indexFilm = queue.findIndex(film => film.id === Number(id));
    const findFilm = queue.find(film => film.id === Number(id));

    let results = {};

    for (const film of filmsFromLocalStorage.results) {
        if (film.id === Number(id)) {
            results = {
                // genres: film.genres,
                genre_ids: film.genre_ids,
                release_date: film.release_date,
                poster_path: film.poster_path,
                title: film.title,
                id: film.id,
            }
        }
    }
    
    if (findFilm) {
        queue.splice(indexFilm, 1);
        localstorage.save('queue', queue);
    } else {
        queue.push(results);
        localstorage.save('queue', queue);
    }
}

function addToWatched(id) {
    // console.log(id);
    const filmsFromLocalStorage = localstorage.load('currentFilms');
    const indexFilm = queue.findIndex(film => film.id === Number(id));
    const findFilm = queue.find(film => film.id === Number(id));

    let results = {};

    for (const film of filmsFromLocalStorage.results) {
        if (film.id === Number(id)) {
            results = {
                // genres: film.genres,
                genre_ids: film.genre_ids,
                release_date: film.release_date,
                poster_path: film.poster_path,
                title: film.title,
                id: film.id,
            }
        }
    }
    
    if (findFilm) {
        watched.splice(indexFilm, 1);
        localstorage.save('watched', watched);
    } else {
        watched.push(results);
        localstorage.save('watched', watched);
    }
}
