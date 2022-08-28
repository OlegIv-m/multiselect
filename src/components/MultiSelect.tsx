import { Component } from "react";
import "flag-icons/css/flag-icons.min.css"
import country from "../resources/country.json"

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

export default class MultiSelect extends Component<{multiSelect: boolean, showIcon: boolean}, { showDropDown: boolean, searchStr: string, filteredItems: countryInt[], selectedCountries: countryInt[], dropdownOpened: boolean | null}>{
    // private selectedLanguage: countryInt;
    private items: countryInt[];

    constructor(props){
        super(props);
        this.items = country.map((item) => { 
            return {
                ...item,
                // language: item.language.toLowerCase()
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
            <div className="select-lang">
                <label htmlFor="language">Язык {this.state.searchStr}</label>
                <div className="select-input" id="language" >
                    <div className="input-container">
                    {this.state.selectedCountries.map((country) => {
                        return (<span key={country.code} className="country-label">
                                    <span>{country.language}</span>
                                    <span className="bi-x" onClick={() => this.unselectCountry(country)}></span>
                                </span>)
                    })}
                    </div>
                </div>
                
                <span className="bi-chevron-down" onClick={this.toggleDropdown}></span>
                { (<div className={ (this.state.dropdownOpened === null) ? "multi" : (this.state.dropdownOpened) ? "multi slide-open" : "multi slide-close"}>
                        <div className="bi-search"></div>
                        <input type="text" placeholder="Поиск" onInput={this.getSearch} value={this.state.searchStr}></input>
                        {this.state.filteredItems.map((item) => {
                            return (
                                <div  key={item.code} className="one-line">
                                    <div className="left">
                                        {(this.props.showIcon) ? <span className={`fi fi-${item.code}`}></span> : null}
                                        <span>{item.language}</span>
                                    </div>
                                    <input className="right" type="checkbox" onChange={(e) => this.selectCountry(e,item)} checked={this.state.selectedCountries.includes(item)}></input>
                                </div>
                            )
                        })}
                    </div>)
                }
            </div>
        )
    }
}