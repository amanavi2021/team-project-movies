import * as paginationFunctions from './pagination-functions';
import onLoad from './onLoad';
import apiService from './apiService';
import localstorage from './service/localstorage';

const NUMBER_PAGINATION = 5;
const cardContainerEl = document.querySelector('.gallery');
const paginationEl = document.querySelector('.pagination__box');
const paginationContainerEl = document.querySelector('.pagination__container');
const formRef = document.querySelector('#search-form');

function getFilmsFromStoradge() {
  const savedFilms = localStorage.getItem('currentFilms') || {};
  try {
    const parsedSavedFilms = JSON.parse(savedFilms);
    const pageNumber = parsedSavedFilms.total_pages;

    return pageNumber;
  } catch {
    console.log('nothing');
  }
}

export async function paginationFeach() {
  const totalPages = Math.min(getFilmsFromStoradge(), 500);

  await onLoad();

  if (totalPages <= NUMBER_PAGINATION + 2 && totalPages >= 1) {
    paginationFunctions.displayPaginationSmall(totalPages, paginationEl);
    document
      .querySelector('.js-page-1')
      .classList.add('pagination__item--select');

    if (totalPages === 1) {
      paginationFunctions.clearPagination(paginationEl);
    }

    paginationEl.addEventListener('click', onPaginationBtnClick);
    formRef.addEventListener('submit', onFormClickSmall);

    function onFormClickSmall() {
      paginationEl.removeEventListener('click', onPaginationBtnClick);
      paginationContainerEl.removeEventListener('click', onPaginationClick);
    }
    return;
  }

  paginationEl.innerHTML = '';

  paginationFunctions.displayPaginationBig(
    totalPages,
    paginationContainerEl,
    paginationEl
  );
  document
    .querySelector('.js-page-1')
    .classList.add('pagination__item--select');

  const btnLeft = document.querySelector('.pagination__btnLeft');
  const btnRight = document.querySelector('.pagination__btnRight');

  btnLeft.disabled = true;

  paginationContainerEl.addEventListener('click', onPaginationClick);

  function onPaginationClick(e) {
    e.preventDefault();

    if (
      !e.target.classList.contains('pagination__item') &&
      !e.target.classList.contains('pagination__btnLeft') &&
      !e.target.classList.contains('pagination__btnRight')
    ) {
      return;
    }

    if (e.target.classList.contains('pagination__item')) {
      const currentPage = Number(e.target.textContent);

      onBigPaginationBtnClickrRenderFilms(currentPage);
      onBigPaginationBtnClickrRenderPagination(totalPages, currentPage);

      paginationFunctions.activityArrows(currentPage, totalPages);
    }

    if (e.target.classList.contains('pagination__btnLeft')) {
      const activePage = document.querySelector('.pagination__item--select');
      const activePageNumber = Number(activePage.textContent);
      const previousPage = activePageNumber - 1;

      onBigPaginationBtnClickrRenderFilms(previousPage);
      onBigPaginationBtnClickrRenderPagination(totalPages, previousPage);

      paginationFunctions.activityOfLeftArrow(1);
    }

    if (e.target.classList.contains('pagination__btnRight')) {
      const activePage = document.querySelector('.pagination__item--select');
      const activePageNumber = Number(activePage.textContent);
      const nextPage = activePageNumber + 1;

      onBigPaginationBtnClickrRenderFilms(nextPage);
      onBigPaginationBtnClickrRenderPagination(totalPages, nextPage);

      paginationFunctions.activityOfRightArrow(totalPages);
    }
  }

  formRef.addEventListener('submit', onFormClick);

  function onFormClick() {
    paginationContainerEl.removeEventListener('click', onPaginationClick);
    paginationEl.removeEventListener('click', onPaginationBtnClick);
  }
}

function onBigPaginationBtnClickrRenderPagination(totalPages, currentPage) {
  paginationFunctions.clearPagination(paginationEl);

  const n = NUMBER_PAGINATION - (Math.ceil(NUMBER_PAGINATION / 3) - 2);
  const m = totalPages - (NUMBER_PAGINATION - 1);

  if (currentPage < n) {
    paginationFunctions.displayPaginationBig(
      totalPages,
      paginationContainerEl,
      paginationEl
    );
  } else if (currentPage >= n && currentPage <= m) {
    paginationFunctions.displayPaginationBigMiddle(
      totalPages,
      currentPage,
      paginationContainerEl,
      paginationEl
    );
  } else {
    paginationFunctions.displayPaginationBigFinish(
      totalPages,
      paginationContainerEl,
      paginationEl
    );
  }

  document
    .querySelector(`.js-page-${currentPage}`)
    ?.classList.add('pagination__item--select');
}

async function onBigPaginationBtnClickrRenderFilms(currentPage) {
  cardContainerEl.innerHTML = '';
  apiService.pageNumber = currentPage;

  await onLoad();
}

async function onPaginationBtnClick(e) {
  if (!e.target.classList.contains('pagination__item')) {
    return;
  }
  cardContainerEl.innerHTML = '';
  apiService.pageNumber = Number(e.target.textContent);

  await onLoad();

  document
    .querySelector(`.js-page-${currentPage}`)
    .classList.add('pagination__item--select');
}
