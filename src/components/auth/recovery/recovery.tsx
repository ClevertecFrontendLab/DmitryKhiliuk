import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';

import {REG} from '../../../common/routes';
import {AuthDataType, RecoveryDataType} from '../../../common/types';
import {LogIn} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';

import styles from '../authorization/auth.module.scss';

export const Recovery = () => {
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<RecoveryDataType>()

    const onSubmit = (data:RecoveryDataType) => {
        // dispatch(LogIn(data))
        reset()
    }

    return (
        <div className={styles.main}>
            <h1>Восстановление</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Password:<input {...register('password')} type="text"/></label>
                <label>PasswordConf:<input {...register('passwordConfirmation')} type="text"/></label>
                <input type="submit"/>
            </form>
            <br/>
            <div><NavLink to={REG}>Регистрация</NavLink></div>
            <br/>
        </div>
    );
};

