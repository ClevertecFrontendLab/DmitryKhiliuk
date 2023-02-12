
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import empty from '../../assets/icons/cat.svg'
import comClose from '../../assets/icons/comment_close.svg'
import comOpen from '../../assets/icons/comment_open.svg'
import {Button} from '../../components/buttons';
import {Comment} from '../../components/comment';
import {RatingForBookPages} from '../../components/rating/rating-for-book-pages';
import {MobileSlider, Slider} from '../../components/slider';
import {Table} from '../../components/table';
import {useAppDispatch, useAppSelector} from '../../redux/store';

import styles from './book-page.module.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import {fetchBook} from "../../redux/book-reducer";
import {selectBook, selectStatus} from "../../common/selectors";
import {Loader} from "../../components/loader";


const dataBook: any = {
    'Издательство': 'Питер',
    'Год издания': '2019',
    'Страниц': '288',
    'Переплёт': 'Мягкая обложка',
    'Формат': '70х100',
    'Жанр': 'Компьютерная литература',
    'Вес': '370 г',
    'ISBN': '978-5-4461-0923-4',
    'Изготовитель': 'ООО«Питер Мейл». РФ, 198206, г.Санкт-Петербург, Петергофское ш, д.73, лит. А29'
}


const keysForLeftTable = Object.keys(dataBook).splice(0, 5)
const keysForRightTable = Object.keys(dataBook).splice(5, 8)


export const BookPage = () => {

    const {id} = useParams()
    const dispatch = useAppDispatch()

    const bookId = +id!

    useEffect(()  => {

        dispatch(fetchBook({bookId}))
    }, [dispatch, bookId])

    const book = useAppSelector(selectBook)
    const status = useAppSelector(selectStatus)

    const [commentOpen, setCommentOpen] = useState(true)

    const onClickHandler = () => {
        setCommentOpen(!commentOpen)
    }


    return (
        <section className={styles.bookPage}>
            <div className={styles.container}>
                <div className={styles.breadCrumbs}>
                    Бизнес книги /
                    Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
                </div>
                <div className={styles.mainBlock}>
                    <div className={styles.img}>
                        {book.images?<div className={styles.slider}>{book&&book.images.length>3 && window.innerWidth>824 ? <Slider book={book}/> : <MobileSlider book={book}/>}</div>:
                            <div className={styles.empty}><img src={empty} alt="cat"/></div>}
                    </div>
                    <div className={styles.description}>
                        <h3 className={styles.title}>
                            Грокаем алгоритмы. Иллюстрированное пособие для программистов и
                            любопытствующих
                        </h3>
                        <h5 className={styles.author}>
                            Адитья Бхаргава, 2019
                        </h5>
                        <div className={styles.button}>
                            <Button status="free" size='large'/>
                        </div>
                    </div>
                    <div className={styles.annotation}>
                        <h5 className={styles.title}>О книге</h5>
                        <div className={styles.text}>
                            <p>
                                Алгоритмы — это всего лишь пошаговые
                                алгоритмы решения задач, и большинство таких задач уже были кем-то
                                решены, протестированы и проверены. Можно, конечно, погрузится в
                                глубокую философию гениального Кнута, изучить многостраничные
                                фолианты с
                                доказательствами и обоснованиями, но хотите ли вы тратить на это
                                свое
                                время?
                            </p>
                            <p>
                                Откройте великолепно иллюстрированную книгу и вы сразу поймете, что
                                алгоритмы — это просто. А грокать алгоритмы — это веселое и
                                увлекательное занятие.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.rating}>
                    <h5 className={styles.title}>Рейтинг</h5>
                    <div className={styles.visibleRating}>
                        <div className={styles.stars}><RatingForBookPages/></div>
                        <h5 className={styles.total}>
                            4.3
                        </h5>
                    </div>
                </div>
                <div className={styles.detail}>
                    <h5 className={styles.title}>Подробная информация</h5>
                    <div className={styles.table}>
                        <div className={styles.tableLeft}><Table data={dataBook}
                                                                 keys={keysForLeftTable}/></div>
                        <div className={styles.tableRight}><Table data={dataBook}
                                                                  keys={keysForRightTable}/></div>
                    </div>

                </div>
                <div className={styles.comments}>
                    <div className={styles.commentsTitleBlock}>
                        <h5 className={styles.title}>Отзывы</h5>
                        <div className={styles.count}>3</div>
                        <button type='button' onClick={onClickHandler} className={styles.btn} data-test-id='button-hide-reviews'><img src={commentOpen?comOpen:comClose} alt="open"/></button>
                    </div>
                    {commentOpen && <div>
                        <Comment userName="Иван Иванов" date="5 января 2019"/>
                        <Comment userName="Николай Качков" date="20 июня 2018">
                            <div>Учитывая ключевые сценарии поведения, курс на
                                социально-ориентированный
                                национальный проект не оставляет шанса для анализа существующих
                                паттернов поведения. Для современного мира внедрение современных
                                методик
                                предоставляет широкие возможности для позиций, занимаемых
                                участниками в
                                отношении поставленных задач. Как уже неоднократно упомянуто,
                                сделанные
                                на базе интернет-аналитики выводы будут в равной степени
                                предоставлены
                                сами себе. Вот вам яркий пример современных тенденций — глубокий
                                уровень
                                погружения создаёт предпосылки для своевременного выполнения
                                сверхзадачи. И нет сомнений, что акционеры крупнейших компаний,
                                инициированные исключительно синтетически, превращены в посмешище,
                                хотя
                                само их существование приносит несомненную пользу обществу.
                            </div>
                        </Comment>
                        <Comment userName="Екатерина Беляева" date="18 февраля 2018"/>
                    </div>}


                </div>
                <div className={`${styles.button} ${styles.buttonGrade}`}>
                    <Button name="оценить книгу" size='large'/>
                </div>

            </div>

        </section>
    );
}
