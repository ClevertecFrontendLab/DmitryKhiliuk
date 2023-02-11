
import emptyStar from '../../assets/icons/emptyStar.svg'
import star from '../../assets/icons/star.svg'

import styles from './rating.module.scss'

type RatingType = {
    count: number
}

export const Rating = ({count}: RatingType) => {

    const getRating = () => {
        const rat = []

        for (let i = 1; i <= 5; i++) {
            if (i <= count) {
                rat.push({id:i, img: star})
            } else {
                rat.push({id:i, img: emptyStar})
            }
        }

        return rat
    }
    const rating = getRating()

    return (
        <div className={styles.rating}>
            {count ?
                rating.map((el) => <div key={el.id}><img src={el.img} alt='star' className={styles.star}/></div>):
                <div className={styles.text}>ещё нет оценок</div>
            }
        </div>
    );
};

