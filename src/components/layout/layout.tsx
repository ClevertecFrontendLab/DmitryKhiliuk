import React, {useEffect, useRef, useState} from 'react';
import {Outlet} from 'react-router-dom';
import cn from 'classnames';

import {selectStatus} from '../../common/selectors';
import {useAppSelector} from '../../redux/store';
import {Footer} from '../footer';
import {Header} from '../header';
import {Loader} from '../loader';
import {NavBurger} from '../nav-books';

import styles from './layout.module.scss'



export const Layout = React.memo(() => {


    const status = useAppSelector(selectStatus)


    const [toggleBurgerMenu, setToggleBurgerMenu] = useState(false)
    const toggleMenuHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setToggleBurgerMenu(!toggleBurgerMenu)
    }



    const dropDownRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        function handler(event: { target: (Node|EventTarget|null) ; } ) {
            if(!dropDownRef.current?.contains(event.target as Node| null ) ) {
                setToggleBurgerMenu(false);
            }
        }
        window.addEventListener('click', handler)

        return () => window.removeEventListener('click', handler)
    }, []);



    return (
        <div className={cn(styles.layout)} >
            {status === 'loading' && <div ><Loader/></div>}
            {status === 'loading' && <div className={styles.loader}> </div>}
            <header ><Header toggle={toggleBurgerMenu} setToggle={toggleMenuHandler}/></header>
            <div ref={dropDownRef}  className={cn(styles.burgerMenuOpen, !toggleBurgerMenu && styles.burgerMenuClose)}>
                <NavBurger callBurger={toggleMenuHandler}/>
            </div>
            <main>
                <Outlet/>
            </main>
            <footer><Footer/></footer>
        </div>
    );
})





