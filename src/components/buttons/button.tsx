import React from 'react';

import styles from './button.module.scss'

type ButtonType = {
    status?: string
    size: string
    name?: string

}

export const Button = ({status, size, name}:ButtonType) => {

    let disable = false
    let buttonName

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
                buttonName = 'занята до 24.04'
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

