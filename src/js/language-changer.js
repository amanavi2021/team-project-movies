export const btnUa = document.querySelector('.ua');
const btnEn = document.querySelector('.en');

btnEn.disabled = true;
document.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('genres');
  if (localStorage.getItem('language') === 'ua') {
    ua();
  } else {
    en();
  }
});

btnUa.addEventListener('click', ua);
function ua() {
  btnEn.classList.remove('active-btn');
  btnUa.classList.add('active-btn');
  btnEn.disabled = false;
  btnUa.disabled = true;
  localStorage.setItem('language', 'ua');
  document.querySelectorAll('.switch__light').textContent = 'Світло';
  document.querySelectorAll('.switch__dark').textContent = 'Темно';
 
  document.querySelector('.search__input').placeholder = 'Знайти фільм';
  document.querySelector('.nav__link--home ').textContent = 'Головна';
  document.querySelector('.nav__link--library').textContent = 'Бібліотека';
  document.querySelector('.footer__text--rights').textContent =
    ' © 2023 | Всі права захищені |';
    
  document.querySelector('.footer__text--dev').textContent = 'Розроблено';
  document.querySelector('.footer__text--by').textContent = '';
  document.querySelector('.footer__link').textContent = 'Студентами GoIT';
try {
  document.querySelector('[data-add=queue]').textContent = 'В черзі';
  document.querySelector('[data-add=watched]').textContent = 'Переглянуті';
} catch (error) {
  
}
  

 
  
}

btnEn.addEventListener('click', en);
function en() {
  btnUa.classList.remove('active-btn');
  btnEn.classList.add('active-btn');
  btnEn.disabled = true;
  btnUa.disabled = false;
  localStorage.setItem('language', 'en');

  document.querySelector('.search__input').placeholder = 'Movie Search';
  document.querySelector('.nav__link--home').textContent = 'Home';
  document.querySelector('.nav__link--library').textContent = 'My Library';
  document.querySelector('.footer__text--rights').textContent =
    ' © 2023 | All Rights Reserved |';
  document.querySelector('.footer__text--dev').textContent = 'Developed with';
  document.querySelector('.footer__text--by').textContent = 'by';
  document.querySelector('.footer__link').textContent = 'GoIT Students';
  // document.querySelectorAll('.switch__light').textContent = 'light';
  // document.querySelectorAll('.switch__dark').textContent = 'dark';
  // document.querySelector('[data-add="queue"]').textContent = 'Queue';
  // document.querySelector('[data-add="watched"]').textContent = 'Watched';
}
