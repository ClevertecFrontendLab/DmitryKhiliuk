import React from 'react';

import styles from './button.module.scss'

type ButtonType = {
    status?: string
    size: string
    name?: string
    date?: string
    type?: 'button' | 'submit' | 'reset' | undefined
    callBack?: () => void

}

export const Button = ({status, size, name, date, type, callBack}:ButtonType) => {

    let disable = false
    let buttonName


    const dateDelivery = new Date(date!)
    const formatDate = (date:Date) => {
        const day = date.getDate();
        let dd

        if (day < 10) dd = `0${  dd}`;

        const minute = date.getMonth() + 1;
        let mm

        if (minute < 10) mm = `0${  mm}`;

        return `${dd  }.${  mm}` ;
    };

    const getStatus = () =>  {
        let result

        switch (status) {
            case 'free':
                result = `${styles.primary}`
                buttonName = 'забронировать'
                break
            case 'reserved':
                result = `${styles.secondary}`
                buttonName = 'забронировано'
                break
            case 'taken':
                result = `${styles.secondary}`
                buttonName = `занята до ${formatDate(dateDelivery)}`
                disable = true
                break
            default:
                result = `${styles.primary}`
        }

        return result
    }

    const getSize = () => {
        let result

        if(size==='small'){
            result = `${styles.smallSize}`
        } else if (size ==='large'){
            result = `${styles.largeSize}`
        }

        return result
    }


    const bookStatus = getStatus()
    const buttonSize = getSize()


    const onClickHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        callBack!()

    }

    return (
        <button className={`${bookStatus} ${buttonSize}`} onClick={onClickHandler} type= {type === 'submit' ? 'submit' : 'button'} disabled={disable}>
            {name ? name : buttonName}
        </button>
    )
}

