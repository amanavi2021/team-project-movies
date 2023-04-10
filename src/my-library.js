
import apiService from './js/apiService';
import {mask} from './js/loader';
import * as teamModal from './js/team-members';
// import toggleModal from './js/modal';
//import { paginationLocalStorage } from './js/pagination-library';
import localstorage from './js/service/localstorage';
import renderFilms from './js/renderFilms';

onLoadCurrentFilms()
const filmContainer = document.querySelector('.my-gallery');

const buttons = document.querySelector('.header__buttons-library');
buttons.addEventListener('click', onClickBtnLibrary);


const btnQueue = document.querySelector('[data-add="queue"]');
const btnWatched = document.querySelector('[data-add="watched"]');

function onClickBtnLibrary(e) {

    if (e.target === btnQueue) {
        const parsedFilmsFromQueueLocalStorage = localstorage.load('queue');
        btnWatched.classList.remove('btn--active');
        btnQueue.classList.add('btn--active');
        return appendFromLocalStorage(parsedFilmsFromQueueLocalStorage);
    }
    if (e.target === btnWatched) {
        const parsedFilmsFromWatchedLocalStorage = localstorage.load('watched');
        btnWatched.classList.add('btn--active');
        btnQueue.classList.remove('btn--active');
        return appendFromLocalStorage(parsedFilmsFromWatchedLocalStorage);
    };
};

async function appendFromLocalStorage(parsedFilms) {
    const markup = await renderFilms(parsedFilms).then(result => { return result });
        filmContainer.innerHTML = markup;
};

async function onLoadCurrentFilms() {
    return await appendFromLocalStorage(localstorage.load('watched'))
}



