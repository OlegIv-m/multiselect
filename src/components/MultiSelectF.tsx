import { Component, useState } from "react";
import "flag-icons/css/flag-icons.min.css"
import country from "../resources/country.json"
import styles from "./multiselect.module.scss"
import "bootstrap-icons/font/bootstrap-icons.css"

import SelectContainer from "./SelectContainer"
import DropDown from "./DropDown"

interface  countryInt  {
    "capital"?: string,
    "code": string,
    "continent"?: string,
    "flag_1x1": string,
    "flag_4x3": string,
    "iso": boolean,
    "name": string,
    "language": string
}
 
export default function MultiSelectF(props){
    // const items = country.sort((countryA, countryB) => {
    //         return (countryA.language < countryB.language ? -1 : ((countryA.language < countryB.language) ? 1 : 0));
    //     }
    // ); 
    const items = country;


    const [dropDown, showDropDown] = useState<boolean | null>(null);
    const [searchStr, setSearchStr] = useState("");
    const [filteredItems, setFilteredItems] = useState(items);
    const [selectedCountries, setSelectedCountries] = useState<countryInt[]>([]);

    return (
        <div className={styles.selectLang}>
            {/* <div className={styles.flexChevron}> */}
            <SelectContainer 
            items={selectedCountries} 
            searchStr={searchStr} 
            unselectCountry={(item: countryInt) => 
                setSelectedCountries(selectedCountries.filter((testItem) => testItem.code !== item.code))
            }>
                <span className={`${styles.miChevronDown} ${(dropDown) ? "bi-chevron-up" : "bi-chevron-down"}`} onClick={() => showDropDown(!dropDown)}></span>
            </SelectContainer>
{/*             
            </div> */}

            <DropDown 
            dropdownOpened={dropDown} 
            search={(e) => {
                const searchStr = e.target.value.toString().toLocaleLowerCase();
                setSearchStr(searchStr);
                setFilteredItems(items.filter((item) => {
                    const lowString = item.language.toLowerCase();
                    return lowString.includes(searchStr.toLowerCase());
                }))
            }} 
            searchStr={searchStr} 
            items={filteredItems} 
            showIcon={props.showIcon} 
            selectItem={(e, item: countryInt) => {
                if(e.target.checked) {
                    setSelectedCountries(selectedCountries.concat(item))
                } else {
                    setSelectedCountries(selectedCountries.filter((testItem) => testItem.code !== item.code))
                }
            }}
            selectedCountries={selectedCountries}/>
        </div>
    )
}