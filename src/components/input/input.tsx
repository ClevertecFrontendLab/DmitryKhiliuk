import {ChangeEvent, useState} from 'react';
import {UseFormRegister} from 'react-hook-form';

import eyeClose from '../../assets/icons/modal/Eye-close.svg'
import eyeOpen from '../../assets/icons/modal/Eye-open.svg'
import success from '../../assets/icons/modal/Icon_Other.svg'
import {AuthDataType} from '../../common/types';

import styles from './input.module.scss'


type InputType = {
    register:   UseFormRegister<AuthDataType>
    name: 'password' | 'identifier'
    label: string
    type: string
}

export const Input = ({register, name, label, type}:InputType) => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    const onClickHandler = () => {
        setOpen(!open)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
       setValue(e.currentTarget.value)
    }



    return (
        <div className={styles.main}>
            <div className={styles.inputBox}>
                <input className={styles.input} {...register(name)} type={open ? 'text' : type} required={true}  placeholder='' onChange={onChangeHandler}/>
                <label className={styles.label} htmlFor={name}>{label}</label>
            </div>
            <img className={styles.img} src={success} alt="success" style={{opacity: 0}}/>
            {name === 'password' && value && <button onClick={onClickHandler} type='button'><img className={styles.img}
                                                                 src={open ? eyeOpen : eyeClose}
                                                                 alt="eye"/></button>}
        </div>
    );
};

