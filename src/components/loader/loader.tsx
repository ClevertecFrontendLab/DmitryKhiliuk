import styles from './loader.module.scss'

export const Loader = () => (
        <div className={styles.ring} data-test-id='loader'>
            <div> </div>
            <div> </div>
            <div> </div>
            <div> </div>
        </div>
    );

