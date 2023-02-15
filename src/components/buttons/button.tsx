import React from 'react';

import styles from './button.module.scss'

type ButtonType = {
    status?: string
    size: string
    name?: string
    date?: string

}

export const Button = ({status, size, name, date}:ButtonType) => {

    let disable = false
    let buttonName


    const dateDelivery = new Date(date!)
    const formatDate = (date:any) => {
        let dd = date.getDate();

        if (dd < 10) dd = `0${  dd}`;

        let mm = date.getMonth() + 1;

        if (mm < 10) mm = `0${  mm}`;

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

    }

    return (
        <button className={`${bookStatus} ${buttonSize}`} onClick={onClickHandler} type="button" disabled={disable}>
            {name ? name : buttonName}
        </button>
    )
}

