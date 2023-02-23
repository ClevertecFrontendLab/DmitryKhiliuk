import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import close from '../../assets/icons/menu-close.svg'
import open from '../../assets/icons/menu-open.svg'
import {AGREEMENT, BOOKS, PROFILE, RULES} from '../../common/routes';
import {selectBooks, selectCategories, selectStatus} from '../../common/selectors';
import {setAppStatusAC} from '../../redux/app-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';

import styles from './nav-books.module.scss'

type NavBoxType = {
    setToggle?: (toggle: boolean) => void
}

export const NavBooks = ({setToggle}: NavBoxType) => {


    const categories = useAppSelector(selectCategories)
    const books = useAppSelector(selectBooks)
    const status = useAppSelector(selectStatus)
    const dispatch = useAppDispatch()


    const [showcase, setShowcase] = useState(true)

    const onClickHandler = () => {
        setShowcase(!showcase)
    }

    const toggleHandler = () => {
        dispatch(setAppStatusAC({status: 'idle'}))
        setToggle?.(false)
        setShowcase(false)
    }

    const setActiveMenuItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.menuItems} ${styles.menuActive}` : styles.menuItems
    const setActiveMenuAdditionalItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.menuItems} ${styles.menuActive} ${styles.additionalItems}` : `${styles.menuItems} ${styles.additionalItems}`
    const setActiveSubmenuItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.subMenuItems} ${styles.subMenuActive}` : styles.subMenuItems

    return (
        <section className={styles.nav_books}>
            <div className={styles.list}>
                <div data-test-id='navigation-showcase' onClick={onClickHandler} onKeyDown={onClickHandler} role='button' tabIndex={0}>
                    <NavLink to={BOOKS}  style={{marginTop: 0, marginBottom: '8px'}} className={setActiveMenuItem} >
                    <h5>Витрина книг</h5></NavLink>
                    <img src={showcase?open:close} alt="menu"/>
                </div>
                {status === 'succeeded' &&  <div data-test-id='navigation-books'>{showcase && categories.map((el, index) => (
                    <div key={el.id} className={styles.item}>
                        <NavLink to={`/books/${el.path}`} data-test-id={`navigation-${el.path}`} className={setActiveSubmenuItem}
                                 onClick={() => setToggle?.(false)}>{el.name}</NavLink>
                        <span
                            className={styles.count} data-test-id={`navigation-book-count-for-${el.path}`}>{index ? books.filter((book) => book.categories.find((ctgrs) => ctgrs === el.name)).length :
                            books.length}</span>
                    </div>)
                )}</div>}

                <NavLink to={RULES} className={setActiveMenuItem} onClick={toggleHandler} data-test-id='navigation-terms'
                ><h5>Правила пользования</h5></NavLink>
                <NavLink to={AGREEMENT} className={setActiveMenuItem} onClick={toggleHandler} data-test-id='navigation-contract'><h5>Договор оферты</h5></NavLink>
                <div className={styles.line}> </div>
                <NavLink to={PROFILE} className={setActiveMenuAdditionalItem} onClick={toggleHandler}><h5>Профиль</h5></NavLink>
                <button className={cn(styles.menuItems, styles.additionalItems)} type='button' onClick={toggleHandler}><h5>Выход</h5></button>
            </div>
        </section>
    );
}

