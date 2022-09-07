import styles from "./multiselect.module.scss"

export default function selectContainer(props) {
    return (<div>
                <label htmlFor="language">Язык {props.searchStr}</label>
                <div className={styles.selectInput} id="language" >
                    <div className={styles.inputContainer}>
                    {props.items.map((country) => {
                        return (<span key={country.code} className={styles.countryLabel}>
                                    <span>{country.language}</span>
                                    <span className="bi-x" onClick={() => props.unselectCountry(country)}></span>
                                </span>)
                    })}
                    </div>
                    
                    {props.children}
                </div>
            </div>)
}