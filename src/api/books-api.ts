import axios from 'axios';

import {HOST} from '../common/routes';


const jwt = localStorage.getItem('jwt')



export const instance = axios.create({
    baseURL: HOST,
    headers: {
        'Authorization':  `Bearer ${jwt}`
    }
})

  /* instance.interceptors.response.use( response => response,
     error => {

         if (error.response.status === 401) {

         }
     }); */

export const booksAPI = {
    getBooks(){
       return  instance.get('/api/books')
    },
    getBookDetail(bookId:number){
        return  instance.get(`/api/books/${bookId}`,)
    },
    getCategories(){
        return  instance.get('/api/categories',)
    },
}


