const teamMembers = [
  {
    name: 'Nadiia Maltseva',
    role: 'Team Lead',
    github: 'https://github.com/amanavi2021',
    linkedin: '',
    photo: '',
  },
  {
    name: 'Oleksandr Karpiuk',
    role: 'Scrum Master',
    github: 'https://github.com/Oleksandr-Karpiuk',
    linkedin: 'https://www.linkedin.com/in/oleksandr-karpiuk/',
    photo:
      'https://media.licdn.com/dms/image/D4E03AQHaiyyHccyRGg/profile-displayphoto-shrink_200_200/0/1680380173309?e=1686182400&v=beta&t=N-mOTz8Drif8wND3Ba9EZb9o3lsC8ZuSTgY3uNj0hEY',
  },
  {
    name: 'Olga Tolstykhina',
    role: 'Developer',
    github: 'https://github.com/OlgaT0709',
    linkedin: 'https://www.linkedin.com/in/olga-tolstikhina-developer/',
    photo:
      'https://media.licdn.com/dms/image/D4E03AQEc2RMSdFKOrQ/profile-displayphoto-shrink_200_200/0/1676054506466?e=1686182400&v=beta&t=4axleVyVdGpt4lIyeGPllJmUGqvdUARBSkCx3gONCxo',
  },
  {
    name: 'Liliia Paliichuk',
    role: 'Developer',
    github: 'https://github.com/lili2628',
    linkedin: 'https://www.linkedin.com/in/liliia-paliichuk-a0605579/',
    photo:
      'https://media.licdn.com/dms/image/D4D03AQHYIP070mnk_w/profile-displayphoto-shrink_200_200/0/1680300560019?e=1686787200&v=beta&t=7TfKO3TD7yBkamExj-ZTNr1y90qD4lROolzu14p-9uo',
  },
  {
    name: 'Natalia Malovana',
    role: 'Developer',
    github: 'https://github.com/NataliaTalia',
    linkedin: 'https://www.linkedin.com/in/natalia-malovana-468817271/',
    photo: 'https://avatars.githubusercontent.com/u/113437905?v=4',
  },
  {
    name: 'Ulyana Yashan',
    role: 'Developer',
    github: 'https://github.com/UlyanaYashan',
    linkedin: '',
    photo: 'https://ca.slack-edge.com/T04FPHYQ4M8-U04GM3XL69J-ef50e678fe2f-512',
  },
  {
    name: 'Ruslan Bulda',
    role: 'Developer',
    github: 'https://github.com/rbulda50',
    linkedin:
      'https://www.linkedin.com/in/%D1%80%D1%83%D1%81%D0%BB%D0%B0%D0%BD-%D0%B1%D1%83%D0%BB%D0%B4%D0%B0-8a0345204/',
    photo:
      'https://media.licdn.com/dms/image/C4D03AQE9yuFbOvfwpA/profile-displayphoto-shrink_200_200/0/1610811042896?e=1686182400&v=beta&t=rLrvi32cplyT9SpnZcs-BwokiyGAhtGerj1d7gsuUHw',
  },
  {
    name: 'Anatolii Matsakov',
    role: 'Developer',
    github: 'https://github.com/WipeRrr',
    linkedin: 'https://www.linkedin.com/in/anatoliy-matsakov-85b934261/',
    photo: 'https://ca.slack-edge.com/T04FPHYQ4M8-U04GHU608EP-fed049334141-512',
  },
  {
    name: '',
    role: 'Developer',
    github: '',
    linkedin: '',
    photo: '',
  },
  {
    name: '',
    role: 'Developer',
    github: '',
    linkedin: '',
    photo: '',
  },
  {
    name: '',
    role: 'Developer',
    github: '',
    linkedin: '',
    photo: '',
  },
  {
    name: '',
    role: 'Developer',
    github: '',
    linkedin: '',
    photo: '',
  },
  {
    name: 'Yaroslav Hrytsutenko',
    role: 'Developer',
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

export function loadIntoTeamModal(teamMembers) {
  const markup = teamMembers
    .map(member => {
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
    })
    .join('');

  filmCardRef.innerHTML = '';
  teamRef.innerHTML = markup;
}

function onOpenTeamListModal() {
  modalRef.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  loadIntoTeamModal(teamMembers);
}

function onCloseModal() {
  modalRef.classList.add('is-hidden');
  teamRef.innerHTML = '';
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

  window.removeEventListener('keydown', onEscKeyPress);
  onCloseModal();
}
