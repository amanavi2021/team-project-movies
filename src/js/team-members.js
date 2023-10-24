const teamMembers = [
  {
    name: 'Nadiia Maltseva',
    uaName: 'Надія Мальцева',
    role: 'Team Lead',
    roleUa: 'ТімЛід',
    github: 'https://github.com/amanavi2021',
    linkedin: '',
    photo: 'https://ca.slack-edge.com/T04FPHYQ4M8-U04GN1KPCKW-89b080b31dc6-512',
  },
  {
    name: 'Oleksandr Karpiuk',
    uaName: 'Олександр Карпюк',
    role: 'Scrum Master',
    roleUa: 'Скрам Майстер',
    github: 'https://github.com/Oleksandr-Karpiuk',
    linkedin: 'https://www.linkedin.com/in/oleksandr-karpiuk/',
    photo:
      'https://media.licdn.com/dms/image/D4E03AQHaiyyHccyRGg/profile-displayphoto-shrink_200_200/0/1680380173309?e=1703721600&v=beta&t=iR-s-k63Diw0YIy4rvfTFLslpo6BrcKI2jJw63ZCNAc',
  },
  {
    name: 'Olga Tolstykhina',
    uaName: 'Ольга Толстихіна ',
    role: 'Developer',
    roleUa: 'Розробник',
    github: 'https://github.com/OlgaT0709',
    linkedin: 'https://www.linkedin.com/in/olga-tolstikhina-developer/',
    photo: 'https://avatars.githubusercontent.com/u/113298274?v=4',
  },
  {
    name: 'Liliia Paliichuk',
    uaName: 'Ліля Палічук',
    role: 'Developer',
    roleUa: 'Розробник',
    github: 'https://github.com/lili2628',
    linkedin: 'https://www.linkedin.com/in/liliia-paliichuk-a0605579/',
    photo:
      'https://media.licdn.com/dms/image/D4D03AQHYIP070mnk_w/profile-displayphoto-shrink_200_200/0/1680300560019?e=1703721600&v=beta&t=lMH-PLkNqd8AScUrwdlDE7F7mzdtCEHouv8XbBqyfrE',
  },
  {
    name: 'Natalia Malovana',
    uaName: 'Наталя Малована',
    role: 'Developer',
    roleUa: 'Розробник',
    github: 'https://github.com/NataliaTalia',
    linkedin: 'https://www.linkedin.com/in/natalia-malovana-468817271/',
    photo: 'https://avatars.githubusercontent.com/u/113437905?v=4',
  },
  {
    name: 'Ulyana Yashan',
    uaName: 'Ульяна Яшан',
    role: 'Developer',
    roleUa: 'Розробник',
    github: 'https://github.com/UlyanaYashan',
    linkedin: '',
    photo: 'https://ca.slack-edge.com/T04FPHYQ4M8-U04GM3XL69J-ef50e678fe2f-512',
  },
  {
    name: 'Ruslan Bulda',
    uaName: 'Руслан Булда',
    role: 'Developer',
    roleUa: 'Розробник',
    github: 'https://github.com/rbulda50',
    linkedin:
      'https://www.linkedin.com/in/%D1%80%D1%83%D1%81%D0%BB%D0%B0%D0%BD-%D0%B1%D1%83%D0%BB%D0%B4%D0%B0-8a0345204/',
    photo: 'https://ca.slack-edge.com/T04FPHYQ4M8-U04G3HB6XSB-1cfd90246585-512',
  },
  {
    name: 'Anatolii Matsakov',
    uaName: 'Анатолій Мацаков',
    role: 'Developer',
    roleUa: 'Розробник',
    github: 'https://github.com/WipeRrr',
    linkedin: 'https://www.linkedin.com/in/anatoliy-matsakov-85b934261/',
    photo:
      'https://media.licdn.com/dms/image/D4E03AQG_dNU1r3eqhg/profile-displayphoto-shrink_200_200/0/1681211225424?e=1703721600&v=beta&t=M2Nlf5C9PIlzF4YKzLwA_nJ2xoti44jDFJ9s0QnXaXs',
  },
  {
    name: 'Olesia Manina',
    uaName: 'Олеся Маніна',
    role: 'Developer',
    roleUa: 'Розробник',
    github: 'https://github.com/OlesiaManina',
    linkedin: 'https://www.linkedin.com/in/olesia-manina-206592271/',
    photo:
      'https://media.licdn.com/dms/image/D5603AQEBcXzDdzgetA/profile-displayphoto-shrink_200_200/0/1681136399432?e=1703721600&v=beta&t=wz5xxsrAQLqPsiaJ6LnHi7nkORj7oW8HY2MAPVfw3fw',
  },
  {
    name: 'Pavlo Stakhovsky',
    uaName: 'Павло Стаховський',
    role: 'Developer',
    roleUa: 'Розробник',
    github: 'https://github.com/Stiroid',
    linkedin: 'https://www.linkedin.com/mwlite/in/stimpack-paul-914084272',
    photo:
      'https://media.licdn.com/dms/image/D5603AQGbu19s3lBcCA/profile-displayphoto-shrink_200_200/0/1681228744464?e=1686787200&v=beta&t=3DmdTdw341wPKYlJvO7oAgEJwMPGl5UjPhue5-m0LKM',
  },
  {
    name: 'Yaroslav Voinalovich',
    uaName: 'Ярослав Войналович',
    role: 'Developer',
    roleUa: 'Розробник',
    github: 'https://github.com/Voinalovych91',
    linkedin: 'https://www.linkedin.com/in/yaroslav-voinalovich-8a2b87271/',
    photo:
      'https://media.licdn.com/dms/image/D4E03AQF8AcETaCzbOw/profile-displayphoto-shrink_200_200/0/1681232134819?e=1703721600&v=beta&t=NDHcf5xF8WkLBx0BCjVnghJgvKuyQk9EU_KkaoQKgMk',
  },
  {
    name: 'Yaroslav Hrytsutenko',
    uaName: 'Ярослав Гриценко',
    role: 'Developer',
    roleUa: 'Розробник',
    github: 'https://github.com/HrytsutenkoYaroslav',
    linkedin: 'https://www.linkedin.com/in/yaroslav-hrytsutenko-340538184/',
    photo:
      'https://media.licdn.com/dms/image/D4E35AQFoF-ueif9FUg/profile-framedphoto-shrink_200_200/0/1660417609533?e=1681560000&v=beta&t=9smaRhF5oqbGlHvSKVuwEOEKuQvSlIQEgTtIkIUQha4',
  },
];

const teamRef = document.querySelector('.team-list');
const filmCardRef = document.querySelector('.film-info__wrap');
const openModalRef = document.querySelector('[data-modal-open]');
const closeModalRef = document.querySelector('[data-modal-close]');
const modalRef = document.querySelector('[data-modal]');

openModalRef.addEventListener('click', onOpenTeamListModal);
closeModalRef.addEventListener('click', onCloseModal);
modalRef.addEventListener('click', onBackDropClick);
const isLanguageUA = localStorage.getItem('language') === 'ua';
export function loadIntoTeamModal(teamMembers) {
  const markup = teamMembers
    .map(member => {
      if (localStorage.getItem('language') === 'ua') {
        return `
      <li class="member__card">
        <div class="member__thumb">        
            <img class="member__image" width='120' 
            src="${member.photo}"
            alt=${member.uaname}
            loading="lazy"
            />      
        </div>
        <div class="member__info">
          <p class="member__name">${member.uaName}</p>
          <a class="member__link member__link-git" 
             href="${member.github}" 
             target="_blank">github</a>
          <a class="member__link" 
          href="${member.linkedin}" 
          target="_blank">linkedin</a>
          <p class="member__role">${member.roleUa}</p>
        </div>
      </li>`;
      } else {
        return `
      <li class="member__card">
        <div class="member__thumb">        
            <img class="member__image" width='120' 
            src="${member.photo}"
            alt=${member.name}
            loading="lazy"
            />      
        </div>
        <div class="member__info">
          <p class="member__name">${member.name}</p>
          <a class="member__link member__link-git" 
             href="${member.github}" 
             target="_blank">github</a>
          <a class="member__link" 
          href="${member.linkedin}" 
          target="_blank">linkedin</a>
          <p class="member__role">${member.role}</p>
        </div>
      </li>`;
      }
    })
    .join('');

  filmCardRef.innerHTML = '';
  teamRef.innerHTML = markup;
}

function onOpenTeamListModal() {
  modalRef.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  loadIntoTeamModal(teamMembers);
  document.body.style.overflow = 'hidden';
}

function onCloseModal() {
  modalRef.classList.add('is-hidden');
  // teamRef.innerHTML = '';
  document.body.style.overflow = '';

  removeEventListenerKeydown();
}

function onBackDropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code !== 'Escape') {
    return;
  }
  onCloseModal();
}

function removeEventListenerKeydown() {
  window.removeEventListener('keydown', onEscKeyPress);
}
