import {ReactNode} from 'react';

import styles from './modal.module.scss';

type PropsType = {
    children: ReactNode
}

export const Modal = ({children}:PropsType) => {

    const x = () => {

    }

    return (
        <div className={styles.main}>
            <h3 className={styles.text}>Cleverland</h3>
            <div className={styles.content}>
                <div className={styles.children}>{children}</div>
            </div>
        </div>
    );
};

