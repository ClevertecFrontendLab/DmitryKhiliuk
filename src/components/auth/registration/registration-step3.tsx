import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';

import {AUTH, RECOVERY, REG_3} from '../../../common/routes';
import {selectDataReg} from '../../../common/selectors';
import {AuthDataType, RegistrationDataType} from '../../../common/types';
import {addFromStepThree, addFromStepTwo, LogIn, Registration} from '../../../redux/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';

import styles from '../authorization/auth.module.scss'



export const RegistrationStep3 = () => {
    const dispatch = useAppDispatch()
    const dataReg = useAppSelector(selectDataReg)

    const [reg, setReg] = useState(false)

    if (reg) {
        dispatch(Registration(dataReg))
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<RegistrationDataType>()


    const onSubmit = (data:RegistrationDataType) =>  {
            dispatch(addFromStepThree(data))
            setReg(true)
        }



    return (
        <div className={styles.main}>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div><label>Phone:<input {...register('phone')} type="text"/></label></div>
                <div><label>Email:<input {...register('email')} type="text"/></label></div>
                <div><input type="submit"/></div>
            </form>
            <br/>
            <div><NavLink to={AUTH}>Авторизация</NavLink></div>
        </div>
    );
};

