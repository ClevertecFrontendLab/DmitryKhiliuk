import close from '../../assets/icons/snackbar-icon/Icon_Action.svg'
import warning from '../../assets/icons/snackbar-icon/WarningCircle.svg'
import {setAppStatusAC} from '../../redux/app-reducer';
import {useAppDispatch} from '../../redux/store';

import styles from './error.module.scss'

export const Error = () => {

    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(setAppStatusAC({status:'idle', error: null}))
    }

    return (
        <div className={styles.error} data-test-id='error'>
            <div className={styles.icon}><img src={warning} alt="warning"/></div>
            <div className={styles.text}>Что-то пошло не так. Обновите страницу через некоторое время.</div>
            <button type='button' onClick={onClickHandler}><img className={styles.icon} src={close} alt="close"/></button>
        </div>
    );
};

