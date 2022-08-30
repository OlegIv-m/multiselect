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
 
export default class MultiSelect extends Component<{multiSelect: boolean, showIcon: boolean}, 
                                                    {showDropDown: boolean, searchStr: string, filteredItems: countryInt[], selectedCountries: countryInt[], dropdownOpened: boolean | null}>{
    private items: countryInt[];

    constructor(props){
        super(props);
        this.items = country.map((item) => { 
            return {
                ...item,
            };
        }).sort((countryA, countryB) => {
            return (countryA.language < countryB.language ? -1 : ((countryA.language < countryB.language) ? 1 : 0));
        })
        this.state = {
            showDropDown: false,
            searchStr: "",
            filteredItems: this.items,
            selectedCountries: [],
            dropdownOpened: null
        }
        this.getSearch = this.getSearch.bind(this);
        this.selectCountry = this.selectCountry.bind(this);
        this.unselectCountry = this.unselectCountry.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    getSearch(e){
        this.setState(() => {
            const searchStr = e.target.value.toString().toLocaleLowerCase();
            return {
                searchStr: e.target.value,
                filteredItems: this.items.filter((item) => {
                    const lowString = item.language.toLowerCase();
                    return lowString.includes(searchStr.toLowerCase());
                })
            }
        });
    }

    selectCountry(e, country: countryInt){
        if(this.props.multiSelect){
            this.setState((prevState) => {
                if(e.target.checked) {
                    return {
                        selectedCountries: prevState.selectedCountries.concat(country)
                    }
                } else {
                    return {
                        selectedCountries: prevState.selectedCountries.filter((item) => item.code !== country.code)
                    }
                }
            })
        } else {
            this.setState(() => {
                if(e.target.checked) {
                    return {
                        selectedCountries: [country]
                    }
                } else {
                    return {
                        selectedCountries: []
                    }
                }
            })
        }
    }

    unselectCountry(country: countryInt){
        this.selectCountry({target: {checked: false}}, country);
    }

    toggleDropdown(){
        this.setState((prevState) => {
            return {
                dropdownOpened: !prevState.dropdownOpened,
                searchStr: "",
                filteredItems: this.items
            }
        })
    }

    render(){
        return (
            <div className={styles["selectLang"]}>
                <SelectContainer 
                items={this.state.selectedCountries} 
                searchStr={this.state.searchStr} 
                unselectCountry={this.unselectCountry}/>
                <span className={`${styles.miChevronDown} ${(this.state.dropdownOpened) ? "bi-chevron-up" : "bi-chevron-down"}`} onClick={this.toggleDropdown}></span>

                <DropDown 
                dropdownOpened={this.state.dropdownOpened} 
                search={this.getSearch} 
                searchStr={this.state.searchStr} 
                items={this.state.filteredItems} 
                showIcon={this.props.showIcon} 
                selectItem={this.selectCountry} 
                selectedCountries={this.state.selectedCountries}/>
            </div>
        )
    }
}