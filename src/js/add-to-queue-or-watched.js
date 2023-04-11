import localstorage from "./service/localstorage";

const filmContainer = document.querySelector('.modal');

filmContainer.addEventListener('click', onClickBtn) 

const queue = localstorage.load('queue') || [];
const watched = localstorage.load('watched') || [];

function onClickBtn(e) {
    const target = e.target;
    const id = target.closest('div').dataset.id;

    if (target.id === 'queueInModal') {
        onClassActiveToggle(target);
        return addToQueue(id);
    };
    if (target.id === 'watchedInModal') {
        onClassActiveToggle(target);
        return addToWatched(id);
    };
};

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
            };
        };
    };
    
    if (findFilm) {
        queue.splice(indexFilm, 1);
        localstorage.save('queue', queue);
        return;
    } else {
        queue.push(results);
        localstorage.save('queue', queue);


        return;
    };
};

function addToWatched(id) {
    const filmsFromLocalStorage = localstorage.load('currentFilms');
    const indexFilm = watched.findIndex(film => film.id === Number(id));
    const findFilm = watched.find(film => film.id === Number(id));

    let results = {};

    for (const film of filmsFromLocalStorage.results) {
        if (film.id === Number(id)) {
            results = {
                genre_ids: film.genre_ids,
                release_date: film.release_date,
                poster_path: film.poster_path,
                backdrop_path: film.backdrop_path,
                title: film.title,
                popularity: film.popularity,
                vote_average: film.vote_average,
                vote_count: film.vote_count,
                overview: film.overview,
                id: film.id,
            };
        };
    };
    
    if (findFilm) {
        watched.splice(indexFilm, 1);
        localstorage.save('watched', watched);
    } else {
        watched.push(results);
        localstorage.save('watched', watched);
    };
};

function onClassActiveToggle(target) {
    const queueBtn = document.querySelector('#queueInModal');
    const watchedBtn = document.querySelector('#watchedInModal');

    if (target.id === 'queueInModal') {
        queueBtn.classList.add('button-list--active');
        watchedBtn.classList.remove('button-list--active');
    } else {
        watchedBtn.classList.add('button-list--active');
        queueBtn.classList.remove('button-list--active');
    };
};


