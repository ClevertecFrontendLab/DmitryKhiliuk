import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';
import cn from 'classnames';

import dart from '../../../assets/icons/modal/Icon_Chevron.svg';
import {AUTH, MAIN} from '../../../common/routes';
import {RegistrationDataType} from '../../../common/types';
import {
    addFromStepOne,
    addFromStepThree,
    addFromStepTwo,
    RegistrationTC
} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';
import {Button} from '../../buttons';
import {Input} from '../../input';
import {Modal} from '../../modal';

import {RegistrationResult} from './registration-result';

import styles from './registration.module.scss';


export const Registration = () => {


    const dispatch = useAppDispatch()


    const [step, setStep] = useState<number>(1)


    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
        clearErrors,
        reset
    } = useForm<RegistrationDataType>({
        mode: 'all',
        reValidateMode: 'onBlur'
    });

    const onSubmit = (data:RegistrationDataType) => {
        if (step === 1) {
            dispatch(addFromStepOne(data))
            reset()
        }
        if (step === 2) {
            dispatch(addFromStepTwo(data))
            reset()
        }
        if (step === 3) {
            dispatch(addFromStepThree(data))
            dispatch(RegistrationTC(data))
            reset()
        }

        if (step < 4) {
            setStep(step+1)
        }

    }

    /* --------------------------------------------validation--------------------------------------- */

    const minLength = {value: 8, message: 'error length'}
    const regExpForUserName = {value: /^[A-Za-z0-9]+$/, message: 'error userName'}
    const regExpForPassword = {value: /^[0-9A-ZА-Я]{0,8}/, message: 'error password'}
    const regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12,14}(\s*)?$/
    const regExpForPhone = {value: regPhone, message: 'error phone'}
    const regMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    const regExpForMail = {value: regMail, message: 'Введите корректный e-mail'}
    let disable = false

    /* --------------------------------------------validation for username--------------------------------------- */

    const [userName, setUserName] = useState(true)
    const [latin, setLatin] = useState(true)
    const [numb, setNumb] = useState(true)

    let user = false

    if (userName&&latin&&numb) {
        user = true
    }

    const getValidUserName = (value:string) => {
        clearErrors()
        setUserName(/^[A-Za-z0-9]+$/.test(value))
        setLatin( /[A-Za-z]/.test(value))
        setNumb(/[0-9]/.test(value))
    }


    if (!user || errors.username || errors.password) {
        disable = true
    }
    /* --------------------------------------------validation for password--------------------------------------- */

   /*  const [pass, setPass] = useState(false) */
    const [length, setLength] = useState(true)
    const [upperCase, setUpperCase] = useState(true)
    const [numbPass, setNumbPass] = useState(true)

    let pass = false

    if (length&&upperCase&&numbPass) {
        pass = true
    }
    if (!pass) {
        disable = true
    }


    const getValidPassword = (value:string) => {
        // setPass(/^[0-9A-ZА-Я]{0,8}/.test(value))
        clearErrors()
        setLength( /.{8,}/.test(value))
        setUpperCase( /[A-ZА-Я]/.test(value))
        setNumbPass(/[0-9]/.test(value))
    }


    const getValidName = (value:string) => {}

    if (errors.firstName ) {
        disable = true
    }

    /* --------------------------------------------validation for phone--------------------------------------- */

    const [phone, setPhone] = useState(true)

    const getValidPhone = (value:string) => {
        setPhone(regPhone.test(value))
    }

    if (errors.phone ) {
        disable = true
    }

    /* --------------------------------------------validation for e-mail--------------------------------------- */

    const [mail, setMail] = useState(true)

    const getValidMail = (value:string) => {
        setMail(regMail.test(value))
        clearErrors()
    }

    if (errors.email ) {
        disable = true
    }

    const onClickButtonHandler = () => {}
    const jwt = localStorage.getItem('jwt')
    const navigate = useNavigate()

    useEffect(() => {
        if (jwt) {
            navigate(MAIN)
        }
    }, [jwt, navigate])



    return (
        <div>
            <Modal>
                    <div className={styles.main}>
                        {step===4 ?
                            <RegistrationResult setStep={setStep} />:
                            <div className={styles.content}>
                            <h3 className={styles.title}>Регистрация</h3>
                            <div className={styles.step}>
                                {step===1 && '1 шаг из 3'}
                                {step===2 && '2 шаг из 3'}
                                {step===3 && '3 шаг из 3'}
                            </div>
                            {step===1&&
                                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
                                    <Input register={register}
                                           name='username'
                                           label='Придумайте логин для входа'
                                           type='text'
                                           validation={(value) => getValidUserName(value)}
                                           errorMessage={errors.username?.message}
                                           pattern={regExpForUserName}/>
                                    {errors.username?.message !== 'Поле не может быть пустым' &&
                                    <div data-test-id='hint' className={cn(errors.username ? styles.hintUserNameError : styles.hintUserName)}>
                                        <span>Используйте для логина </span>
                                        <span className={cn(latin ? styles.hintUserName : styles.hintUserNameError)}>латинский алфавит </span>
                                        <span>и</span>
                                        <span className={cn(numb  ? styles.hintUserName : styles.hintUserNameError)}> цифры</span>
                                    </div>}
                                    <Input register={register}
                                           name='password'
                                           label='Пароль'
                                           type='password'
                                           validation={(value) => getValidPassword(value)}
                                           errorMessage={errors.password?.message}
                                           pattern={regExpForPassword}
                                           successPass={pass}
                                           minLength={minLength}/>
                                    {errors.password?.message !== 'Поле не может быть пустым' &&
                                        <div data-test-id='hint' className={cn(!length&&!upperCase&&!numbPass || errors.password ? styles.hintPasswordError : styles.hintPassword)}>
                                        Пароль <span className={cn(!length&&styles.lengthPasswordHint)}>не менее 8 символов,
                                    </span> с <span className={cn(!upperCase&&styles.upperCasePasswordHint)}>заглавной буквой</span> и
                                        <span className={cn(!numbPass&&styles.numberPasswordHint)}> цифрой</span>
                                    </div>}
                                    <div className={styles.space}/>
                                    <Button size='large' type='submit' name='Следующий шаг' callBack={onClickButtonHandler} disableButton={disable}/>
                                </form>
                            }
                            {step===2&&
                                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
                                    <Input register={register}
                                           name='firstName'
                                           label='Имя'
                                           type='text'
                                           validation={(value) => getValidName(value)}
                                           errorMessage={errors.firstName?.message}/>
                                    <Input register={register}
                                           name='lastName'
                                           label='Фамилия' type='text'
                                           validation={(value) => getValidName(value)}
                                           errorMessage={errors.lastName?.message}/>
                                    <div className={styles.space}/>
                                    <Button size='large' type='submit' name='Последний шаг' callBack={onClickButtonHandler} disableButton={disable}/>
                                </form>
                            }
                            {step===3&&
                                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
                                    <Input register={register}
                                           name='phone'
                                           label='Телефон'
                                           control={control}
                                           type='text'
                                           errorMessage={errors.phone?.message}
                                           validation={(value) => getValidPhone(value)}
                                           pattern={regExpForPhone}/>
                                    {errors.phone?.message !== 'Поле не может быть пустым' &&
                                        <div data-test-id='hint' className={cn(styles.hintPhone, !phone || errors.phone  && styles.hintPhoneError)}>В формате +375 (xx) xxx-xx-xx</div>}
                                    <Input register={register}
                                           name='email'
                                           label='E-mail'
                                           type='text'
                                           errorMessage={errors.email?.message}
                                           pattern={regExpForMail}
                                           validation={(value) => getValidMail(value)}/>
                                     {/* {errors.email?.message !== 'Поле не может быть пустым' &&
                                        <div data-test-id='hint' className={cn(styles.hintPhone, !mail || errors.email  && styles.hintPhoneError)}>Введите корректный e-mail</div>} */}
                                    <div className={styles.space}/>
                                    <Button size='large' type='submit' name='зарегистрироваться' callBack={onClickButtonHandler} disableButton={disable}/>
                                </form>
                            }
                            <div>
                                <span className={styles.registerText}>Есть учетная запись?</span>
                                <span className={styles.register}>
                            <NavLink className={styles.link} to={AUTH}>
                                <span className={styles.text}>Войти </span>
                                <span className={styles.img}><img src={dart} alt="dart"/></span>
                            </NavLink>
                        </span>
                            </div>
                        </div>}
                    </div>
            </Modal>
        </div>
    )
};


