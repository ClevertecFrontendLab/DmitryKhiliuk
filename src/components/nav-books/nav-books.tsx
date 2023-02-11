import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import close from '../../assets/icons/menu-close.svg'
import open from '../../assets/icons/menu-open.svg'
import {AGREEMENT, BOOKS, PROFILE, RULES} from '../../common/routes';

import styles from './nav-books.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {selectCategories} from "../../common/selectors";

type NavBoxType = {
    setToggle?: (toggle: boolean) => void
}

export const NavBooks = ({setToggle}: NavBoxType) => {

    const dispatch = useAppDispatch()
    const categories = useAppSelector(selectCategories)


    console.log('nav')

    const [showcase, setShowcase] = useState(true)

    const onClickHandler = () => {
        setShowcase(!showcase)
    }

    const toggleHandler = () => {
        setToggle?.(false)
        setShowcase(false)
    }


    const booksGroup = [
        {id: 1, title: 'Все книги', count: 14, rout: 'all'},
        {id: 2, title: 'Бизнес-книги', count: 14, rout: 'business'},
        {id: 3, title: 'Детективы', count: 8, rout: 'detectives'},
        {id: 4, title: 'Детские книги', count: 14, rout: 'children'},
        {id: 5, title: 'Зарубежная литература', count: 2, rout: 'foreign'},
        {id: 6, title: 'История', count: 5, rout: 'history'},
        {id: 7, title: 'Классическая литература', count: 12, rout: 'classic'},
        {id: 8, title: 'Книги по психологии', count: 11, rout: 'psychology'},
        {id: 9, title: 'Компьютерная литература', count: 54, rout: 'computer'},
        {id: 10, title: 'Культура и искусство', count: 5, rout: 'art'},
        {id: 11, title: 'Наука и образование', count: 2, rout: 'science '},
        {id: 12, title: 'Публицистическая литература', count: 0, rout: 'publicist'},
        {id: 13, title: 'Справочники', count: 10, rout: 'directories'},
        {id: 14, title: 'Фантастика', count: 12, rout: 'fiction'},
        {id: 15, title: 'Юмористическая литература', count: 8, rout: 'humor'},
    ]

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
                <div data-test-id='navigation-books'>{showcase && booksGroup.map((el) => (<div key={el.id} className={styles.item}>
                        <NavLink to={`/books/${el.rout}`} className={setActiveSubmenuItem}
                                 onClick={() => setToggle?.(false)}>{el.title}</NavLink>
                        <span className={styles.count}>{el.count}</span>
                    </div>)
                )}</div>
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

