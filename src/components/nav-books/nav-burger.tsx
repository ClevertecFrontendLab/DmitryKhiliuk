import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import close from '../../assets/icons/menu-close.svg';
import open from '../../assets/icons/menu-open.svg';
import {AGREEMENT, BOOKS, PROFILE, RULES} from '../../common/routes';
import {selectBooks, selectCategories, selectStatus} from '../../common/selectors';
import {setAppStatusAC} from '../../redux/app-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';

import styles from './nav-books.module.scss'

type NavBoxType = {

    callBurger: (event:React.MouseEvent<HTMLButtonElement>) => void
}

export const NavBurger = ({callBurger}: NavBoxType) => {

    const categories = useAppSelector(selectCategories)
    const books = useAppSelector(selectBooks)
    const status = useAppSelector(selectStatus)
    const dispatch = useAppDispatch()

    const [showcase, setShowcase] = useState(true)

    const onClickHandler = () => {
        setShowcase(!showcase)
    }

    const toggleHandler = (event:React.MouseEvent<HTMLButtonElement> ) => {
        dispatch(setAppStatusAC({status: 'idle'}))
        callBurger(event)
        setShowcase(false)
    }

    const toggleHandlerForMenuItems = (event:React.MouseEvent <HTMLButtonElement>) => {

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
                {status === 'succeeded' && <div data-test-id='burger-books'>{showcase && categories.map((el, index) => (
                    <div key={el.id} className={styles.item}>
                       <button type='button' onClick={toggleHandlerForMenuItems}> <NavLink to={`/books/${el.path}`} className={setActiveSubmenuItem}
                                 >{el.name}</NavLink></button>
                        <span
                            className={styles.count}>{index ? books.filter((book) => book.categories.find((ctgrs) => ctgrs === el.name)).length :
                            books.length}</span>
                    </div>)
                )}</div>}
                <button onClick={toggleHandler} type='button'><NavLink to={RULES} className={setActiveMenuItem}  data-test-id='burger-terms'
                ><h5>Правила пользования</h5></NavLink></button>
                <button onClick={toggleHandler} type='button'><NavLink to={AGREEMENT} className={setActiveMenuItem}  data-test-id='burger-contract'><h5>Договор оферты</h5></NavLink>
                <div className={styles.line}> </div></button>
                <NavLink to={PROFILE} className={setActiveMenuAdditionalItem} ><h5>Профиль</h5></NavLink>
                <button className={cn(styles.menuItems, styles.additionalItems)} type='button' onClick={toggleHandler}><h5>Выход</h5></button>
            </div>
        </section>
    );
}

