import * as paginationFunctions from './pagination-functions';
import onLoad from './onLoad';
import apiService from './apiService';
import localstorage from './service/localstorage';
import renderFilms from './renderFilms';
import showPlayBtnAfterImgLoad from './service/play-btn-delay'

const NUMBER_PAGINATION = 5;
const cardContainerEl = document.querySelector('.gallery');
const paginationEl = document.querySelector('.pagination__box');
const paginationContainerEl = document.querySelector('.pagination__container');
const formRef = document.querySelector('#search-form');

function getTotalPage() {
    const savedFilms = localStorage.getItem('currentFilms') || {};

    try {
        const parsedSavedFilms = JSON.parse(savedFilms);
        let pageNumber = 0;
        let firstPageFilms = [];

        const { total_results, total_pages, results } = parsedSavedFilms;

        if (total_results !== 0) {
            pageNumber = total_pages;
            firstPageFilms = results;
        }

        return { pageNumber, firstPageFilms, total_results } ;
    } catch {
        console.log('nothing');
    }
}


export async function paginationSearch(currentSearchWord) {
    formRef.addEventListener('submit', () => {
        paginationEl.removeEventListener('click', onPageClick);
        paginationContainerEl.removeEventListener('click', onBigPaginatinClick);
    });
    

   // console.log(currentSearchWord);

    const localStorageData = getTotalPage();
    const { pageNumber, firstPageFilms, total_results } = localStorageData;
   // const total_pages = pageNumber;

    if (total_results === 0) {
        cardContainerEl.innerHTML = '';
        paginationFunctions.clearPagination(paginationEl);
        console.log('nothing is found');
        return;
    }
    //console.log(total_pages);

    appendFromLocalStorage(firstPageFilms);

    paginationFunctions.clearPagination(paginationEl);

    if (pageNumber <= NUMBER_PAGINATION + 2 && pageNumber >= 1) {
        displayPaginationSmall(pageNumber);
        document.querySelector('.js-page-1').classList.add('pagination__item--select');

        paginationEl.addEventListener('click', onPageClick);
        
            //document.querySelector('.pagination__item--select').classList.remove('pagination__item--select');
        
        
        return;
    }
      
        
     

async function onPageClick(e) {
    if (!e.target.classList.contains('pagination__item')) {
        return;
    }
    
    try {
        const currentPage = Number(e.target.textContent);

        cardContainerEl.innerHTML = '';
        paginationFunctions.clearPagination(paginationEl);
        apiService.pageNumber = currentPage;
        apiService.query = currentSearchWord;
            
        
        
        const movies = await apiService.fetchFilmByName();
        //console.log(movies);
        paginationFunctions.clearPagination(paginationEl);
        appendFromLocalStorage(movies.results);
        displayPaginationSmall(pageNumber);
        document.querySelector(`.js-page-${currentPage}`)?.classList.add('pagination__item--select');
       // console.log(currentSearchWord);
        if (pageNumber === 1) {
            paginationFunctions.clearPagination(paginationEl);
        }
    }
    catch {
        console.log('fetch problem');
    }
}       


    paginationEl.innerHTML = '';
    paginationFunctions.clearPagination(paginationEl);

    displayPaginationBig(pageNumber);
    document.querySelector('.js-page-1').classList.add('pagination__item--select');

    const btnLeft = document.querySelector('.pagination__btnLeft');
    const btnRight = document.querySelector('.pagination__btnRight');

    btnLeft.disabled = true;

    paginationContainerEl.addEventListener('click', onBigPaginatinClick);

    function onBigPaginatinClick (e) {
        e.preventDefault();

        if (!e.target.classList.contains('pagination__item') && !e.target.classList.contains('pagination__btnLeft') && !e.target.classList.contains('pagination__btnRight') ) {
            return;
        };

       
        if (e.target.classList.contains('pagination__item')) {
             const currentPage = Number(e.target.textContent);        
        
            onBigPaginationBtnClickrRenderFilms(currentPage, currentSearchWord);
            onBigPaginationBtnClickrRenderPagination(pageNumber, currentPage); 

            paginationFunctions.activityArrows(currentPage, pageNumber);
        }

        if (e.target.classList.contains('pagination__btnLeft')) {
                
            const activePage = document.querySelector('.pagination__item--select');
            const activePageNumber = Number(activePage.textContent);
            const previousPage = activePageNumber - 1;

            onBigPaginationBtnClickrRenderFilms(previousPage, currentSearchWord);
            onBigPaginationBtnClickrRenderPagination(pageNumber, previousPage); 

            paginationFunctions.activityOfLeftArrow(1);
            
            }

        if (e.target.classList.contains('pagination__btnRight')) {
              
            const activePage = document.querySelector('.pagination__item--select');
            const activePageNumber = Number(activePage.textContent);
            const nextPage = activePageNumber + 1;

            onBigPaginationBtnClickrRenderFilms(nextPage, currentSearchWord);
            onBigPaginationBtnClickrRenderPagination(pageNumber, nextPage);    
            
            paginationFunctions.activityOfRightArrow(total_pages);
        }
       
    }
}

function onBigPaginationBtnClickrRenderPagination(pageNumber, currentPage) {
    paginationFunctions.clearPagination(paginationEl);

    const n = NUMBER_PAGINATION - (Math.ceil(NUMBER_PAGINATION / 3) - 2);
    const m = pageNumber - (NUMBER_PAGINATION - 1);


    if (currentPage < n) {
        displayPaginationBig(pageNumber);
    } else if (currentPage >= n && currentPage <= m) {
        displayPaginationBigMiddle(pageNumber, currentPage);
    } else {
        displayPaginationBigFinish(pageNumber);
    }

    document.querySelector(`.js-page-${currentPage}`).classList.add('pagination__item--select');
}

async function onBigPaginationBtnClickrRenderFilms(currentPage, currentSearchWord) {
    cardContainerEl.innerHTML = '';
    apiService.pageNumber = currentPage;
    apiService.query = currentSearchWord;
    
    try {  
        const movies = await apiService.fetchFilmByName();
       // console.log(movies);
        appendFromLocalStorage(movies.results);
    }
    catch {
        console.error(error);
    }
}

function displayPaginationBig(pageNumber) {
    createPaginationArrowLeft(paginationContainerEl);

    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < NUMBER_PAGINATION; i += 1) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
    }

    createPaginationDots(ulEl);

    const finishPage = displayPaginationBtn(pageNumber);
    ulEl.appendChild(finishPage);

    paginationEl.appendChild(ulEl);

    createPaginationArrowRight(paginationContainerEl);
}

function displayPaginationBigFinish(pageNumber) {
    createPaginationArrowLeft(paginationContainerEl);

    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    const firstPage = displayPaginationBtn(1);
    ulEl.appendChild(firstPage);

    createPaginationDots(ulEl);

    for (let i = pageNumber - (NUMBER_PAGINATION - 1); i <= pageNumber; i += 1) {
        const liEl = displayPaginationBtn(i);
        ulEl.appendChild(liEl);
    }

    paginationEl.appendChild(ulEl);

    createPaginationArrowRight(paginationContainerEl);
}

function displayPaginationBigMiddle(pageNumber, currentPage) {
    createPaginationArrowLeft(paginationContainerEl);

    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    const firstPage = displayPaginationBtn(1);
    ulEl.appendChild(firstPage);

    createPaginationDots(ulEl);

    for (let i = currentPage - (Math.ceil(NUMBER_PAGINATION / 2) - 1); i <= currentPage + (Math.ceil(NUMBER_PAGINATION / 2) - 1); i += 1) {
        const liEl = displayPaginationBtn(i);
        ulEl.appendChild(liEl);
    }

    createPaginationDots(ulEl);

    const lastPage = displayPaginationBtn(pageNumber);
    ulEl.appendChild(lastPage);

    paginationEl.appendChild(ulEl);

    createPaginationArrowRight(paginationContainerEl);
}

function displayPaginationSmall(pageNumber) {
       
    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < pageNumber; i += 1) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
    }
       
        paginationEl.appendChild(ulEl);
}
    
function displayPaginationBtn(page) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item', `js-page-${page}`);
    liEl.innerText = page;

    return liEl;
}

    

function createPaginationDots(parrent) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__dots');
    liEl.innerText = '...';
    parrent.appendChild(liEl);
}

function createPaginationArrowLeft(parrent) {
    const btnLeft = document.createElement('button');
    btnLeft.classList.add('pagination__btnLeft');
    btnLeft.innerText = '<';
    btnLeft.type = "button";
    parrent.prepend(btnLeft);
}

function createPaginationArrowRight(parrent) {
    const btnRight = document.createElement('button');
    btnRight.classList.add('pagination__btnRight');
    btnRight.innerText = '>';
    btnRight.type = "button";
    parrent.append(btnRight);
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
