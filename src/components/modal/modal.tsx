import {ReactNode} from 'react';
import cn from 'classnames';

import {selectStatus} from '../../common/selectors';
import {showModalAC} from '../../redux/booking-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {Loader} from '../loader';

import styles from './modal.module.scss';

type PropsType = {
    children: ReactNode
    content: 'auth' | 'booking'
}

export const Modal = ({children, content}:PropsType) => {

    const status = useAppSelector(selectStatus)
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(showModalAC(false))
    }

    return (
        <div className={cn(styles.main, content === 'booking' && styles.mainBooking)} data-test-id='auth' onClick={onClickHandler} onKeyDown={onClickHandler} tabIndex={0} role='button'>
            <div className={cn(styles.loader, status==='loading' && styles.visible)} ><Loader/></div>
            {status === 'loading' && <div className={styles.back}> </div>}
            {content === 'auth' && <h3 className={styles.text}>Cleverland</h3>}
            <div className={styles.content} onClick={e => e.stopPropagation()} onKeyDown={onClickHandler} tabIndex={0} role='button'>
                <div className={styles.children}>{children}</div>
            </div>
        </div>
    );
};

