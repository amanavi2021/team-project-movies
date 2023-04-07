import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '837953248391225ae7c8e73f09921895';


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
        this.#fetchData(queryString); 
    }

   
    // запит фільма за ключовим словом 
    async fetchFilmByName() {    

        const queryString = `${BASE_URL}search/keyword?api_key=${API_KEY}&query=${this.searchQuery}`;
        this.#fetchData(queryString); 
       
    }
    
    // запит повної інформації за ID
    async fetchFullInfoByID() {    

        const queryString = `${BASE_URL}movie/${this.filmID}?api_key=${API_KEY}`;
        this.#fetchData(queryString); 
    }

    // запит трейлера за ID  
     async fetchTrailerByID() {    

        const queryString = `${BASE_URL}movie/${this.filmID}/videos?api_key=${API_KEY}`;
        this.#fetchData(queryString); 
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

