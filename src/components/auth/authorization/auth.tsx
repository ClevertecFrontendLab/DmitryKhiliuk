import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';

import {MAIN, RECOVERY, REG} from '../../../common/routes';
import {selectErrorStatus, selectIsLoggedIn} from '../../../common/selectors';
import {AuthDataType} from '../../../common/types';
import {LogIn, setErrorAC} from '../../../redux/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {Input} from '../../input';
import {Modal} from '../../modal';
import dart from '../../../assets/icons/modal/Icon_Chevron.svg'

import styles from './auth.module.scss'
import {Button} from "../../buttons";

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
    } = useForm<AuthDataType>()

    const onSubmit = async (data: AuthDataType) => {
        try {
            const response = await dispatch(LogIn(data))

            console.log(data)
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

    const goBackToRegister = () => {
        dispatch(setErrorAC(null))
    }


    return (
        <div className={styles.main}>
            <Modal>
                {error && {/* error !== 400 */} ?
                    <div className={styles.errorContent}>
                        <h4 className={styles.title}>Вход не выполнен</h4>
                        <div className={styles.errorText}>Что-то пошло не так. Попробуйте ещё раз</div>
                        <Button size='large' name='Повторить' callBack={goBackToRegister}/>
                    </div>:
                    <div className={styles.content}>
                        <h4 className={styles.title}>Вход в личный кабинет</h4>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <Input register={register} name='identifier' label='Логин' type='text'/>
                            <Input register={register} name='password' label='Пароль'
                                   type='password'/>
                            <div className={styles.recovery}><NavLink to={RECOVERY}>Забыли логин или
                                пароль?</NavLink></div>
                            <Button size='large' type='submit' name='Вход'/>
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

