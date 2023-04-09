import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '837953248391225ae7c8e73f09921895';
const LOCAL_STORAGE_TF = 'trandingFilmDay';
const LOCAL_STORAGE_G = 'genres';


//клас робить HTTP-запит на ресурс і повертає дані (об'єкт)
class ApiService {
    constructor() {
        this.searchQuery = '' ; // Chupa для перевірки;
        this.pageNumber = 1;
        this.filmID = ''; // 594767 для перевірки;
     
           }

    // запит  найпопулярніших фільмів дня       
    async fetchTrandingFilmDay() {    

        const queryString = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${this.pageNumber}`;
        return this.#fetchData(queryString); 
    }

   
    // запит фільма за ключовим словом 
    async fetchFilmByName() {    

        // const queryString = `${BASE_URL}search/keyword?api_key=${API_KEY}&query=${this.searchQuery}`;
        const queryString = `${BASE_URL}/search/movie?api_key=${API_KEY}&page=${this.pageNumber}&query=${this.searchQuery}`;
        return this.#fetchData(queryString); 
       
    }
    
    // запит повної інформації за ID
    async fetchFullInfoByID() {    

        const queryString = `${BASE_URL}movie/${this.filmID}?api_key=${API_KEY}`;
        return this.#fetchData(queryString); 
    }

    // запит трейлера за ID  
     async fetchTrailerByID() {    

        const queryString = `${BASE_URL}movie/${this.filmID}/videos?api_key=${API_KEY}`;
        return this.#fetchData(queryString); 
    }

    // збереження результату запиту найпопулярніших фільмів дня в локальну змінну
    async saveTrandingFilmDayToLocalStorage() {
        const trandingFilmDay = await this.fetchTrandingFilmDay();
        localStorage.setItem(LOCAL_STORAGE_TF, JSON.stringify(trandingFilmDay));
    }

    // отримання збереженного результату запиту найпопулярніших фільмів дня в локальну змінну
    getTrandingFilmDay() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_TF) || null;
    if (savedData) {
        return JSON.parse(savedData);
    } else {
        return null;
    }
    }

    //збереження результату запиту переліку жанрів, якщо до цього вони не були збережені
    async saveGenresToLocalStorage() {
        if (!localStorage.getItem(LOCAL_STORAGE_G)) {
            const fetchedGenres = await this.#fetchGenres();
            const genres = fetchedGenres.genres;
            localStorage.setItem(LOCAL_STORAGE_G, JSON.stringify(genres));
    
        }
    }

    // запит переліку жанрів 
    async #fetchGenres(){
        const queryString =`${BASE_URL}genre/movie/list?api_key=${API_KEY}`;
        return this.#fetchData(queryString); 
    }
    

    async #fetchData(queryString) {
         try {
            const response = await axios.get(queryString);
            const data = await response.data;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


   
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

