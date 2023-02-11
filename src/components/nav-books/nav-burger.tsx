import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import close from '../../assets/icons/menu-close.svg';
import open from '../../assets/icons/menu-open.svg';
import {AGREEMENT, BOOKS, PROFILE, RULES} from '../../common/routes';
import {selectCategories} from '../../common/selectors';
import {useAppSelector} from '../../redux/store';

import styles from './nav-books.module.scss'

type NavBoxType = {

    callBurger: (event:React.MouseEvent<HTMLButtonElement>) => void
}

export const NavBurger = ({callBurger}: NavBoxType) => {

    const categories = useAppSelector(selectCategories)

    const [showcase, setShowcase] = useState(true)

    const onClickHandler = () => {
        setShowcase(!showcase)
    }

    const toggleHandler = (event:any) => {
        callBurger(event)
        setShowcase(false)
    }

    const toggleHandlerForMenuItems = (event:any) => {
        callBurger(event)
        setShowcase(true)
    }

    const setActiveMenuItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.menuItems} ${styles.menuActive}` : styles.menuItems
    const setActiveMenuAdditionalItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.menuItems} ${styles.menuActive} ${styles.additionalItems}` : `${styles.menuItems} ${styles.additionalItems}`
    const setActiveSubmenuItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.subMenuItems} ${styles.subMenuActive}` : styles.subMenuItems

    return (
        <section className={styles.nav_books}>
            <div className={styles.list}>
                <div data-test-id='burger-showcase' onClick={onClickHandler} onKeyDown={onClickHandler} role='button' tabIndex={0}>
                    <NavLink to={BOOKS} style={{marginTop: 0, marginBottom: '8px'}} className={setActiveMenuItem} >
                        <h5>Витрина книг</h5>
                    </NavLink>
                    <img src={showcase?open:close} alt="menu"/>
                </div>
                <div data-test-id='burger-books'>{showcase && categories.map((el) => (<div key={el.id} className={styles.item}>
                        <NavLink to={`/books/${el.path}`} className={setActiveSubmenuItem}
                                 onClick={toggleHandlerForMenuItems}>{el.name}</NavLink>
                        <span className={styles.count}>44</span>
                    </div>)
                )}</div>
                <NavLink to={RULES} className={setActiveMenuItem} onClick={toggleHandler} data-test-id='burger-terms'
                ><h5>Правила пользования</h5></NavLink>
                <NavLink to={AGREEMENT} className={setActiveMenuItem} onClick={toggleHandler} data-test-id='burger-contract'><h5>Договор оферты</h5></NavLink>
                <div className={styles.line}> </div>
                <NavLink to={PROFILE} className={setActiveMenuAdditionalItem} onClick={toggleHandler}><h5>Профиль</h5></NavLink>
                <button className={cn(styles.menuItems, styles.additionalItems)} type='button' onClick={toggleHandler}><h5>Выход</h5></button>
            </div>
        </section>
    );
}

