import axios from 'axios';

import {HOST} from '../common/routes';

export const instance = axios.create({

    baseURL: HOST,

})

    instance.interceptors.request.use(
       request => {

           request.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`

           return request
       },
        error => {
            console.log(error)
        }
     );

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


