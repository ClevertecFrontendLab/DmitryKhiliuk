import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, redirect, useNavigate} from 'react-router-dom';

import {AUTH, MAIN, RECOVERY, REG} from '../../../common/routes';
import {selectIsLoggedIn, selectStatus} from '../../../common/selectors';
import {AuthDataType} from '../../../common/types';
import {isLoggedInAC, LogIn} from '../../../redux/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';

import styles from '../auth.module.scss'

export const Auth = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const log = useAppSelector(selectIsLoggedIn)

    const jwt = localStorage.getItem('jwt')



     useEffect(() => {



    }, [navigate, log])

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<AuthDataType>()

    const onSubmit = async (data: AuthDataType) => {
        try {
            const response = await dispatch(LogIn(data))

            localStorage.setItem('jwt', response.payload.jwt)
            if (response.payload.jwt) {
                navigate(MAIN)
            }

        } catch (error) {
            console.log(error)
        }
        return data
    }

    const onSubmitt = (data: AuthDataType) => {
        dispatch(LogIn(data))
        navigate(MAIN)
        reset()
    }




    return (
        <div className={styles.main}>
            <h1>Авторизация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Login:<input {...register('identifier')} type="text"/></label>
                <label>Password:<input {...register('password')} type="text"/></label>
                <input type="submit"/>
            </form>
            <br/>
            <div><NavLink to={REG}>Регистрация</NavLink></div>
            <br/>
            <div><NavLink to={RECOVERY}>Восстановление</NavLink></div>
        </div>
    );
};

