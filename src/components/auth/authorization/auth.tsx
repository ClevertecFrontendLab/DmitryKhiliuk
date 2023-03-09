import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';

import dart from '../../../assets/icons/modal/Icon_Chevron.svg'
import {MAIN, RECOVERY, REG} from '../../../common/routes';
import {selectErrorStatus, selectIsLoggedIn} from '../../../common/selectors';
import {AuthDataType} from '../../../common/types';
import {LogIn, setErrorAC} from '../../../redux/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {Button} from '../../buttons';
import {Input} from '../../input';
import {Modal} from '../../modal';

import styles from './auth.module.scss'

export const Auth = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const log = useAppSelector(selectIsLoggedIn)
    const error = useAppSelector(selectErrorStatus)

    const jwt = localStorage.getItem('jwt')


    useEffect(() => {


    }, [navigate, log])

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<AuthDataType>({
        mode: 'onBlur'
    });


    /* const onSubmit = async (data: AuthDataType) => {
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
    } */

   /* const onSubmit = (data: AuthDataType) => {
        dispatch(LogIn(data))
        navigate(MAIN)
        reset()
    } */

    const onSubmit = (data: AuthDataType) => {
        console.log(data)

        dispatch(LogIn(data))
        navigate(MAIN)
    }



    const goBackToRegister = () => {
        dispatch(setErrorAC(null))
    }

    const onClickButtonHandler = () => {}
    const validAuth = (value:string) => {}

    return (
        <div className={styles.main}>
            <Modal>
                {error && error !== 400  ?
                    <div className={styles.errorContent}>
                        <h4 className={styles.title}>Вход не выполнен</h4>
                        <div className={styles.errorText}>Что-то пошло не так. Попробуйте ещё раз</div>
                        <Button size='large' name='Повторить' callBack={goBackToRegister}/>
                    </div>:
                    <div className={styles.content}>
                        <h4 className={styles.title}>Вход в личный кабинет</h4>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <Input register={register}
                                   name='identifier'
                                   label='Логин'
                                   type='text'
                                   validation={(value) => validAuth(value)}
                                   errorMessage={errors.identifier?.message}/>
                            <Input register={register}
                                   name='password'
                                   label='Пароль'
                                   type='password'
                                   validation={(value) => validAuth(value)}
                                   errorMessage={errors.password?.message}/>

                            <div className={styles.recovery}>
                                {error === 400 && <div className={styles.recoveryText}>Неправильный логин или пароль!</div>}
                                <NavLink to={RECOVERY}>{error === 400 ? 'Восстановить?': 'Забыли логин или пароль?'}</NavLink>
                            </div>
                            <Button size='large' type='submit' name='Вход' callBack={onClickButtonHandler}/>
                        </form>
                        <div>
                            <span className={styles.registerText}>Нет учетной записи?</span>
                            <span className={styles.register}>
                            <NavLink className={styles.link} to={REG}>
                                <span className={styles.text}>Регистрация </span>
                                <span className={styles.img}><img src={dart} alt="dart"/></span>
                            </NavLink>
                        </span>
                        </div>
                    </div>}
            </Modal>
        </div>
    );
};

