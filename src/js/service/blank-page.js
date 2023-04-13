import refs from './refs';
import localstorage from './localstorage';

// виводить картинку якщо переглянутих немає
console.log(refs.filmsContainer);

if (localstorage.load('watched')===[] || localstorage.load('watched')===undefined)
{ refs.filmsContainer.classList.add('gallery-blank');
 }
else {
    refs.filmsContainer.classList.remove('gallery-blank'); 
}