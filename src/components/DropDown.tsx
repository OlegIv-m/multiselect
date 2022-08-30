import styles from "./multiselect.module.scss"

import DropDownItem from "./DropDownItem"

export default function DropDown(props){
    return (<div className={ (props.dropdownOpened === null) ? (`${styles.multi}`) : (props.dropdownOpened) ? (`${styles.multi} ${styles.slideOpen}`) : (`${styles.multi} ${styles.slideClose}`)}>
                <div className="bi-search"></div>
                <input type="text" placeholder="Поиск" onInput={props.search} value={props.searchStr}></input>
                    {props.items.map((item) => {
                        return (
                            <DropDownItem key={item.code} item={item} selectItem={props.selectItem} selectedCountries={props.selectedCountries} showIcon={props.showIcon}/>
                        )
                    })}
            </div>)
}