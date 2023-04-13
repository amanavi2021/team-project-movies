import * as paginationFunctions from './pagination-functions';
import renderFilms from './renderFilms';
import showPlayBtnAfterImgLoad from './service/play-btn-delay'

const NUMBER_PAGINATION = 5;
const NUMBER_PER_PAGE = 20;
const cardContainerEl = document.querySelector('.gallery');
const paginationEl = document.querySelector('.pagination__box');
const paginationContainerEl = document.querySelector('.pagination__container');



export function paginationLocalStorage(placeKey) {

    if (placeKey === 'watched') {
        document.querySelector('button[data-add="queque"]')?.addEventListener('click', onRemoveListeners);
    }

        // add gor queueSearch and watchedSearch

    if (placeKey === 'queue') {
        document.querySelector('button[data-add="watched"]')?.addEventListener('click', onRemoveListeners);
    }


    function onRemoveListeners () {
            paginationEl.removeEventListener('click', onDigitPaginationClick);
            paginationContainerEl.removeEventListener('click', onArrowPaginationClick);
        }

    const savedFilms = localStorage.getItem(`${placeKey}`) || []; // дістаємо зі сховища рядок фільмів за відповідним ключем

    try {
        const parsedSavedFilms = JSON.parse(savedFilms); // робимо парс отриманого рядка в масив
        const filmsNumber = parsedSavedFilms.length; // отримуємо кількість усіх фільмів, що є в сховищі
    
    if (filmsNumber === 0) {                 //якщо фільмів немає то очищуємо контейнер для фільмів (можливо перед цим в контейнері відображались з попередньої вкладки) і виходмо
        cardContainerEl.innerHTML = '';
        paginationFunctions.clearPagination(paginationEl);
        return;
    }
        

    const totalPages = Math.ceil(filmsNumber / NUMBER_PER_PAGE); // кількість сторінок 
    const films = filmsList(parsedSavedFilms, NUMBER_PER_PAGE, 1); // ріжемо необхідну кількість фільмів для ст 1 
        
    appendFromLocalStorage(films); // рендер отриманої частинки фільмів
  
    if (totalPages <= NUMBER_PAGINATION + 2 && totalPages >= 1) { // пагінація без стрілок, якщо кількість сторінок <= 7
        
        if (placeKey === 'watched') {
            document.querySelector('button[data-add="queque"]')?.addEventListener('click', onRemoveListeners);
        }

            // add gor queueSearch and watchedSearch

        if (placeKey === 'queue') {
            document.querySelector('button[data-add="watched"]')?.addEventListener('click', onRemoveListeners);
        }

        
        
        paginationFunctions.clearPagination(paginationEl); // очищуємо вміст попередньої пагінації

        paginationFunctions.displayPaginationSmall(totalPages, paginationEl); // рендер пагінації без стрілок 
        document.querySelector('.js-page-1').classList.add('pagination__item--select'); // першу сторінку робимо активною

        paginationEl.addEventListener('click', onDigitPaginationClick);

         if (totalPages === 1) {
                paginationFunctions.clearPagination(paginationEl);
         }
        
        return;
    }
        
    function onDigitPaginationClick(e) { // делегування на контейнер 
            e.preventDefault();

            if (!e.target.classList.contains('pagination__item')) { // якщо вибрали не li (сторінку) не реагуємо
                return;
            }

            const currentPage = Number(e.target.textContent);  // номер клікнутої сторінки 

            //document.querySelector('.pagination__item--select')?.classList.remove('pagination__item--select');
            //document.querySelector(`.js-page-${currentPage}`)?.classList.add('pagination__item--select');
            
            paginationFunctions.clearPagination(paginationEl);  // очищуємо попередню пагінацію

            onBigPaginationBtnClickrRenderFilms(currentPage, parsedSavedFilms);  // рендер необхідної частини фільму залежно від вибраної сторінки
            paginationFunctions.displayPaginationSmall(totalPages, paginationEl); // рендер пагінації без стрілок
            document.querySelector(`.js-page-${currentPage}`)?.classList.add('pagination__item--select'); // клікнуту сторінку робимо активною
    }

        // якщо кількість сторінок >7 (пагінація зі стрілками)

    paginationFunctions.clearPagination(paginationEl); // очищуємо поточну пагінацію
    paginationFunctions.displayPaginationBig(totalPages, paginationContainerEl, paginationEl); // рендер пагінації зі стрілками
    document.querySelector('.js-page-1').classList.add('pagination__item--select'); // перша сторінка активна

    const btnLeft = document.querySelector('.pagination__btnLeft'); // ліва стрілка
    const btnRight = document.querySelector('.pagination__btnRight'); // права стрілка

    btnLeft.disabled = true; // ліва стрілка неактивна бо ст 1

    paginationContainerEl.addEventListener('click', onArrowPaginationClick);

    function onArrowPaginationClick (e)  { // слухаємо контейнер, в якому стрілки (кнопки) і числова пагінація (список)
        e.preventDefault();

        if (!e.target.classList.contains('pagination__item') && !e.target.classList.contains('pagination__btnLeft') && !e.target.classList.contains('pagination__btnRight') ) {
            return;   // якщо клік не по стрілках і не по цифрах не реагуємо
        };
            
        if (e.target.classList.contains('pagination__item')) { // якщо клікнули по цифрах
            const currentPage = Number(e.target.textContent);       // номер клікнутої сторінки 
            
            onBigPaginationBtnClickrRenderFilms(currentPage, parsedSavedFilms); // рендер відповідної частини фільмів
            onBigPaginationBtnClickrRenderPagination(totalPages, currentPage); // рендер пагінації (залежно від клікнутої сторінки буде одна з трьох пагінацій)

            paginationFunctions.activityArrows(currentPage, totalPages);  // робимо стрілки неактивними якщо клікнули на першу чи останню сторінки
        }

        if (e.target.classList.contains('pagination__btnLeft')) { // якщо клікнули по лівій стрілці
                    
            const activePage = document.querySelector('.pagination__item--select'); 
            const activePageNumber = Number(activePage.textContent); // номер сторінки яка була активною на момент кліку
            const previousPage = activePageNumber - 1; // визначаємо номер сторінки яку потрібно рендерити (перша злііва від активної)

            onBigPaginationBtnClickrRenderFilms(previousPage, parsedSavedFilms); // рендер фільмів
            onBigPaginationBtnClickrRenderPagination(totalPages, previousPage); // рендер пагінації

            paginationFunctions.activityOfLeftArrow(1); // якщо рендерили по 1 ст то стрілка ліва стає неактивною
        }

        if (e.target.classList.contains('pagination__btnRight')) {

            const activePage = document.querySelector('.pagination__item--select');
            const activePageNumber = Number(activePage.textContent);
            const nextPage = activePageNumber + 1;

            onBigPaginationBtnClickrRenderFilms(nextPage, parsedSavedFilms);
            onBigPaginationBtnClickrRenderPagination(totalPages, nextPage); 
                    
            paginationFunctions.activityOfRightArrow(totalPages);  // якщо рендерили по останній сторінці, то права стрілка стає неактивною
        }
                
        if (placeKey === 'watched') {
            document.querySelector('button[data-add="queque"]')?.addEventListener('click', onRemoveListeners);
        }

            // add gor queueSearch and watchedSearch

        if (placeKey === 'queue') {
            document.querySelector('button[data-add="watched"]')?.addEventListener('click', onRemoveListeners);
        }

    }
    
    } catch {
        console.log('nothing are parsed');
    }
}

function filmsList(arrFilms, numberPerPage, page) { //нарізка фільмів по сторінках
        cardContainerEl.innerHTML = '';
        page -= 1; // рендеримо з 0

        const start = numberPerPage * page;
        const end = start + numberPerPage;
        const paginatedData = arrFilms.slice(start, end);

        return paginatedData;  // наприклад 2 сторінка з 8 фільмами: початок шматка фільмів - 8*1=8 і кінець - 8+8=16 (не включно, бо slice)
    }


function onBigPaginationBtnClickrRenderFilms(currentPage, parsedSavedFilms) { // рендер фільмів
    cardContainerEl.innerHTML = '';
    
    const films = filmsList(parsedSavedFilms, NUMBER_PER_PAGE, currentPage); // вирізана частина
        
    appendFromLocalStorage(films); // рендер частини фільмів
}

function onBigPaginationBtnClickrRenderPagination(totalPages, currentPage) { //рендер пагінації залежно від клікнутої сторінки: три варіанти
    paginationFunctions.clearPagination(paginationEl);

    const n = NUMBER_PAGINATION - (Math.ceil(NUMBER_PAGINATION / 3) - 2); // 5
    const m = totalPages - (NUMBER_PAGINATION - 1); // 5 з кінця


    if (currentPage < n) {
        paginationFunctions.displayPaginationBig(totalPages, paginationContainerEl, paginationEl); //пагінація з крапками біля останньої сторінки
    } else if (currentPage >= n && currentPage <= m) {
        paginationFunctions.displayPaginationBigMiddle(totalPages, currentPage, paginationContainerEl, paginationEl); //пагінація з середньою частиною
    } else {
        paginationFunctions.displayPaginationBigFinish(totalPages, paginationContainerEl, paginationEl); //пагінація з крапками біля 1 сторінки
    }

    document.querySelector(`.js-page-${currentPage}`)?.classList.add('pagination__item--select'); // поточну сторінку робимо активною
}

async function appendFromLocalStorage(parsedFilms) { // рендер фільмів в контейнер
    try {
        const markup = await renderFilms(parsedFilms).then(result => result); // рядок для рендеру
        cardContainerEl.innerHTML = markup; 
        showPlayBtnAfterImgLoad(); // Кнопка PLAY з'являється після картинки
    } catch (error) {
        console.error(error);
    };
};
