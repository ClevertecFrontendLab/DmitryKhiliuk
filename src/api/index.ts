import axios from 'axios';

import {HOST} from '../common/routes';

const instance = axios.create({
    baseURL: HOST
})

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
