import markupTpl from '../templates/markupFilmMainPage.hbs';

const NUMBER_PAGINATION = 5;
const NUMBER_PER_PAGE = 8;
const cardContainerEl = document.querySelector('.gallery');
const paginationEl = document.querySelector('.pagination__box');


export function paginationLocalStorage(placeKey) {
    
    const savedFilms = localStorage.getItem(`${placeKey}`) || [];
    try {
        const parsedSavedFilms = JSON.parse(savedFilms);
        const filmsNumber = parsedSavedFilms.length;
    
    if (filmsNumber === 0) {
        return;
    }

    const paginationEl = document.querySelector('.pagination');

    paginationEl.classList.remove('visually-hidden');

    const total_pages = Math.ceil(filmsNumber / NUMBER_PER_PAGE);
    const films = filmsList(parsedSavedFilms, NUMBER_PER_PAGE, 1);
        
    render(films);
  
    if (total_pages <= NUMBER_PAGINATION + 2) {
        displayPaginationSmall(total_pages);
        paginationEl.addEventListener('click', onPaginationBtnClick);
    }

    displayPaginationBig(total_pages);
    document.querySelector('.js-page-1').classList.add('pagination__item--select');

    paginationEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('pagination__item')) {
            return;
        }

        const currentPage = Number(e.target.textContent);
    
        onBigPaginationBtnClickrRenderFilms(currentPage, parsedSavedFilms);
        onBigPaginationBtnClickrRenderPagination(total_pages, currentPage); 
    }); 
    } catch {
        console.log('nothing are parsed');
    }
}

function filmsList(arrFilms, numberPerPage, page) {
        cardContainerEl.innerHTML = '';
        page -= 1;

        const start = numberPerPage * page;
        const end = start + numberPerPage;
        const paginatedData = arrFilms.slice(start, end);

        return paginatedData;
    }

function render(films) {
    const makeFilmsList = films
        .map(({ poster_path, title, genre_ids, release_date }) => {
            if (poster_path !== null) {
                const date = new Date(release_date);
                const year = date.getFullYear();
                let genreList = genre_ids.map((genreId) => {
                    const genre = genres.find((g) => g.id === genreId);
                    return genre.name;
                });

                if (genreList.length > 2 || genre_ids.length === 0) {
                    genreList = genreList.slice(0, 2);
                    genreList.push('Other');
                };

                genreList = genreList.join(', ');

                return markupTpl({ poster_path, title, genreList, year });
            }
        })
        .join('');
    
    cardContainerEl.insertAdjacentHTML('beforeend', makeFilmsList);
}

function onBigPaginationBtnClickrRenderFilms(currentPage, parsedSavedFilms) {
    cardContainerEl.innerHTML = '';
    
    const films = filmsList(parsedSavedFilms, NUMBER_PER_PAGE, currentPage);
        
    render(films);
}

function onBigPaginationBtnClickrRenderPagination(total_pages, currentPage) {
    paginationEl.innerHTML = '';

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



function displayPaginationBig(total_pages) {
    const ulEl = document.createElement('ul');

    ulEl.classList.add('pagination__list');

    for (let i = 0; i < NUMBER_PAGINATION; i += 1) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
    }

    const dots = displayPaginationDots();
    ulEl.appendChild(dots);

    const finishPage = displayPaginationBtn(total_pages);
    ulEl.appendChild(finishPage);

    paginationEl.appendChild(ulEl);
}

function displayPaginationBigFinish(total_pages) {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    const firstPage = displayPaginationBtn(1);
    ulEl.appendChild(firstPage);

    const dots = displayPaginationDots();
    ulEl.appendChild(dots);

    for (let i = total_pages - (NUMBER_PAGINATION - 1); i <= total_pages; i += 1) {
        const liEl = displayPaginationBtn(i);
        ulEl.appendChild(liEl);
    }

    paginationEl.appendChild(ulEl);
}

function displayPaginationBigMiddle(total_pages, currentPage) {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    const firstPage = displayPaginationBtn(1);
    ulEl.appendChild(firstPage);

    const dotsFirst = displayPaginationDots();
    ulEl.appendChild(dotsFirst);

    for (let i = currentPage - (Math.ceil(NUMBER_PAGINATION / 2) - 1); i <= currentPage + (Math.ceil(NUMBER_PAGINATION / 2) - 1); i += 1) {
        const liEl = displayPaginationBtn(i);
        ulEl.appendChild(liEl);
    }

    const dotsLast = displayPaginationDots();
    ulEl.appendChild(dotsLast);

    const lastPage = displayPaginationBtn(total_pages);
    ulEl.appendChild(lastPage);

    paginationEl.appendChild(ulEl);
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

function displayPaginationDots() {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__dots');
    liEl.innerText = '...';

    return liEl;
}        

paginationLocalStorage(place);