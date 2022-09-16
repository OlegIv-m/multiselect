import {DELang} from "../resources/de"
import {ESLang} from "../resources/es"
import {GBLang} from "../resources/gb"
import {ITLang} from "../resources/it"
import {PLLang} from "../resources/pl"
import {RULang} from "../resources/ru"

export function Lang(props) {
    let Component;
    switch (props.code){
        case "de": 
            Component = DELang
            break;
        case "es": 
            Component = ESLang
            break;
        case "gb": 
            Component = GBLang
            break;
        case "it": 
            Component = ITLang
            break;
        case "pl": 
            Component = PLLang
            break;
        case "ru": 
            Component = RULang
            break;
    }

    return (
            <Component />
    )
}