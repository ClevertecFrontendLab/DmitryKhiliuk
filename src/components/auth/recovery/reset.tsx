import {useState} from 'react';
import {useForm} from 'react-hook-form';
import cn from 'classnames';

import {selectConfirmedStatus} from '../../../common/selectors';
import {RecoveryDataType} from '../../../common/types';
import {ResetPasswordTC} from '../../../redux/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {Button} from '../../buttons';
import {Input} from '../../input';

import {ResetResult} from './reset-result';

import styles from './reset.module.scss';

type ResetPropsType = {
    code: string
}

export const Reset = ({code}: ResetPropsType) => {
    const dispatch = useAppDispatch()
    const confirmed = useAppSelector(selectConfirmedStatus)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<RecoveryDataType>({
        mode: 'onBlur',
    });

    const onSubmit = (dataPass: RecoveryDataType) => {
        dispatch(ResetPasswordTC(dataPass))
        reset()
    }

    /* --------------------------------------------validation for password--------------------------------------- */

    const minLength = {value: 8, message: 'error length'}
    const regExpForPassword = {value: /^[0-9A-ZА-Я]{0,8}/, message: 'error password'}

    /*  const [pass, setPass] = useState(false) */
    const [length, setLength] = useState(true)
    const [upperCase, setUpperCas] = useState(true)
    const [numbPass, setNumbPass] = useState(true)



    const [valueNewPass, setValueNewPass] = useState('')
    const [valueConfPass, setValueConfPass] = useState('')


    const getValidPassword = (value:string) => {
        // console.log(value)
        // setPass(/^[0-9A-ZА-Я]{0,8}/.test(value))
        setLength( /.{8,}/.test(value))
        setUpperCas( /[A-ZА-Я]/.test(value))
        setNumbPass(/[0-9]/.test(value))

        return setValueNewPass(value)
    }

    const getValidPasswordConfirmation = (value:string) => setValueConfPass(value)

    let pass = false

    if (length&&upperCase&&numbPass) {
        pass = true
    }
    let match = true
    let flagForError = ''
    let disable = false

    if (valueConfPass &&  valueNewPass !== valueConfPass) {
        match = false
        flagForError = 'error'
        disable = true
    }


    const onClickButtonHandler = () => {}

    return (
        <div>
            {confirmed ? <ResetResult/>:
            <div className={styles.main}>
                <div className={styles.content}>
                    <h4 className={styles.title}>Восстановление пароля</h4>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <Input register={register}
                               name='password'
                               label='Новый пароль'
                               type='password'
                               validation={(value) => getValidPassword(value)}
                               errorFlag={errors.password?.message}
                               pattern={regExpForPassword}
                               successPass={pass}
                               minLength={minLength}/>
                        <div
                            className={cn(!length && !upperCase && !numbPass || errors.password ? styles.hintPasswordError : styles.hintPassword)}>
                            Пароль <span className={cn(!length && styles.lengthPasswordHint)}>не менее 8 символов,
                                    </span> с <span
                            className={cn(!upperCase && styles.upperCasePasswordHint)}>заглавной буквой</span> и
                            <span className={cn(!numbPass && styles.numberPasswordHint)}> цифрой</span>
                        </div>
                        <Input register={register}
                               name='passwordConfirmation'
                               label='Повторите пароль'
                               type='password'
                               validation={(value) => getValidPasswordConfirmation(value)}
                               errorFlag={flagForError}
                               pattern={regExpForPassword}
                               minLength={minLength}/>
                        <div className={cn(styles.passError, !match && styles.visible)}>Пароли не совпадают</div>
                        <input type="hidden" defaultValue={code} name='code' />
                        <div className={styles.space}/>
                        <Button size='large' type='submit' name='Сохранить изменения'
                                callBack={onClickButtonHandler} disableButton={disable}/>
                    </form>
                    <div className={styles.resetText}>После сохранения войдите в библиотеку, используя новый пароль</div>
                </div>
            </div>}
        </div>
    );
};

