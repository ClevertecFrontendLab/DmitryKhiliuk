import axios, {AxiosResponse} from 'axios';

import {BookDetailType, BooksType, CategoriesType} from '../common/types';

const instance = axios.create({
    baseURL: 'https://strapi.cleverland.by/'
})

export const booksAPI = {
    getBooks(){
       return  instance.get('api/books')
    },
    getBookDetail(bookId:number){
        return  instance.get(`api/books/${bookId}`,)
    },
    getCategories(){
        return  instance.get('api/categories',)
    },
}
