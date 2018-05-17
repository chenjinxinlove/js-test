/**
 * flatten groupBy initialize2DArray intersection
 */

//  flatten

const flatten = (arr, depth = 1) =>
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), [])

console.log(flatten([1, [2], 3, 4])); // [1, 2, 3, 4]
console.log(flatten([1, [2, [3, [4, 5], 6], 7], 8], 2)); // [1, 2, 3, [4, 5], 6, 7, 8]


// groupBy



const groupBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {});


console.log(groupBy([6.1, 4.2, 6.3], Math.floor)); // {4: [4.2], 6: [6.1, 6.3]}
console.log(groupBy(['one', 'two', 'three'], 'length')); // {3: ['one', 'two'], 5: ['three']}

// initialize2DArray
const initialize2DArray = (w, h, val = null) => 
  Array.from({length: h}).map(() => Array.from({lengthL: w}).fill(val))

console.log(nitialize2DArray(2, 2, 0)); // [[0,0], [0,0]]

// intersectio
const intersection = (a, b) => {
    const s = new Set(b);
    return a.filter(x => s.has(x))
}

intersection([1, 2, 3], [4, 3, 2]); // [2,3]