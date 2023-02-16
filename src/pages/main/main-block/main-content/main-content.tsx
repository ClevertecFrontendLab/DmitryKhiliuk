import {useNavigate, useParams} from 'react-router-dom';

import {selectBooks, selectCategories} from '../../../../common/selectors';
import {BooksType} from '../../../../common/types';
import {Card} from '../../../../components/card';
import {resetBookAC} from '../../../../redux/book-reducer';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';

import styles from './main-content.module.scss'

type MainContentType = {
    grid: boolean
}

export const MainContent = ({grid}: MainContentType) => {

    const books = useAppSelector(selectBooks)
    const categories = useAppSelector(selectCategories)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {category} = useParams()

    const currentCategory = categories.find((el) => el.path === category)
    const categoryName = currentCategory?.name
    const booksInThisCategory = books.filter((book) => book.categories.find((ctgrs) => ctgrs === categoryName))

    let selectCategoryBooks: BooksType

    if (category === 'all') {
        selectCategoryBooks = books
    } else {
        selectCategoryBooks = booksInThisCategory
    }

    const getContentOrder = () => grid ? `${styles.contentGrid}` : `${styles.contentGrid} ${styles.contentRow}`
    const contentOrder = getContentOrder()

    const onClickHandler = (id:number) => {
        dispatch(resetBookAC({content: {}, error: ''}))
        navigate(`${id}`)
    }

    return (
        <div className={contentOrder}  >
            {selectCategoryBooks.map((book) => <div key={book.id} tabIndex={0} role='button' onKeyDown={() => onClickHandler(book.id)} onClick={() => onClickHandler(book.id)} data-test-id='card'>
                <Card  book={book} grid={grid}/>
            </div>)}
        </div>
    );
};

