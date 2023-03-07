import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';

import cn from 'classnames';
import dart from '../../../assets/icons/modal/Icon_Chevron.svg';
import {AUTH} from '../../../common/routes';
import {RegistrationDataType} from '../../../common/types';
import {addFromStepOne, addFromStepThree, addFromStepTwo} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';
import {Button} from '../../buttons';
import {Input} from '../../input';
import {Modal} from '../../modal';

import styles from './registration.module.scss';




export const Registration = () => {


    const dispatch = useAppDispatch()


    const [step, setStep] = useState<number>(1)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<RegistrationDataType>({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    });

    const onSubmit = (data:RegistrationDataType) => {
        if (step === 1) {
            dispatch(addFromStepOne(data))
        }
        if (step === 2) {
            dispatch(addFromStepTwo(data))
        }
        if (step === 3) {
            dispatch(addFromStepThree(data))
        }

        if (step < 3) {
            setStep(step+1)
        }
        // navigate(REG_2)

    }

    /* --------------------------------------------validation--------------------------------------- */

    const minLength = {value: 8, message: 'error length'}
    const regExpForUserName = {value: /^[A-Za-z0-9]+$/, message: 'error userName'}
    const regExpForPassword = {value: /^[0-9A-ZА-Я]{0,8}/, message: 'error password'}


    /* --------------------------------------------validation for username--------------------------------------- */

    const [userName, setUserName] = useState(true)
    const [latin, setLatin] = useState(true)
    const [numb, setNumb] = useState(true)


    const getValidUserName = (value:string) => {
        setUserName(/^[A-Za-z0-9]+$/.test(value))
        setLatin( /[A-Za-z]/.test(value))
        setNumb(/[0-9]/.test(value))
    }

    /* --------------------------------------------validation for password--------------------------------------- */

    const [pass, setPass] = useState(true)
    const [length, setLength] = useState(true)
    const [upperCase, setUpperCas] = useState(true)
    const [numbPass, setNumbPass] = useState(true)

    const getValidPassword = (value:string) => {
        setPass(/^[0-9A-ZА-Я]{0,8}/.test(value))
        setLength( /.{8,}/.test(value))
        setUpperCas( /[A-ZА-Я]/.test(value))
        setNumbPass(/[0-9]/.test(value))
    }


    const getValidName = (value:string) => {

    }


    return (
        <div>
            <Modal>
                <div className={styles.main}>
                    <div className={styles.content}>
                        <h3 className={styles.title}>Регистрация</h3>
                        <div className={styles.step}>
                            {step===1 && '1 шаг из 3'}
                            {step===2 && '2 шаг из 3'}
                            {step===3 && '3 шаг из 3'}
                        </div>
                        {step===1&&
                            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                                <Input register={register}
                                       name='username'
                                       label='Придумайте логин для входа'
                                       type='text'
                                       validation={(value) => getValidUserName(value)}
                                       errorFlag={errors.username?.message}
                                       pattern={regExpForUserName}/>
                                <div className={cn(!latin&&!numb || errors.username ? styles.hintUserNameError : styles.hintUserName)}>
                                    Используйте для логина
                                    <span className={cn(!latin&&userName&&styles.latinUserNameHint)}> латинский алфавит</span> и
                                    <span className={cn(!numb&&userName&&styles.numberUserNameHint)}> цифры</span>
                                </div>
                                <Input register={register}
                                       name='password'
                                       label='Пароль'
                                       type='password'
                                       validation={(value) => getValidPassword(value)}
                                       errorFlag={errors.password?.message}
                                       pattern={regExpForPassword}
                                       minLength={minLength}/>
                                <div className={cn(!length&&!upperCase&&!numbPass || errors.password ? styles.hintPasswordError : styles.hintPassword)}>
                                    Пароль <span className={cn(!length&&pass&&styles.lengthPasswordHint)}>не менее 8 символов,
                                    </span> с <span className={cn(!upperCase&&pass&&styles.upperCasePasswordHint)}>заглавной буквой</span> и
                                    <span className={cn(!numbPass&&pass&&styles.numberPasswordHint)}> цифрой</span>
                                </div>
                                <div className={styles.space}/>
                                <Button size='large' type='submit' name='Следующий шаг'/>
                            </form>
                        }
                        {step===2&&
                            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                                <Button size='large' type='submit' name='Последний шаг'/>
                            </form>
                        }
                        {step===3&&
                            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                                <Input register={register} name='phone' label='Телефон' type='text' errorMessage={errors.phone?.message}/>
                                <Input register={register} name='email' label='E-mail' type='text' errorMessage={errors.email?.message}/>
                                <div className={styles.space}/>
                                <Button size='large' type='submit' name='Регистрация'/>
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
                    </div>
                </div>
            </Modal>
        </div>
    )
};


