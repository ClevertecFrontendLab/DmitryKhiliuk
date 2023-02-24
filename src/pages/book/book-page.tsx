import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import empty from '../../assets/icons/cat.svg'
import comClose from '../../assets/icons/comment_close.svg'
import comOpen from '../../assets/icons/comment_open.svg'
import {selectBook, selectCategories, selectStatus} from '../../common/selectors';
import {Button} from '../../components/buttons';
import {Comment} from '../../components/comment';
import {Rating} from '../../components/rating';
import {MobileSlider, Slider} from '../../components/slider';
import {Table} from '../../components/table';
import {fetchBook} from '../../redux/book-reducer';
import {fetchCategories} from '../../redux/nav-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';

import styles from './book-page.module.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

export type DataBookType = { [key: string]: string | string[] }

export const BookPage = () => {


    const {id, category} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const bookId = +id!

    const book = useAppSelector(selectBook)
    const status = useAppSelector(selectStatus)
    const categories = useAppSelector(selectCategories)

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchBook({bookId}))
    }, [dispatch, bookId])


    const [commentOpen, setCommentOpen] = useState(true)

    const onClickHandler = () => {
        setCommentOpen(!commentOpen)
    }


    const dataBook: DataBookType = {
        'Издательство': book.publish,
        'Год издания': book.issueYear,
        'Страниц': book.pages,
        'Переплёт': book.cover,
        'Формат': book.format,
        'Жанр': book.categories,
        'Вес': book.weight,
        'ISBN': book.ISBN,
        'Изготовитель': book.producer
    }


    const keysForLeftTable = Object.keys(dataBook).splice(0, 5)
    const keysForRightTable = Object.keys(dataBook).splice(5, 8)

    let bookStatus: string

    if (book.booking) {
        bookStatus = 'reserved'
    } else if (book.delivery) {
        bookStatus = 'taken'
    } else {
        bookStatus = 'free'
    }

    const onClickHandlerForCrumbs = () => {
       navigate(-1)
    }

    const categoryForCrumbs = categories.find(el => el.path === category)?.name

    return (
        <section className={styles.bookPage}>
            <div className={styles.container}>
                {status !== 'loading' &&
                    <div className={styles.breadCrumbs}>
                        <button type='button' data-test-id='breadcrumbs-link'
                                onClick={onClickHandlerForCrumbs}>
                            {categoryForCrumbs?categoryForCrumbs:'Все книги'}
                        </button>
                        <span> / </span>
                        <span data-test-id='book-name'>{Object.keys(book).length > 0 && book!.title}</span>
                    </div>
                }
                {Object.keys(book).length > 0 && <React.Fragment>
                    <div className={styles.mainBlock}>
                        <div className={styles.img}>
                            {book.images ?
                                <div className={styles.slider}>{window.innerWidth > 824 ?
                                    <Slider/> : <MobileSlider/>}</div> :
                                <div className={styles.empty}><img src={empty} alt="cat"/></div>}
                        </div>
                        <div className={styles.description}>
                            <h3 className={styles.title} data-test-id='book-title'>
                                {book.title}
                            </h3>
                            <h5 className={styles.author}>
                                {book.authors && book.authors.reduce((acc: string, number) => acc + number, '')}{`, ${book.issueYear}`}
                            </h5>
                            <div className={styles.button}>
                                <Button status={bookStatus} size='large'/>
                            </div>
                        </div>
                        <div className={styles.annotation}>
                            <h5 className={styles.title}>О книге</h5>
                            <div className={styles.text}>
                                {book.description}
                            </div>
                        </div>
                    </div>
                    <div className={styles.rating}>
                        <h5 className={styles.title}>Рейтинг</h5>
                        <div className={styles.visibleRating}>
                            <div className={styles.stars}><Rating count={book.rating}/></div>
                            <h5 className={styles.total}>
                                {book.rating}
                            </h5>
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <h5 className={styles.title}>Подробная информация</h5>
                        <div className={styles.table}>
                            <div className={styles.tableLeft}><Table data={dataBook}
                                                                     keys={keysForLeftTable}/></div>
                            <div className={styles.tableRight}><Table data={dataBook}
                                                                      keys={keysForRightTable}/>
                            </div>
                        </div>

                    </div>
                    <div className={styles.comments}>
                        <div className={styles.commentsTitleBlock}>
                            <h5 className={styles.title}>Отзывы</h5>
                            <div className={styles.count}>{book.comments?.length || 0}</div>
                            <button type='button' onClick={onClickHandler} className={styles.btn}
                                    data-test-id='button-hide-reviews'><img
                                src={commentOpen ? comOpen : comClose} alt="open"/></button>
                        </div>
                        {commentOpen && <div>
                            {book.comments?.map((el) => <Comment key={el.id} comment={el}/>)}
                        </div>}
                    </div>
                    <div className={`${styles.button} ${styles.buttonGrade}`}>
                        <Button name="оценить книгу" size='large'/>
                    </div>
                </React.Fragment>}

            </div>

        </section>
    );
}
