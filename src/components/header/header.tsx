import {Link} from 'react-router-dom';

import avatar from '../../assets/avatar/avatar.png'
import logo from '../../assets/logo/logo.svg'
import {MAIN} from '../../common/routes';
import {selectBookError, selectBooksError} from '../../common/selectors';
import {useAppSelector} from '../../redux/store';
import {ButtonBurger} from '../buttons';
import {Error} from '../snackbar';

import styles from './header.module.scss'


type HeaderType = {
    toggle: boolean
    setToggle: (event:React.MouseEvent<HTMLButtonElement>) => void
}



export const Header = ({toggle, setToggle}: HeaderType) => {

    const booksError = useAppSelector(selectBooksError)
    const bookError = useAppSelector(selectBookError)

    const onClickHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        setToggle(event)
    }

    return (
        <section className={styles.header}>
            <div className={styles.container}>
                {(booksError||bookError)&&<Error/>}
                <div className={styles.headerSide}>
                    <Link to={MAIN}><img src={logo} alt="logo"/></Link>
                </div>
                <div className={styles.header__main} >
                    <div data-test-id='button-burger' className={styles.menu}>
                        <ButtonBurger toggle={toggle} callBurger={onClickHandler}/>
                    </div>
                    <h3 className={styles.title}>Библиотека</h3>
                    <div className={styles.user}>
                        <h3 className={styles.greeting}>Привет, Иван</h3>
                        <img src={avatar} alt="avatar" className={styles.avatar}/>
                    </div>
                </div>
            </div>
        </section>
    );
}
