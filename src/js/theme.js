export default document
  .querySelector('#switch')
  .addEventListener('change', event => {
    console.log('sdsdsdsd');
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
      document
        .querySelector('.footer__container')
        .classList.remove('dark__footer');
      document.querySelector('body').classList.remove('dark');
      document.querySelector('.modal').classList.remove('dark');

      document
        .querySelector('.member__link')
        .classList.remove('dark_theme-text');
    }
  } catch (err) {}
}

addDarkClassToHTML();
