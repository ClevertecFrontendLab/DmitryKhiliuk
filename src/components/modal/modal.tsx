import {ReactNode} from 'react';
import cn from 'classnames';

import {selectStatus} from '../../common/selectors';
import {useAppSelector} from '../../redux/store';
import {Loader} from '../loader';

import styles from './modal.module.scss';

type PropsType = {
    children: ReactNode
}

export const Modal = ({children}:PropsType) => {

    const status = useAppSelector(selectStatus)

    return (
        <div className={styles.main} data-test-id='auth'>
            <div className={cn(styles.loader, status==='loading' && styles.visible)} ><Loader/></div>
            {status === 'loading' && <div className={styles.back}> </div>}
            <h3 className={styles.text}>Cleverland</h3>
            <div className={styles.content}>
                <div className={styles.children}>{children}</div>
            </div>
        </div>
    );
};

