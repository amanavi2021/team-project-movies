import apiService from './apiService'
import renderFilms from './renderFilms';
import localStore from './service/localstorage'
import notifier from './service/notifier'
import refs from './service/refs';
import onClickPlayer from './trailerplayer';

export default async function onLoad() {

// очищаємо локал сторідж від інфо з попередніх сторінок
    localStore.remove('currentFilms');

    try {
// фечимо з API дані і записуємо поточну сторінку в локал сторідж
        await apiService.saveTrandingFilmDayToLocalStorage();
        const films = apiService.getSavedFilms();
// рендеремо поточну сторінку з даних локал сторіджа
        refs.filmsContainer.insertAdjacentHTML('beforeend', await renderFilms(films.results));
    } catch (error) {
            catchError(error);
    };
//  Вішаємо слухача і при click на кнопку, запускаємо Відео
    refs.filmsContainer.addEventListener('click', onClickPlayer);
 
function catchError(error) {
    notifier.error('Something went wrong...');
    console.error('Get onLoad error: ', error.message);
    };
};