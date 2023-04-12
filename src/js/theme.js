export default document
  .querySelector('#switch')
  .addEventListener('change', event => {
    event.preventDefault();
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', 'dark');
    }
    addDarkClassToHTML();
  });

function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('#switch').setAttribute('checked', 'checked');
      document
        .querySelector('.footer__container')
        .classList.add('dark__footer');
      document.querySelector('body').classList.add('dark');
      document.querySelector('.modal').classList.add('dark');
      document.querySelector('.member__link').classList.add('dark_theme-text');
    } else {
      console.log('light');
      document
        .querySelector('.footer__container')
        .classList.remove('dark__footer');
      document.querySelector('body').classList.remove('dark');
      document.querySelector('.modal').classList.remove('dark');
      document
        .querySelector('.member__link')
        .classList.remove('dark_theme-text');
      document
        .querySelector('.header__title')
        .classList.remove('dark_theme-title');
    }
  } catch (err) {}
}

addDarkClassToHTML();
