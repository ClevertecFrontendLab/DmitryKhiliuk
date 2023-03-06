import {ChangeEvent, useState} from 'react';
import {UseFormRegister} from 'react-hook-form';
import cn from 'classnames';

import eyeClose from '../../assets/icons/modal/Eye-close.svg'
import eyeOpen from '../../assets/icons/modal/Eye-open.svg'
import success from '../../assets/icons/modal/Icon_Other.svg'
import {AuthDataType} from '../../common/types';

import styles from './input.module.scss'
import {useAppSelector} from "../../redux/store";
import {selectErrorStatus} from "../../common/selectors";


type InputType = {
    register:   UseFormRegister<AuthDataType>
    errorMessage?:  string
    name: 'password' | 'identifier'
    label: string
    type: string
}

export const Input = ({register, name, label, type, errorMessage}:InputType) => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    const errorStatus = useAppSelector(selectErrorStatus)

    const onClickHandler = () => {
        setOpen(!open)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
       setValue(e.currentTarget.value)
    }


    return (
        <div>
            <div className={cn(styles.main, errorMessage && styles.mainError || errorStatus && styles.mainError)}>
                <div className={styles.inputBox}>
                    <input className={styles.input} {...register(name, {required: 'Поле не может быть пустым'})} type={open ? 'text' : type}    placeholder=' ' onChange={onChangeHandler}/>
                    <label className={styles.label} htmlFor={name}>{label}</label>
                </div>
                <img className={styles.img} src={success} alt="success" style={{opacity: 0}}/>
                {name === 'password' && value && <button onClick={onClickHandler} type='button'><img className={styles.img}
                                                                                                     src={open ? eyeOpen : eyeClose}
                                                                                                     alt="eye"/></button>}
            </div>
            <div className={styles.errorMessage}>{errorMessage}</div>
        </div>
    );
};

