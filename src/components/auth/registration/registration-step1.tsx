import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useOutletContext} from 'react-router-dom';

import {AUTH, RECOVERY} from '../../../common/routes';
import {AuthDataType, RegistrationDataType} from '../../../common/types';
import {LogIn} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';

import styles from '../auth.module.scss'




export const RegistrationStep1 = () => {
    const dispatch = useAppDispatch()




    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<RegistrationDataType>()

    const onSubmit = (data:RegistrationDataType) => {
        // setRegData(data)
        reset()

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

