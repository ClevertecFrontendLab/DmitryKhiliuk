import {createSlice} from '@reduxjs/toolkit';

import testBook from '../assets/img/bookPageImg.jpg';
import page1 from '../assets/img/page1.jpg';
import page2 from '../assets/img/page2.jpg';
import page3 from '../assets/img/page3.jpg';
import page5 from '../assets/img/page5.jpg';
import page6 from '../assets/img/page6.jpg';


const books = [
    {id: 1, image: [], title: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих', author: 'Адитья Бхаргава', year: '2009', rating: 3, status: 'free'},
    {id: 2, image: [testBook], title: 'Грокаем алгоритмы.', author: 'Адитья Бхаргава, Гейзенберг', year: '2009', rating: 2, status: 'taken'},
    {id: 3, image: [testBook, page1, page2, page3, page5, page6], title: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих', author: 'Адитья Бхаргава', year: '2009', rating: 4, status: 'free'},
    {id: 4, image: [testBook, page1, page2], title: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих', author: 'Адитья Бхаргава', year: '2009', rating: 5, status: 'reserved'},
    {id: 5, image: [testBook, page1, page2], title: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих', author: 'Адитья Бхаргава', year: '2009', rating: 3, status: 'free'},
    {id: 6, image: [testBook, page1, page2, page3,], title: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих', author: 'Адитья Бхаргава', year: '2009', rating: 0, status: 'free'},
    {id: 7, image: [testBook, page1, page2, page3,], title: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих', author: 'Адитья Бхаргава', year: '2009', rating: 1, status: 'free'},
    {id: 8, image: [], title: 'Грокаем алгоритмы. ', author: 'Адитья Бхаргава', year: '2009', rating: 4, status: 'taken'},
]

export const slice = createSlice({
    name: 'books',
    initialState: books,
    reducers: {

    }
})

export const bookReducer = slice.reducer
