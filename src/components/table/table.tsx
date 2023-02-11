import styles from './table.module.scss'

type TableType = {
    data: any,
    keys: string[]
}


export const Table = ({data, keys}: TableType) => (
        <table className={styles.table}>
            {keys.map((el) => <tbody key={el}>
            <tr>
                <th>{el}</th>
                <td>{data[el]}</td>
            </tr>
            </tbody>)}
        </table>
    );

