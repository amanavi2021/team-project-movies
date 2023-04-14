import refs from './refs';
import localstorage from './localstorage';

// виводить картинку якщо переглянутих немає

export function onGalleryReview(btnType) {
       
    if (!localstorage.load(btnType)) 
    { refs.filmsContainer.classList.add('gallery-blank');
     }
    else {
        refs.filmsContainer.classList.remove('gallery-blank'); 
    }

    
}


export function showBlankPage(info) {
       
     if (!info) 
    { refs.filmsContainer.classList.add('gallery-blank');

     }
    else {
        refs.filmsContainer.classList.remove('gallery-blank'); 

    }

    
}