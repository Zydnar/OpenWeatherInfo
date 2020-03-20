export const insert = (value) =>_;
export const showMin = (arr) => Math.min(...arr);
export const showMax = (arr) => Math.max(...arr);
/**
 * @param {number[]} arr
 * @return {number}
 */
export const showMean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length
export const dedup = arr => [...new Set(arr)];
export const mode = (arr) => {
  const values = dedup(arr)
  const result = values.map(num => [num, arr.filter(n => n === num).length]).sort((arrA, arrB) => {
    if (arrA[1] > arrB[1]) return 1
    if (arrA[1] < arrB[1]) return -1
    else return 0
  })
  return result[result.length - 1]
};