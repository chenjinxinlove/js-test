/**
 * countOccurrences  deepFlatten  differenceBy filterNonUnique
 */
// countOccurrences

const countOccurrences = (arr, val) => 
  arr.reduce((res, item) => (item === val ? res + 1 : res + 0 ), 0)


console.log(countOccurrences([1, 1, 2, 1, 2, 3], 1)); // 3

// deepFlatten

const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v): v)))

console.log(deepFlatten([1, [2], [[3], 4], 5])); // [1,2,3,4,5]


// differenceBy

const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(v => fn(v)));
  return a.filter(x => !s.has(fn(x)));
};

console.log(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)); // [1.2]
console.log(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x)); // [ { x: 2 } ]


// filterNonUnique

const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5])); // [1,3,5]