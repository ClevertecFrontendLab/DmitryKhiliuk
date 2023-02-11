import React from 'react';

import cat from '../../assets/icons/cat-crd.svg'
import {Button} from '../buttons';
import {Rating} from '../rating';

import styles from './card.module.scss'

export type BookBlockType = {
    id: number,
    image: any,
    title: string,
    author: string,
    year: string,
    rating: number
    status: string
}
export type BookType = {
    book : BookBlockType
    grid: boolean
}


export const Card = ({book: {image, title, author, year, rating, status}, grid}: BookType) => (
        <div>
            {grid ?
                <div className={styles.bookBlockGrid}>
                    <div className={styles.image}>
                            <div><img src={image[0]?image[0]:cat} alt="img"/></div>
                    </div>
                    <div className={styles.subBlock}>
                        <div className={styles.ratingBook}>
                            <Rating count={rating}/>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.title}><span>{title}</span></div>
                            <div>
                                <div className={styles.author}>{`${author}, ${year}`}</div>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <Button status={status} size="small"/>
                        </div>
                    </div>
                </div> :
                <div className={styles.bookBlockRow}>
                    <div className={styles.imageRow}>
                        <div><img src={image[0]?image[0]:cat} alt="img"/></div>
                    </div>
                    <div className={styles.subBlockRow}>
                        <div className={styles.descriptionRow}>
                            <div className={styles.titleRow}><span>{title}</span></div>
                            <div className={styles.authorRow}>{`${author}, ${year}`}</div>
                        </div>
                        <div className={styles.actionRow}>
                            <div className={styles.ratingBookRow}>
                                <Rating count={rating}/>
                            </div>
                            <div className={styles.buttonRow}>
                                <Button status={status} size="small"/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )

