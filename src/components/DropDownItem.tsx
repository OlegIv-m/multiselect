import styles from "./multiselect.module.scss"

export default function DropDownItem(props){
    return (<div className={styles.oneLine}>
                <div className={styles.left}>
                    {(props.showIcon) ? <span className={`fi fi-${props.item.code}`}></span> : null}
                    <span>{props.item.language}</span>
                </div>
                <input className={styles.right} type="checkbox" onChange={(e) => props.selectItem(e,props.item)} checked={props.selectedCountries.includes(props.item)}></input>
            </div>)
    
}