/**
 * Filters list of cities by names
 *
 * @param {{
    id: number,
    name: string,
    state: string,
    country: string,
    coord: {
      lon: number,
      lat: number
    }
  }[]} arr - list of cities
 @param {string} query
 * @return {{
    id: number,
    name: string,
    state: string,
    country: string,
    coord: {
      lon: number,
      lat: number
    }
  }[]}
 */
export const findCity = (arr, query) => arr
  .filter(obj=>obj.name.match(new RegExp(query, "g")));
