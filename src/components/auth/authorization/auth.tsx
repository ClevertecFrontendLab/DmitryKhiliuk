import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';

import dart from '../../../assets/icons/modal/Icon_Chevron.svg'
import {MAIN, RECOVERY, REG} from '../../../common/routes';
import {selectErrorStatus} from '../../../common/selectors';
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
    const error = useAppSelector(selectErrorStatus)
    const jwt = localStorage.getItem('jwt')


    useEffect(() => {
        if (jwt) {
            navigate(MAIN)
        }
    }, [jwt, navigate])




    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<AuthDataType>({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    });


    const onSubmit = (data: AuthDataType) => {
        dispatch(LogIn(data))
        reset()
    }


    const goBackToRegister = () => {
        dispatch(setErrorAC(null))
    }

    const onClickButtonHandler = () => {}
    const validLog = (value:string) => {}
    const validPass = (value:string) => {}

    return (
        <div className={styles.main} >
            <Modal>
                {error && error !== 400  ?
                    <div data-test-id='status-block' className={styles.errorContent}>
                        <h4 className={styles.title}>Вход не выполнен</h4>
                        <div className={styles.errorText}>Что-то пошло не так. Попробуйте ещё раз</div>
                        <Button size='large' name='Повторить' callBack={goBackToRegister}/>
                    </div>:
                    <div className={styles.content}>
                        <h4 className={styles.title}>Вход в личный кабинет</h4>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} data-test-id='auth-form'>
                            <Input register={register}
                                   name='identifier'
                                   label='Логин'
                                   type='text'
                                   validation={(value) => validLog(value)}
                                   errorMessage={errors.identifier?.message}/>
                            <Input register={register}
                                   name='password'
                                   label='Пароль'
                                   type='password'
                                   validation={(value) => validPass(value)}
                                   errorMessage={errors.password?.message}/>

                            <div className={styles.recovery}>
                                {error === 400 && <div className={styles.recoveryText} data-test-id='hint'>Неверный логин или пароль!</div>}
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

