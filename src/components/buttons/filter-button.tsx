
import filterUnActive from '../../assets/icons/filter/filter-unactive.svg'

import styles from './filter-button.module.scss'

export const FilterButton = () =>  (

        <button type="button" className={styles.filter}>
            <img src={filterUnActive} alt="filter"/>
            <div className={styles.text}>По рейтингу</div>
        </button>

    );


