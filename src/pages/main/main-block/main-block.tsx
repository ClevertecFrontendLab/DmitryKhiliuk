import React, {useState} from 'react';
import cn from 'classnames'

import search from '../../../assets/icons/search.svg';
import {FilterButton, RoundButton} from '../../../components/buttons';
import {DisplayView} from '../../../components/display-view';

import cancel from './input-search-cancel-button.svg'
import {MainContent} from './main-content';

import styles from './main-block.module.scss'


export const MainBlock = () =>  {

    const [gridContent, setGridContent] = useState(true)
    const [deployedInput, setDeployedInput] = useState(false)

    const onClickHandlerForGridButton = () => {
        setGridContent(true)
    }
    const onClickHandlerForRowButton = () => {
        setGridContent(false)
    }

    const onClickHandlerForInput = () => {
        if (window.innerWidth < 700) {
            setDeployedInput(true)
        }
    }

    const onClickCancel = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDeployedInput(false)
    }



    return (
        <section className={styles.mainPage}>
            <nav className={styles.navSettings}>
                <div className={styles.formBox}>
                    <div className={cn(styles.inputBox, deployedInput && styles.deployedInput)} >
                         <img src={search} alt='alt'/>
                         <input  type="search" className={styles.input} placeholder="Поиск книги или автора…" data-test-id='input-search'/>
                         {deployedInput&&<button type='button' onClick={onClickCancel} data-test-id='button-search-close'><img src={cancel} alt="cancel"/></button>}
                    </div>
                    <div data-test-id='button-search-open'>
                        <RoundButton callButton={onClickHandlerForInput} image={search} className={`${cn(styles.searchButton, deployedInput && styles.noneButton)}`}  />
                    </div>
                    {!deployedInput && <FilterButton/>}
                </div>
                {!deployedInput &&
                    <div className={styles.btnBox}>
                    <div data-test-id="button-menu-view-window">
                        <DisplayView callBack={onClickHandlerForGridButton}
                                     gridContent={gridContent} purposeButton="g"
                        />
                    </div>
                    <div data-test-id="button-menu-view-list">
                        <DisplayView callBack={onClickHandlerForRowButton}
                                     gridContent={gridContent} purposeButton="r"
                        />
                    </div>
                </div>
                }
            </nav>
            <MainContent grid={gridContent}/>
        </section>
    );
}

