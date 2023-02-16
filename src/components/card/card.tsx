import React from 'react';

import cat from '../../assets/icons/cat-crd.svg'
import {BookType} from '../../common/types';
import {Button} from '../buttons';
import {Rating} from '../rating';

import styles from './card.module.scss'

export type BookBlockType = BookType
export type BookComponentType = {
    book : BookBlockType
    grid: boolean
}



export const Card = ({book: {issueYear, rating, title, authors, image, id, booking, delivery}, grid}: BookComponentType) => {
    let bookStatus: string

    if (booking) {
        bookStatus = 'reserved'
    }else if (delivery) {
        bookStatus = 'taken'
    } else {
        bookStatus = 'free'
    }

    return (
        <div>
            {grid ?
                <div className={styles.bookBlockGrid}>
                    <div className={styles.image}>
                        <div><img src={image ? (`https://strapi.cleverland.by${ image.url}`) : cat}
                                  alt="img"/></div>
                    </div>
                    <div className={styles.subBlock}>
                        <div className={styles.ratingBook}>
                            <Rating count={rating}/>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.title}><span>{title}</span></div>
                            <div>
                                <div className={styles.author}>{`${authors}, ${issueYear}`}</div>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <Button status={bookStatus} size="small"/>
                        </div>
                    </div>
                </div> :
                <div className={styles.bookBlockRow}>
                    <div className={styles.imageRow}>
                        <div><img src={image ? (`https://strapi.cleverland.by${ image.url}`):cat} alt="img"/></div>
                    </div>
                    <div className={styles.subBlockRow}>
                        <div className={styles.descriptionRow}>
                            <div className={styles.titleRow}><span>{title}</span></div>
                            <div className={styles.authorRow}>{`${authors}, ${issueYear}`}</div>
                        </div>
                        <div className={styles.actionRow}>
                            <div className={styles.ratingBookRow}>
                                <Rating count={rating}/>
                            </div>
                            <div className={styles.buttonRow}>
                                <Button status='free' size="small" date={delivery?.dateHandedTo}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

