const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))


const sum = pipeAsyncFunctions(
    x => x + 1,
    x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
    x => x + 3,
    async x => (await x) + 4
  );
  (async () => {
    console.log(await sum(5)); 
  })();

const promisify = func => (...args) =>
    new Promise((resolve, reject) => func(...args, (err, result) => (err ? reject(err): resolve(result)))
)  

const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s


const deepFlatten = arr => [].concat(...arr.map((v) => Array.isArray(v) ? deepFlatten(v) : v))

deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]

const differenceBy = ((a, b, fn) => {
    const s = new Set(...fn(b));
    return b.filter(v => !s.has((fn(v))))
  })


  const filterNonUnique = (arr) => arr.filter(v => arr.indexOf(v) === arr.lastIndexOf(v))

console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5])); // [1,3,5]

const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), [])

flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]

const shuffle = arr => {
    let m = arr.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr
}

console.log(shuffle([1,2,3]))

const union = (a, b) => [...new Set([...a, ...b])]

console.log(union([1,2,3], [4,3,2]))

const pick = (obj, arr) => 
    arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {})

console.log( pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']))


const zip = (...arrays) => {
    const maxLength = Math.max(...arrays.map(x => x.length));
    return Array.from({length: maxLength}).map((_, i) => {
        return Array.from({length: arrays.length}, (_, k) => arrays[k][i])
    })
}

console.log(zip(['a', 'b'], [1, 2], [true, false]))