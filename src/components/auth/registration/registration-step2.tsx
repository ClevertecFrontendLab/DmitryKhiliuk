import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';

import {AUTH, RECOVERY, REG_2, REG_3} from '../../../common/routes';
import {AuthDataType, RegistrationDataType} from '../../../common/types';
import {addFromStepTwo, LogIn} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';

import styles from '../authorization/auth.module.scss'

export const RegistrationStep2 = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<RegistrationDataType>()

    const onSubmit = (data:RegistrationDataType) => {
        dispatch(addFromStepTwo(data))
        navigate(REG_3)

    }

    return (
        <div className={styles.main}>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div><label>FirstName:<input {...register('firstName')} type="text"/></label></div>
                <div><label>LastName:<input {...register('lastName')} type="text"/></label></div>
                <div><input type="submit"/></div>
            </form>
            <br/>
            <div><NavLink to={AUTH}>Авторизация</NavLink></div>
        </div>
    );
};

