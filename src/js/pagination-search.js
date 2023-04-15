import * as paginationFunctions from './pagination-functions';
import onLoad from './onLoad';
import apiService from './apiService';
import localstorage from './service/localstorage';
import renderFilms from './renderFilms';
import showPlayBtnAfterImgLoad from './service/play-btn-delay';
import localStore from './service/localstorage';

const NUMBER_PAGINATION = 5;
const cardContainerEl = document.querySelector('.gallery');
const paginationEl = document.querySelector('.pagination__box');
const paginationContainerEl = document.querySelector('.pagination__container');
const formRef = document.querySelector('#search-form');

function getFilmsForFirstPageFromStoradge() {
    const savedFilms = localStorage.getItem('currentFilms') || {};   // дістаємо фільми зі сховища

    try {
        const parsedSavedFilms = JSON.parse(savedFilms);    // парс результату зі сховища
        let pageNumber = 0;
        let firstPageFilms = [];

        const { total_results, total_pages, results } = parsedSavedFilms; // деструктуризуємо заг к-сть фільмів, заг к-сть сторінок, масив фільмів

        if (total_results !== 0) {             // якщо заг к-сть фільмів не 0 то записуємо значення в змінні
            pageNumber = total_pages;
            firstPageFilms = results;
        }

        return { pageNumber, firstPageFilms, total_results } ;  // повертаємо з функції заг к-сть фільмів, заг к-сть сторінок, масив фільмів
    } catch {
        console.log('nothing');
    }
}


export async function paginationSearch(currentSearchWord) {
    formRef.addEventListener('submit', () => {                                // слухаємо сабміт форми пошуку
        paginationEl.removeEventListener('click', onPageClick);               // знімаємо слухачів з пагінації головної сторінки 
        paginationContainerEl.removeEventListener('click', onBigPaginatinClick);
    });

    const localStorageData = getFilmsForFirstPageFromStoradge();        // викликаємо функцію для першої сторінки з даними зі сховища
    const { pageNumber, firstPageFilms, total_results } = localStorageData;

    if (total_results === 0) {                  // якщо пошук не дав результатів
        cardContainerEl.innerHTML = '';
        paginationFunctions.clearPagination(paginationEl); 

        return;
    }

    appendFromLocalStorage(firstPageFilms);   // рендер карток фільмів першої сторінки

    paginationFunctions.clearPagination(paginationEl);  // очищуємо контейнери пагінації

    if (pageNumber <= NUMBER_PAGINATION + 2 && pageNumber >= 1) {       // якщо к-сть сторінок більша 7
        paginationFunctions.displayPaginationSmall(pageNumber, paginationEl);             // рендер пагінації без крапок і стрілок
        document.querySelector('.js-page-1').classList.add('pagination__item--select');  // активна сторінка

        paginationEl.addEventListener('click', onPageClick);   // слухаємо сторінки пагінації 
        
        return;
    }

    async function onPageClick(e) {          // колбек, що робить запити за вибраною сторінкою малої пагінації
        if (!e.target.classList.contains('pagination__item')) {   // перевіряємо чи клікаємо на сторінки пагінації
            return;  
        }
        
        const currentPage = Number(e.target.textContent);    // визначаємо номер поточної сторінки    
       
        paginationFunctions.clearPagination(paginationEl);
        
        onBigPaginationBtnClickrRenderFilms(currentPage, currentSearchWord);  // рендер карток фільмів, отриманих з фетчу
        
        paginationFunctions.displayPaginationSmall(pageNumber, paginationEl);          // рендер малої пагінації
        document.querySelector(`.js-page-${currentPage}`)?.classList.add('pagination__item--select');    // робимо вибрану сторінку активною
        
         if (pageNumber === 1) {      // якщо к-сть сторінок 1 то очищуємо пагінацію
            paginationFunctions.clearPagination(paginationEl);
        }
    }       
          ////////// якщо кількість сторінок більша 7 (пагінація велика: стрілки та крапки)

    paginationEl.innerHTML = '';
    paginationFunctions.clearPagination(paginationEl);

    paginationFunctions.displayPaginationBig(pageNumber, paginationContainerEl, paginationEl);   // рендер великої пагінації на 1 сторінку
    document.querySelector('.js-page-1').classList.add('pagination__item--select'); // активна 1 сторінка

    const btnLeft = document.querySelector('.pagination__btnLeft');  // ліва стрілка
    const btnRight = document.querySelector('.pagination__btnRight'); // права стрілка

    btnLeft.disabled = true;   // ліва стрілка неактивна, бо ми на ст 1

    paginationContainerEl.addEventListener('click', onBigPaginatinClick); // слухаємо сторінки та стрілки пагінації

    function onBigPaginatinClick (e) {
        e.preventDefault();

        if (!e.target.classList.contains('pagination__item') && !e.target.classList.contains('pagination__btnLeft') && !e.target.classList.contains('pagination__btnRight') ) {
            return;   // перевіряємо умову, що клікнули на цифру або стрілку
        };

       
        if (e.target.classList.contains('pagination__item')) {   // якщо вибрали цифру
             const currentPage = Number(e.target.textContent);    // поточна сторінка 
        
            onBigPaginationBtnClickrRenderFilms(currentPage, currentSearchWord);  // рендер карток фільмів
            onBigPaginationBtnClickrRenderPagination(pageNumber, currentPage);    // рендер великої пагінації

            paginationFunctions.activityArrows(currentPage, pageNumber); //якщо вибрана 1 або остання сторінка, то робимо неактивними відповідні стрілки
        }

        if (e.target.classList.contains('pagination__btnLeft')) {  //якщо клікнули на ліву стрілку
                
            const activePage = document.querySelector('.pagination__item--select');   // запамятовуємо активну сторінку при кліці
            const activePageNumber = Number(activePage.textContent);
            const previousPage = activePageNumber - 1;   // отримуємо попередню сторінку (бо ліва стрілка клікнута), за якою буде пошук та рендер

            onBigPaginationBtnClickrRenderFilms(previousPage, currentSearchWord);  // рендер карток фільмів за пошуковим словом та сторінкою
            onBigPaginationBtnClickrRenderPagination(pageNumber, previousPage);  // рендер великої пагінації

            paginationFunctions.activityOfLeftArrow(1);  // якщо буде рендер по 1, то робимо ліву стрілку неактивною
            
            }

        if (e.target.classList.contains('pagination__btnRight')) { // все те ж саме з правою стрілкою
              
            const activePage = document.querySelector('.pagination__item--select');
            const activePageNumber = Number(activePage.textContent);
            const nextPage = activePageNumber + 1;

            onBigPaginationBtnClickrRenderFilms(nextPage, currentSearchWord);
            onBigPaginationBtnClickrRenderPagination(pageNumber, nextPage);    
            
            paginationFunctions.activityOfRightArrow(total_pages);
        }
       
    }
}

function onBigPaginationBtnClickrRenderPagination(pageNumber, currentPage) { // функція визначає, яку з трьох видів пагінації рендерити з огляду на вибрану сторінку
    paginationFunctions.clearPagination(paginationEl);

    const n = NUMBER_PAGINATION - (Math.ceil(NUMBER_PAGINATION / 3) - 2); // до 5 сторінок
    const m = pageNumber - (NUMBER_PAGINATION - 1); // якщо сторінка більша за заг к-сть сторіноу - 4


    if (currentPage < n) {
        paginationFunctions.displayPaginationBig(pageNumber, paginationContainerEl, paginationEl);  // рендер пагінації з крапками біля заг к-сті сторінок
    } else if (currentPage >= n && currentPage <= m) {
        paginationFunctions.displayPaginationBigMiddle(pageNumber, currentPage, paginationContainerEl, paginationEl); // рендер пагінації з 5 цифр посередині і крапками по боках
    } else {
        paginationFunctions.displayPaginationBigFinish(pageNumber, paginationContainerEl, paginationEl); // рендер пагінації з крапками біля першої сторінки
    }

    document.querySelector(`.js-page-${currentPage}`).classList.add('pagination__item--select'); // робимо активною вибрану сторінку
}

async function onBigPaginationBtnClickrRenderFilms(currentPage, currentSearchWord) {
    cardContainerEl.innerHTML = '';
    apiService.pageNumber = currentPage;  // записуємо в властивість класу фетчу поточну сторінку
    apiService.query = currentSearchWord;   // записуємо в властивість класу Фетчу ключ пошуку
    
    try {  
        const movies = await apiService.fetchFilmByName();  // чекаємо результатів пошуку
        // Якщо ЗНАЙДЕНО, записуємо в localStoridge 
        localStore.save('currentFilms', movies);
        
        appendFromLocalStorage(movies.results);   // рендер карток фільмів, отриманих з фетчу
    }
    catch {
        console.error(error);
    }
}

async function appendFromLocalStorage(parsedFilms) {
    try {
        const markup = await renderFilms(parsedFilms).then(result => result); 
        cardContainerEl.innerHTML = markup;
        showPlayBtnAfterImgLoad(); // Кнопка PLAY з'являється після картинки
    } catch (error) {
        console.error(error);
    };
};