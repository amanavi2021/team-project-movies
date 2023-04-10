import apiService from './apiService'
import renderFilms from './renderFilms';
import localStore from './service/localstorage'
import notifier from './service/notifier'
import refs from './service/refs';
import onClickPlayer from './trailerplayer';

export default async function onLoad() {

    localStore.remove('currentFilms');

    try {

        await apiService.saveTrandingFilmDayToLocalStorage();
        const films = apiService.getSavedFilms();
        // console.log('films onload', films);
        refs.filmsContainer.insertAdjacentHTML('beforeend', await renderFilms(films.results));
    } catch (error) {
            catchError(error);
    };
    //  Вішаємо слухача на кнопку на картці і при натиску, запускаємо Відео
    const trailerPlayBTNs = document.querySelectorAll('.trailer-player-btn');
    trailerPlayBTNs.forEach((button) => button.addEventListener('click', onClickPlayer));


function catchError(error) {
    notifier.error('Something went wrong...');
    console.error('Get onLoad error: ', error.message);
    };
};