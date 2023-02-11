import {useNavigate} from 'react-router-dom';

import {Card} from '../../../../components/card';
import {useAppSelector} from '../../../../redux/store';

import styles from './main-content.module.scss'

type MainContentType = {
    grid: boolean
}

export const MainContent = ({grid}: MainContentType) => {

    const books = useAppSelector(state => state.books)

    const navigate = useNavigate()

    const getContentOrder = () => grid ? `${styles.contentGrid}` : `${styles.contentGrid} ${styles.contentRow}`
    const contentOrder = getContentOrder()

    const onClickHandler = (id:number) => {
        navigate(`/book/${id}`)
    }

    return (
        <div className={contentOrder}  >
            {books.map((book) => <div key={book.id} tabIndex={0} role='button' onKeyDown={() => onClickHandler(book.id)} onClick={() => onClickHandler(book.id)} data-test-id='card'>
                <Card  book={book} grid={grid}
                />
            </div>)}
        </div>
    );
};

