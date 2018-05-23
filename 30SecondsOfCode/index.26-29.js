/**
 * union unzip zip bottomVisible
 */
// 


// const union = (a, b) => [...new Set([...a, ...b])]

const union = (a, b) => Array.from(new Set([...a, ...b]))

console.log(union([1, 2, 3], [4, 3, 2])) // [1,2,3,4]"

// unzip

const unzip = arr => 
    arr.reduce(
        (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
        Array.from({
            length: Math.max(...arr.map(x => x.length)).map(x => [])
        })
    )

console.log(unzip([['a', 1, true], ['b', 2, false]])); //[['a', 'b'], [1, 2], [true, false]]


const zip = (...arrays) => {
    const maxLength = Math.max(...arrays.map(x => x.length));
    return Array.from({length: maxLength}).map((_, i) => {
        return Array.from({length: arrays.length}, (_, k) => arrays[k][i]);
    })
}

console.log(zip(['a', 'b'], [1, 2], [true, false])); // [['a', 1, true], ['b', 2, false]]
console.log(zip(['a'], [1, 2], [true, false])); // [['a', 1, true], [undefined, 2, false]]


// bottomVisible

const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);