import cat from '../../assets/icons/cat-crd.svg'
import {HOST} from '../../common/routes';
import {selectBooksId} from '../../common/selectors';
import {useAppSelector} from '../../redux/store';
import {Button} from '../buttons';
import {Rating} from '../rating';

import styles from './card.module.scss'



export type BookComponentType = {
    id : number
    grid: boolean
    value: string
}



export const Card = ({id, grid, value}: BookComponentType) => {

    const book = useAppSelector((state) => selectBooksId(state,id))
    const {delivery, booking, image, rating, title, authors, issueYear} = book!

    let bookStatus: string

    if (booking) {
        bookStatus = 'reserved'
    }else if (delivery) {
        bookStatus = 'taken'
    } else {
        bookStatus = 'free'
    }

    const light = (str: string) => {
        if (!value) return str
        const regexp = new RegExp(value, 'ig')
        const matchValue = str.match(regexp)

        if (matchValue) {
            const result = str.split(regexp)

            return result.map((el, index, array) => index < array.length - 1?
                <div >{}<span  style={{display: 'inline'}}>{el}<span data-test-id='highlight-matches' style={{color: '#FF5253', display: 'inline'}}>{matchValue.shift()}</span></span></div>:
                <div >{}<span  style={{display: 'inline'}}>{el}</span></div>)

        }

        return str
    }


    return (
        <div>
            {grid ?
                <div className={styles.bookBlockGrid}>
                    <div className={styles.image}>
                        <img src={image ? (`${HOST}${ image.url}`) : cat}
                                  alt="img"/>
                    </div>
                    <div className={styles.subBlock}>
                        <div className={styles.ratingBook}>
                            <Rating count={rating}/>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.title}><span>{light(title)}</span></div>
                            <div>
                                <div className={styles.author}>{authors.map((el) => <>{light(el)}, </> )}{issueYear}</div>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <Button status={bookStatus} size="small"/>
                        </div>
                    </div>
                </div> :
                <div className={styles.bookBlockRow}>
                    <div className={styles.imageRow}>
                        <div><img src={image ? (`${HOST}${ image.url}`):cat} alt="img"/></div>
                    </div>
                    <div className={styles.subBlockRow}>
                        <div className={styles.descriptionRow}>
                            <div className={styles.titleRow}><span>{light(title)}</span></div>
                            <div className={styles.authorRow}>{authors.map((el) => <>{light(el)}, </> )}{issueYear}</div>
                        </div>
                        <div className={styles.actionRow}>
                            <div className={styles.ratingBookRow}>
                                <Rating count={rating}/>
                            </div>
                            <div className={styles.buttonRow}>
                                <Button status='free' size="small" date={delivery?.dateHandedTo}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

