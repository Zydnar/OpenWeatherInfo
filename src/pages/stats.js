import React, {useState, useEffect} from "react"

export default (props) => {
  return <div>
    <pre>{JSON.stringify(props.fiveDayForecast, null, 4)}</pre>
  </div>;
};
