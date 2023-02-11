
import emptyStar from '../../assets/icons/emptyStar.svg';
import star from '../../assets/icons/star.svg';

import styles from './rating-for-book-pages.module.scss'

export const RatingForBookPages = () =>  (
        <div className={styles.stars}>
            <img src={star} alt="star"/>
            <img src={star} alt="star"/>
            <img src={star} alt="star"/>
            <img src={star} alt="star"/>
            <img src={emptyStar} alt="star"/>
        </div>
    );


