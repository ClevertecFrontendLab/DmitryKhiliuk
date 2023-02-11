import axios, {AxiosResponse} from 'axios';

import {BookDetailType, BooksType, CategoriesType} from '../common/types';

const instance = axios.create({
    baseURL: 'https://strapi.cleverland.by/'
})

export const booksAPI = {
    getBooks(){
       return  instance.get<AxiosResponse<BooksType>>('api/books')
    },
    getBookDetail(id:number){
        return  instance.get<AxiosResponse<BookDetailType>>(`api/books/${id}`,)
    },
    getCategories(){
        console.log('api')
        return  instance.get('api/categories',)
    },
}
