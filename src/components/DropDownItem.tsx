import styles from "./multiselect.module.scss"
import {Lang} from "./Lang"

export default function DropDownItem(props){
    return (<div className={styles.oneLine}>
                <div className={styles.left}>
                    {(props.showIcon) ? <Lang code={props.item.code}></Lang>  : null }
                    {/* {(props.showIcon) ? <span className={`fi fi-${props.item.code}`}></span> : null} */}
                    <span>{props.item.language}</span>
                </div>
                <label className={styles.right} >
                    <input type="checkbox" onChange={(e) => props.selectItem(e,props.item)} checked={props.selectedCountries.includes(props.item)}></input>
                    <span></span>
                </label>
            </div>)
}