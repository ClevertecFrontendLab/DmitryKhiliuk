import {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import cn from 'classnames';

import close from '../../assets/icons/menu-close.svg'
import open from '../../assets/icons/menu-open.svg'
import {AGREEMENT, ALL_BOOKS, AUTH, BOOKS, PROFILE, RULES} from '../../common/routes';
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
    const navigate = useNavigate()

    const [showcase, setShowcase] = useState(true)

    const onClickHandler = () => {
        setShowcase(!showcase)
    }

    const toggleHandler = () => {
        dispatch(setAppStatusAC({status: 'idle'}))
        setToggle?.(false)
        setShowcase(false)
        localStorage.clear();
        navigate(AUTH)
    }

    const setActiveMenuItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.menuItems} ${styles.menuActive}` : styles.menuItems
    const setActiveMenuAdditionalItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.menuItems} ${styles.menuActive} ${styles.additionalItems}` : `${styles.menuItems} ${styles.additionalItems}`
    const setActiveSubmenuItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.subMenuItems} ${styles.subMenuActive}` : styles.subMenuItems

    return (
        <section className={styles.nav_books}>
            <div className={styles.list}>
                <div data-test-id='navigation-showcase' onClick={onClickHandler}
                     onKeyDown={onClickHandler} role='button' tabIndex={0}>
                    <NavLink to={BOOKS} style={{marginTop: 0, marginBottom: '8px'}}
                             className={setActiveMenuItem}>
                        <h5>?????????????? ????????</h5></NavLink>
                    <img src={showcase ? open : close} alt="menu"/>
                </div>
                {status === 'succeeded' &&
                    <div>
                        {showcase &&<NavLink to={ALL_BOOKS} data-test-id='navigation-books' className={setActiveSubmenuItem} style={{marginLeft: '24px'}}>?????? ??????????</NavLink>}
                        <div >{showcase && categories.map((el) => (
                            <div key={el.id} className={styles.item}>
                                <NavLink to={`/books/${el.path}`}
                                         data-test-id={`navigation-${el.path}`}
                                         className={setActiveSubmenuItem}
                                         onClick={() => setToggle?.(false)}>{el.name}
                                </NavLink>
                                <span
                                    className={styles.count}
                                    data-test-id={`navigation-book-count-for-${el.path}`}>{books.filter((book) => book.categories.find((ctgrs) => ctgrs === el.name)).length}
                            </span>
                            </div>)
                        )}
                        </div>
                    </div>}

                <NavLink to={RULES} className={setActiveMenuItem} onClick={toggleHandler}
                         data-test-id='navigation-terms'
                ><h5>?????????????? ??????????????????????</h5></NavLink>
                <NavLink to={AGREEMENT} className={setActiveMenuItem} onClick={toggleHandler}
                         data-test-id='navigation-contract'><h5>?????????????? ????????????</h5></NavLink>
                <div className={styles.line} />
                <NavLink to={PROFILE} className={setActiveMenuAdditionalItem}
                         onClick={toggleHandler}><h5>??????????????</h5></NavLink>
                <button className={cn(styles.menuItems, styles.additionalItems)} type='button'
                        onClick={toggleHandler}><h5>??????????</h5></button>
            </div>
        </section>
    );
}

