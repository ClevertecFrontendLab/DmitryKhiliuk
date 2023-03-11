import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import avatar from '../../assets/avatar/avatar.png'
import logo from '../../assets/logo/logo.svg'
import {AUTH, MAIN} from '../../common/routes';
import {selectStatus} from '../../common/selectors';
import {useAppSelector} from '../../redux/store';
import {ButtonBurger} from '../buttons';
import {Error} from '../snackbar';

import styles from './header.module.scss'


type HeaderType = {
    toggle: boolean
    setToggle: (event:React.MouseEvent<HTMLButtonElement>) => void
}



export const Header = ({toggle, setToggle}: HeaderType) => {
    const status = useAppSelector(selectStatus)
    const navigate = useNavigate()

    const onClickHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        setToggle(event)
    }

    const [menu, setMenu] = useState(false)

    const onClickHandlerForMenu = () => {
       setMenu(!menu)
    }

    const onClickHandlerExit = () => {
        localStorage.clear();
        navigate(AUTH)
    }

    return (
        <section className={styles.header}>
            <div className={styles.container}>
                {status==='failed'&&<Error/>}
                <div className={styles.headerSide}>
                    <Link to={MAIN}><img src={logo} alt="logo"/></Link>
                </div>
                <div className={styles.header__main} >
                    <div data-test-id='button-burger' className={styles.menu}>
                        <ButtonBurger toggle={toggle} callBurger={onClickHandler}/>
                    </div>
                    <h3 className={styles.title}>Библиотека</h3>
                    <div className={styles.user}>
                        <h3 className={styles.greeting} >Привет, Иван</h3>
                        <div onClick={onClickHandlerForMenu} onKeyDown={onClickHandlerForMenu} role='button' tabIndex={0}>
                            <img src={avatar} alt="avatar" className={styles.avatar}/>
                        </div>

                    </div>

                </div>
                {menu && <div className={styles.menuHeader}>
                    <div className={styles.menuContent}>
                        <button className={styles.menuButton} type='button'><h5>Профиль</h5></button>
                        <button className={styles.menuButton} type='button' onClick={onClickHandlerExit}><h5>Выход</h5></button>
                    </div>

                </div>}
            </div>
        </section>
    );
}
