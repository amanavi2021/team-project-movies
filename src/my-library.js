
import apiService from './js/apiService';
import {mask} from './js/loader';
import * as teamModal from './js/team-members';
// import toggleModal from './js/modal';
//import { paginationLocalStorage } from './js/pagination-library';
import localstorage from './js/service/localstorage';
import renderFilms from './js/renderFilms';

onLoadCurrentFilms();
const filmContainer = document.querySelector('.my-gallery');

const buttons = document.querySelector('.header__buttons-library');
buttons.addEventListener('click', onClickBtnLibrary);

const btnQueue = document.querySelector('[data-add="queue"]');
const btnWatched = document.querySelector('[data-add="watched"]');

function onClickBtnLibrary(e) {
    const target = e.target;
    if (target === btnQueue) {
        if (!localstorage.load('queue')) {
            onClassActiveToggle(target);
            return;
        } else {
            const parsedFilmsFromQueueLocalStorage = localstorage.load('queue');
            onClassActiveToggle(target);

            appendFromLocalStorage(parsedFilmsFromQueueLocalStorage);
            return;
        };
    };

    if (target === btnWatched) {
        if (!localstorage.load('watched')) {
            onClassActiveToggle(target);
            return;
        } else {
            const parsedFilmsFromWatchedLocalStorage = localstorage.load('watched');
            appendFromLocalStorage(parsedFilmsFromWatchedLocalStorage);
            onClassActiveToggle(target);
            return;
        };
    };
};

async function appendFromLocalStorage(parsedFilms) {
    try {
        const markup = await renderFilms(parsedFilms).then(result => result);
        filmContainer.innerHTML = markup;
    } catch (error) {
        console.error(error);
    };
};

function onLoadCurrentFilms() {
    if (!localstorage.load('watched')) {
        return;
    }
    appendFromLocalStorage(localstorage.load('watched'));
}

function onClassActiveToggle(target) {
    if (target === btnQueue) {
        btnWatched.classList.remove('btn--active');
        btnQueue.classList.add('btn--active');
    } else {
        btnWatched.classList.add('btn--active');
        btnQueue.classList.remove('btn--active');
    };
};

