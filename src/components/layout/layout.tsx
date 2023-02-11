import {useEffect, useRef, useState} from 'react';
import {Outlet} from 'react-router-dom';
import cn from 'classnames';

import {Footer} from '../footer';
import {Header} from '../header';
import {NavBurger} from '../nav-books';

import styles from './layout.module.scss'



export const Layout = () => {

    const [toggleBurgerMenu, setToggleBurgerMenu] = useState(false)
    const toggleMenuHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setToggleBurgerMenu(!toggleBurgerMenu)
    }

    const dropDownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handler(event:any) {
            if(!dropDownRef.current?.contains(event.target) ) {
                setToggleBurgerMenu(false);
            }
        }
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
    }, []);

    return (
        <div className={styles.layout} >
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
}





