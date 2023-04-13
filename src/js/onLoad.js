import apiService from './apiService'
import renderFilms from './renderFilms';
import localStore from './service/localstorage'
import refs from './service/refs';
import onClickPlayer from './trailerplayer';
import showPlayBtnAfterImgLoad from './service/play-btn-delay'
import catchError from './service/catcherror';

export default async function onLoad() {

// очищаємо локал сторідж від інфо з попередніх сторінок
    localStore.remove('currentFilms');

    try {
// фечимо з API дані і записуємо поточну сторінку в локал сторідж
        await apiService.saveTrandingFilmDayToLocalStorage();
        const films = apiService.getSavedFilms();
// рендеремо поточну сторінку з даних локал сторіджа
        refs.filmsContainer.insertAdjacentHTML('beforeend', await renderFilms(films.results));
// Кнопка PLAY з'являється після картинки
        showPlayBtnAfterImgLoad();
    } catch (error) {
            catchError(error, 'Something went wrong...');
    };


//  Вішаємо слухача і при click на кнопку, запускаємо Відео
        refs.filmsContainer.addEventListener('click', onClickPlayer);
        refs.filmsContainer.addEventListener('touchstart', onClickPlayer);
        
};