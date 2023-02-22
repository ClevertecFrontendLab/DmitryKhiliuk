import {useNavigate, useParams} from 'react-router-dom';

import {selectBooks, selectCategories} from '../../../../common/selectors';
import {BooksType} from '../../../../common/types';
import {Card} from '../../../../components/card';
import {resetBookAC} from '../../../../redux/book-reducer';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';

import styles from './main-content.module.scss'

type MainContentType = {
    grid: boolean
    value: string
}

export const MainContent = ({grid, value}: MainContentType) => {

    const books = useAppSelector(selectBooks)
    const categories = useAppSelector(selectCategories)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {category} = useParams()

    /* ---------------------------search and filter content-------------------------------------- */

    const currentCategory = categories.find((el) => el.path === category)
    const categoryName = currentCategory?.name
    const booksInThisCategory = books.filter((book) => book.categories.find((ctgrs) => ctgrs === categoryName))

    let selectCategoryBooks: BooksType

    const filteringSearch = (filtrableBooks: BooksType) => filtrableBooks.filter((el) => {
        const keys: string[] = []

        el.authors.forEach((auth) => keys.push(auth))
        keys.push(el.title)

        return keys.find((auth) => auth.toLowerCase().includes(value.toLowerCase()))
    })

    if (category === 'all') {
        selectCategoryBooks = filteringSearch(books)
    } else {
        selectCategoryBooks = filteringSearch(booksInThisCategory)
    }

    /* ---------------------------grid or row view content----------------------------------------- */

    const getContentOrder = () => grid ? `${styles.contentGrid}` : `${styles.contentGrid} ${styles.contentRow}`
    const contentOrder = getContentOrder()

    /* ---------------------------navigate to bookId----------------------------------------- */

    const onClickHandler = (id:number) => {
        dispatch(resetBookAC({}))
        navigate(`${id}`)
    }

    return (
        <div className={contentOrder}  >
            {selectCategoryBooks.map((book) => <div key={book.id} tabIndex={0} role='button' onKeyDown={() => onClickHandler(book.id)} onClick={() => onClickHandler(book.id)} data-test-id='card'>
                <Card  id={book.id} grid={grid}/>
            </div>)}
        </div>
    );
};

