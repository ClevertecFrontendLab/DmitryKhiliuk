import React from 'react';

import styles from './loader.module.scss'

export const Loader = () => {
    const x = () => {

    }
    return (
        <div className={styles.ring} data-test-id='loader'>
            <div> </div>
            <div> </div>
            <div> </div>
            <div> </div>
        </div>
    );
};

