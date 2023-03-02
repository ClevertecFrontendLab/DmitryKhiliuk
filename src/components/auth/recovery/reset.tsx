import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';

import {REG} from '../../../common/routes';
import {AuthDataType, RecoveryDataType, ResetDataType} from '../../../common/types';
import {LogIn} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';

import styles from '../auth.module.scss';

export const Reset = () => {
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<ResetDataType>()

    const onSubmit = (data:ResetDataType) => {
        // dispatch(LogIn(data))
        reset()
    }

    return (
        <div className={styles.main}>
            <h1>Восстановление</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email:<input {...register('email')} type="text"/></label>
                <input type="submit"/>
            </form>
            <br/>
            <div><NavLink to={REG}>Регистрация</NavLink></div>
            <br/>
        </div>
    );
};

