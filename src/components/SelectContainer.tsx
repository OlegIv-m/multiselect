import styles from "./multiselect.module.scss"
import { Cross } from "../resources/cross"

export default function selectContainer(props) {
    return (<div>
                <label htmlFor="language">Язык {props.searchStr}</label>
                <div className={styles.selectInput} id="language" >
                    <div className={styles.inputContainer}>
                    {props.items.map((country) => {
                        return (<span key={country.code} className={styles.countryLabel}>
                                    <span>{country.language}</span>
                                    <span onClick={() => props.unselectCountry(country)}>
                                        <Cross></Cross>
                                    </span>
                                </span>)
                    })}
                    </div>
                    
                    {props.children}
                </div>
            </div>)
}