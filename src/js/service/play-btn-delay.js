// Кнопка PLAY з'являється після картинки
export default function showPlayBtnAfterImgLoad() {
  const imgFilms = document.querySelectorAll('.film-card__small-image');
  const trailerPlayBTN = document.querySelectorAll('[data-btn-page]');

  imgFilms.forEach((image, i) => {
    if (image.complete) {
      trailerPlayBTN[i].classList.remove('visually-hidden');
    } else {
      image.addEventListener('load', () => {
        trailerPlayBTN[i].classList.remove('visually-hidden');
      });
    }
  });
}


// {

//     const imgFilms = document.querySelectorAll('.film-card__small-image');
//     const start = performance.now();
//     imgFilms.forEach((imgFilm) => imgFilm.addEventListener('load', () => {
//     }));
//     const end = performance.now();
//     const duration = end - start;

//     console.log(`Время отрисовки всех картинки: ${duration} мс`);

//     const trailerPlayBTNs = document.querySelectorAll('.trailer-player-btn');
//     setTimeout(() => {
//         trailerPlayBTNs.forEach((button) => button.classList.remove('visually-hidden'));
//     }, duration);

// }










   