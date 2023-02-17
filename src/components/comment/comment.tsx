import user from '../../assets/avatar/user.jpg'
import {CommentType} from '../../common/types';
import {Rating} from '../rating';

import styles from './comment.module.scss'

type CommentComponentType =  {
    comment: CommentType
}

export const Comment = ({comment}: CommentComponentType) => {

    const formatDate = (date: string) => new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={styles.comment}>
            <div className={styles.userData}>
                <img src={comment.user.avatarUrl?comment.user.avatarUrl:user} alt="user" className={styles.userAva}/>
                <div className={styles.userBox}>
                    <div
                        className={styles.name}>{`${comment.user.firstName} ${comment.user.lastName}`}</div>
                    <div>{formatDate(comment.createdAt)}</div>
                </div>
            </div>
            <div className={styles.rating}>
                <Rating count={comment.rating}/>
            </div>
            <div className={styles.commentText}>
                {comment.text}
            </div>
        </div>

    )
};


