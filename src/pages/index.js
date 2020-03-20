import React, {useState, useLayoutEffect} from "react"
import { fiveDayForecast$, globalStore, initialState, setLang } from "../store"
import Stats from "./stats";
import { interval } from "rxjs"
const styles = {
  temperatureBox: {
    padding: "20px",
    backgroundColor: "#316c8b",
    borderColor: "lightgrey",
    borderWidth: "2px",
    color: "#fff",
  },
};
const temperatures = (appState, id)=> <div>
  <div>{appState.localization.home.temp + ": "}{appState.fiveDayForecast?appState.fiveDayForecast.list[id].main.temp:'...loading'}</div>
  <div>{appState.localization.home.feels_like + ": "}{appState.fiveDayForecast?appState.fiveDayForecast.list[id].main.feels_like:'...loading'}</div>
  <div>{appState.localization.home.temp_max + ": "}{appState.fiveDayForecast?appState.fiveDayForecast.list[id].main.temp_max:'...loading'}</div>
  <div>{appState.localization.home.temp_min + ": "}{appState.fiveDayForecast?appState.fiveDayForecast.list[id].main.temp_min:'...loading'}</div>
  <div>{appState.localization.home.pressure + ": "}{appState.fiveDayForecast?appState.fiveDayForecast.list[id].main.pressure:'...loading'}</div>
  <div>{appState.localization.home.humidity + ": "}{appState.fiveDayForecast?appState.fiveDayForecast.list[id].main.humidity:'...loading'}</div>
</div>;

export default () => {
  const [appState, setState] = useState(initialState);
  useLayoutEffect(() => {
    const sub = globalStore.subscribe(setState)
    globalStore.next(initialState)
    fiveDayForecast$(2643743)
      .subscribe(obj => {
        globalStore.next({
          ...appState,
          fiveDayForecast: obj,
        })
      });
    // forecast api is refreshed according to docs every 10 min
    const anotherSub = interval(600000)
      .subscribe(() => fiveDayForecast$(2643743)
        .subscribe(obj => {
          globalStore.next({
            ...appState,
            fiveDayForecast: obj,
          })
        })
      );

    // cleanup and prevent memory leak
    //return anotherSub.unsubscribe;
  },[]);

  return <div>
    <button onClick={()=>globalStore.next({
      ...appState,
      tab: 'stats'
    })}>Stats</button>
    <button onClick={()=>globalStore.next({
      ...appState,
      tab: 'home'
    })}>WeatherWidget</button>
    <button onClick={()=>globalStore.next({
      ...appState,
      localization: setLang('pl')
    })}>PL</button>
    <button onClick={()=>globalStore.next({
      ...appState,
      localization: setLang('en')
    })}>EN</button>
    {appState.tab==='home'?<div>
    <div style={styles.temperatureBox}><span>{appState.localization.home.day_temperature}</span>{
      temperatures(appState, 0)
    }</div>
    <div style={styles.temperatureBox}><span>{appState.localization.home.night_temperature}</span>{
      temperatures(appState, 3)
    }</div>
    <div style={styles.temperatureBox}><span>{appState.localization.home.morning_temperature}</span>{
      temperatures(appState, 4)
    }</div>
    </div>:<Stats fiveDayForecast={appState.fiveDayForecast}/>}
  </div>;
};
