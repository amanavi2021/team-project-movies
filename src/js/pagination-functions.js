const NUMBER_PAGINATION = 5;

export function createPaginationDots(parrent) { //створення крапок
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__dots');
    liEl.innerText = '...';
    parrent.appendChild(liEl);
}

export function createPaginationArrowLeft(parrent) { //створення лівої стрілки
    const btnLeft = document.createElement('button');
    btnLeft.classList.add('pagination__btnLeft');
    btnLeft.innerText = '<';
    btnLeft.type = "button";
    parrent.prepend(btnLeft);
}

export function createPaginationArrowRight(parrent) { //створення правої стрілки
    const btnRight = document.createElement('button');
    btnRight.classList.add('pagination__btnRight');
    btnRight.innerText = '>';
    btnRight.type = "button";
    parrent.append(btnRight);
}

export function clearPagination(container) { //очищення пагінації
    container.innerHTML = '';
    document.querySelector('.pagination__btnLeft')?.remove()
    document.querySelector('.pagination__btnRight')?.remove();
}

export function activityOfRightArrow(page) {
     if (Number(document.querySelector('.pagination__item--select').textContent) === page) {
                document.querySelector('.pagination__btnRight').disabled = true;
            } else {
                document.querySelector('.pagination__btnRight').disabled = false;
            }
}

export function activityOfLeftArrow(page) {
     if (Number(document.querySelector('.pagination__item--select').textContent) === page) {
                    document.querySelector('.pagination__btnLeft').disabled = true;
                } else {
                    document.querySelector('.pagination__btnLeft').disabled = false;
                }
}

export function activityArrows(currentPage, totalPages) {
    if (currentPage === 1) {
        document.querySelector('.pagination__btnLeft').disabled = true;
    } else {
        document.querySelector('.pagination__btnLeft').disabled = false;
    }

    if (currentPage === totalPages) {
        document.querySelector('.pagination__btnRight').disabled = true;
    } else {
        document.querySelector('.pagination__btnRight').disabled = false;
        }
}


////////////////////////////////////////

export function displayPaginationBtn(page) { //створення однієї цифри (елементу списка)
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item', `js-page-${page}`);
    liEl.innerText = page;

    return liEl;
}

export function displayPaginationSmall(totalPages, container) { //пагінація без стрілок і без крапок
       
    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < totalPages; i += 1) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
    }
       
        container.appendChild(ulEl);  // paginationEl
}

export function displayPaginationBigMiddle(totalPages, currentPage, container, list) {
    createPaginationArrowLeft(container);  //пагінація з середньою частиною

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

    const lastPage = displayPaginationBtn(totalPages);
    ulEl.appendChild(lastPage);

    list.appendChild(ulEl);

    createPaginationArrowRight(container); // paginationContainerEl
}

export function displayPaginationBigFinish(totalPages, container, list) {
    createPaginationArrowLeft(container);   //пагінація з крапками біля останньої сторінки

    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    const firstPage = displayPaginationBtn(1);
    ulEl.appendChild(firstPage);

    createPaginationDots(ulEl);

    for (let i = totalPages - (NUMBER_PAGINATION - 1); i <= totalPages; i += 1) {
        const liEl = displayPaginationBtn(i);
        ulEl.appendChild(liEl);
    }

    list.appendChild(ulEl);

    createPaginationArrowRight(container); // paginationContainerEl
}

export function displayPaginationBig(totalPages, container, list) {
    createPaginationArrowLeft(container);  //пагінація з крапками біля 1 сторінки

    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < NUMBER_PAGINATION; i += 1) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
    }

    createPaginationDots(ulEl);

    const finishPage = displayPaginationBtn(totalPages);
    ulEl.appendChild(finishPage);

    list.appendChild(ulEl);

    createPaginationArrowRight(container); //// paginationContainerEl
}





















