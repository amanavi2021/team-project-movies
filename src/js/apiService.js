import axios from 'axios';
import localStore from './service/localstorage';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '837953248391225ae7c8e73f09921895';
const LOCAL_STORAGE_TF = 'currentFilms';
const LOCAL_STORAGE_G = 'genres';
const LOCAL_STORAGE_Q = 'queue';
const LOCAL_STORAGE_W = 'watched';

let language = 'en-US';
function checkedLanguage() {
  if (localStorage.getItem('language') === 'ua') {
    language = 'uk-UA';
  } else {
    language = 'en-US';
  }
}

//клас робить HTTP-запит на ресурс і повертає дані (об'єкт)
class ApiService {
  constructor() {
    this.searchQuery = ''; // Chupa для перевірки;
    this.pageNumber = 1;
    this.filmID = ''; // 594767 для перевірки;
  }

  // запит  найпопулярніших фільмів дня
  async fetchTrandingFilmDay() {
    checkedLanguage();
    const queryString = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${this.pageNumber}&language=${language}`;
    return this.#fetchData(queryString);
  }

  // запит фільма за ключовим словом
  async fetchFilmByName() {
    checkedLanguage();
    //const queryString = `${BASE_URL}search/keyword?api_key=${API_KEY}&query=${this.searchQuery}`;
    const queryString = `${BASE_URL}/search/movie?api_key=${API_KEY}&page=${this.pageNumber}&query=${this.searchQuery}&language=${language}`;
    return this.#fetchData(queryString);
  }

  // запит повної інформації за ID
  async fetchFullInfoByID() {
    checkedLanguage();
    const queryString = `${BASE_URL}movie/${this.filmID}?api_key=${API_KEY}&language=${language}`;
    return this.#fetchData(queryString);
  }

  // запит трейлера за ID
  async fetchTrailerByID() {
    checkedLanguage();
    const queryString = `${BASE_URL}movie/${this.filmID}/videos?api_key=${API_KEY}&language=${language}`;
    return this.#fetchData(queryString);
  }

  // збереження результату запиту найпопулярніших фільмів дня в локальну змінну
  async saveTrandingFilmDayToLocalStorage() {
    const trandingFilmDay = await this.fetchTrandingFilmDay();
    localStore.save(LOCAL_STORAGE_TF, trandingFilmDay);
  }

  // отримання збереженного результату запиту найпопулярніших фільмів дня або пошуку фільмів з локальної змінної
  getSavedFilms() {
    return localStore.load(LOCAL_STORAGE_TF) || {};
  }

  // отримання збереженного результату запиту переглянутих фільмів з локальної змінної
  getWatchedFilms() {
    return localStore.load(LOCAL_STORAGE_W) || {};
  }

  // отримання збереженного результату запиту фільмів у черзі з локальної змінної
  getQueuedFilms() {
    return localStore.load(LOCAL_STORAGE_Q) || {};
  }

  // збереження результату запиту фільмів за назвою
  async saveFindingFilmsToLocalStorage() {
    const findingFilms = await this.fetchFilmByName();
    localStore.save(LOCAL_STORAGE_TF, findingFilms);
  }

  // запит переліку жанрів
  async #fetchGenres() {
    checkedLanguage();
    const queryString = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=${language}`;
    return this.#fetchData(queryString);
  }

  //збереження результату запиту переліку жанрів, якщо до цього вони не були збережені
  async saveGenresToLocalStorage() {
    if (!localStore.load(LOCAL_STORAGE_G)) {
      const fetchedGenres = await this.#fetchGenres();
      const genres = fetchedGenres.genres;
      localStore.save(LOCAL_STORAGE_G, genres);
    }
  }

  // базова функція fetch
  async #fetchData(queryString) {
    try {
      const response = await axios.get(queryString);
      const data = await response.data;
      return data;
    } catch (error) {
      throw Error;
    }
  }

  incrementPage() {
    this.pageNumber += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get id() {
    return this.filmID;
  }

  set id(newID) {
    this.filmID = newID;
  }
}

export default new ApiService();
