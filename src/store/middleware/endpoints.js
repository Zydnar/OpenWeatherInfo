const API_KEY = "7cec6cd7f156656576e2f0672b9608d9";

/* ************* GET ************ */
/**
 * 5 day / 3 hour forecast data
 *
 * @param {number} cityID - ID of a city by IDs from city.list.json
 * @return {string} - URL for API request
 */
export const fiveDayForecastByCityID = cityID => `http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${API_KEY}&cnt=5`;
