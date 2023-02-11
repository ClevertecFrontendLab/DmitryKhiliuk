import {ReactNode} from 'react';

import user from '../../assets/avatar/user.jpg'
import {RatingForBookPages} from '../rating/rating-for-book-pages';

import styles from './comment.module.scss'

type CommentType =  {
    children?: ReactNode
    userName: string
    date: string
}

export const Comment = ({children,userName,date}: CommentType) =>  (
        <div className={styles.comment}>
            <div className={styles.userData}>
                <img src={user} alt="user" className={styles.userAva}/>
                <div className={styles.userBox}>
                    <div className={styles.name}>{userName}</div>
                    <div>{date}</div>
                </div>
            </div>
            <div className={styles.rating}>
                <RatingForBookPages/>
            </div>
            <div className={styles.commentText}>
                {children}
            </div>
        </div>

    );


