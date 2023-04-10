import onLoad from './onLoad';
import apiService from './apiService';

const NUMBER_PAGINATION = 5;
const cardContainerEl = document.querySelector('.gallery');
const paginationEl = document.querySelector('.pagination__box');
const paginationContainerEl = document.querySelector('.pagination__container')


export async function paginationFeach() {
    const { total_pages } = await apiService.fetchTrandingFilmDay();
    
    onLoad();
    
    if (total_pages <= NUMBER_PAGINATION + 2) {
        displayPaginationSmall(total_pages);
        paginationEl.addEventListener('click', onPaginationBtnClick);
    }

    displayPaginationBig(total_pages);
    document.querySelector('.js-page-1').classList.add('pagination__item--select');

    const btnLeft = document.querySelector('.pagination__btnLeft');
    const btnRight = document.querySelector('.pagination__btnRight');

    btnLeft.setAttribute('disabled', true);


    paginationEl.addEventListener('click', (e) => {
        
    }); 

    paginationContainerEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('pagination__item') && !e.target.classList.contains('pagination__btnLeft') && !e.target.classList.contains('pagination__btnRight') ) {
            return;
        };
        
        if (e.target.classList.contains('pagination__item')) {
             const currentPage = Number(e.target.textContent);        
        
            onBigPaginationBtnClickrRenderFilms(currentPage);
            onBigPaginationBtnClickrRenderPagination(total_pages, currentPage); 

            if (currentPage === 1) {
                document.querySelector('.pagination__btnLeft').disabled = true;
            } else {
                document.querySelector('.pagination__btnLeft').removeAttribute('dissabled');
            }

            if (currentPage === total_pages) {
                document.querySelector('.pagination__btnRight').disabled = true;
            } else {
                document.querySelector('.pagination__btnRight').removeAttribute('dissabled');
        }
        }

       
            

            if (e.target.classList.contains('pagination__btnLeft')) {
                const activePage = document.querySelector('.pagination__item--select');
                const activePageNumber = Number(activePage.textContent);
                
                const nextPage = activePageNumber - 1;

                onBigPaginationBtnClickrRenderFilms(nextPage);
                onBigPaginationBtnClickrRenderPagination(total_pages, nextPage); 
            }

            if (e.target.classList.contains('pagination__btnRight')) {
                const activePage = document.querySelector('.pagination__item--select');
                const activePageNumber = Number(activePage.textContent);
                
                const previousPage = activePageNumber + 1;

            onBigPaginationBtnClickrRenderFilms(previousPage);
            onBigPaginationBtnClickrRenderPagination(total_pages, previousPage); 
            }
       
    })
}

function onBigPaginationBtnClickrRenderPagination(total_pages, currentPage) {
    paginationEl.innerHTML = '';
    document.querySelector('.pagination__btnLeft').remove();
    document.querySelector('.pagination__btnRight').remove();


    const n = NUMBER_PAGINATION - (Math.ceil(NUMBER_PAGINATION / 3) - 2);
    const m = total_pages - (NUMBER_PAGINATION - 1);


    if (currentPage < n) {
        displayPaginationBig(total_pages);
    } else if (currentPage >= n && currentPage <= m) {
        displayPaginationBigMiddle(total_pages, currentPage);
    } else {
        displayPaginationBigFinish(total_pages);
    }

    document.querySelector(`.js-page-${currentPage}`).classList.add('pagination__item--select');
}

async function onBigPaginationBtnClickrRenderFilms(currentPage) {
    cardContainerEl.innerHTML = '';
    apiService.pageNumber = currentPage;
    onLoad();
}


function displayPaginationBig(total_pages) {
    createPaginationArrowLeft(paginationContainerEl);

    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < NUMBER_PAGINATION; i += 1) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
    }

    createPaginationDots(ulEl);

    const finishPage = displayPaginationBtn(total_pages);
    ulEl.appendChild(finishPage);

    paginationEl.appendChild(ulEl);

    createPaginationArrowRight(paginationContainerEl);
}

function displayPaginationBigFinish(total_pages) {
    createPaginationArrowLeft(paginationContainerEl);

    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    const firstPage = displayPaginationBtn(1);
    ulEl.appendChild(firstPage);

    createPaginationDots(ulEl);

    for (let i = total_pages - (NUMBER_PAGINATION - 1); i <= total_pages; i += 1) {
        const liEl = displayPaginationBtn(i);
        ulEl.appendChild(liEl);
    }

    paginationEl.appendChild(ulEl);

    createPaginationArrowRight(paginationContainerEl);
}

function displayPaginationBigMiddle(total_pages, currentPage) {
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

    const lastPage = displayPaginationBtn(total_pages);
    ulEl.appendChild(lastPage);

    paginationEl.appendChild(ulEl);

    createPaginationArrowRight(paginationContainerEl);
}

function displayPaginationSmall(totalPages) {
       
    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < totalPages; i += 1) {
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

async function onPaginationBtnClick(e) {
    if (!e.target.classList.contains('pagination__item')) {
        return;
    }

    cardContainerEl.innerHTML = '';
    apiService.pageNumber = Number(e.target.textContent);

    const { results } = await apiService.fetchTrandingFilmDay();

    render(results);
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



