import {Subject, interval} from "rxjs"
import {mapTo} from "rxjs/operators"
import {ajax} from "rxjs/ajax"
import home_en from "./localization/home.en.json"
import home_pl from "./localization/home.pl.json"
import cityList from "./city.list.json"
import { fiveDayForecastByCityID } from "./middleware/endpoints"

const defaultCityID = 2643743;
const defaultLang = 'en';
const localeFiles = {
  home_en,
  home_pl,
};
let fDayForecastObj = null;
const localization = {
    home: home_en,
  };
export const setLang = (lang = defaultLang)=> {
  for(const key in localization){
    localization[key] = localeFiles[`${key}_${lang}`]
  }
  return localization;
};
export const globalStore = new Subject();
export const initialState = {
  fiveDayForecast: fDayForecastObj,
  cityList,
  localization,
  tab: 'home',
};

/**
 *
 * @param {number} cityID
 * @return {Observable<object>}
 */
export const fiveDayForecast$ = (cityID = defaultCityID) => ajax
      .getJSON(fiveDayForecastByCityID(cityID));
