import onClickPlayer from './js/trailerplayer';
import apiService from './js/apiService';
import {mask} from './js/loader';
import * as teamModal from './js/team-members';
import toggleModal from './js/modal';
import { paginationLocalStorage } from './js/paginationIn-library';
import localstorage from './js/service/localstorage';
import renderFilms from './js/renderFilms';
import theme from './js/theme';
import searchByName from './js/searchByName';
import languageApi from './js/language-changer';
import refs from './js/service/refs';

// виводить картинку якщо переглянутих немає
console.log(refs.filmsContainer);
if (localstorage.load('watched')===[] || localstorage.load('watched')===undefined)
{ refs.filmsContainer.classList.add('gallery-blank');
console.log(refs.filmsContainer);
 }
else {
    refs.filmsContainer.classList.remove('gallery-blank'); 
}

paginationLocalStorage('watched');
const filmContainer = document.querySelector('.my-gallery');
//  Вішаємо слухача і при click, запускаємо Відео
filmContainer.addEventListener('click', onClickPlayer);

const buttons = document.querySelector('.header__buttons-library');
const btnQueue = document.querySelector('[data-add="queue"]');
const btnWatched = document.querySelector('[data-add="watched"]');

buttons.addEventListener('click', onClickBtnLibrary);

function onClickBtnLibrary(e) {
    const target = e.target;
    if (target === btnQueue) {
        if (!localstorage.load('queue')) {
            onClassActiveToggle(target);
            return;
        } else {
            paginationLocalStorage('queue');
            onClassActiveToggle(target);
            return;
        };
    };

    if (target === btnWatched) {
        if (!localstorage.load('watched')) {
            onClassActiveToggle(target);
            return;
        } else {
            paginationLocalStorage('watched');
            onClassActiveToggle(target);
            return;
        };
    };
};

function onClassActiveToggle(target) {
    if (target === btnQueue) {
        btnWatched.classList.remove('btn--active');
        btnQueue.classList.add('btn--active');
    } else {
        btnWatched.classList.add('btn--active');
        btnQueue.classList.remove('btn--active');
    };
};

