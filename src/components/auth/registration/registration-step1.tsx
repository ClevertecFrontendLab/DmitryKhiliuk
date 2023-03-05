import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';

import {AUTH, REG_2} from '../../../common/routes';
import {RegistrationDataType} from '../../../common/types';
import {addFromStepOne} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';

import styles from '../authorization/auth.module.scss'


export const RegistrationStep1 = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()



    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<RegistrationDataType>()

    const onSubmit = (data:RegistrationDataType) => {
        dispatch(addFromStepOne(data))
        navigate(REG_2)

    }

    return (
        <div className={styles.main}>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div><label>Login:<input {...register('username')} type="text"/></label></div>
                <div><label>Password:<input {...register('password')} type="text"/></label></div>
                <div><input type="submit"/></div>
            </form>
            <br/>
            <div><NavLink to={AUTH}>Авторизация</NavLink></div>
        </div>
    );
};

