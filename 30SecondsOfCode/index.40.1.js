const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

const sum = pipeAsyncFunctions(
    x => x + 1,
    x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
    x => x + 3,
    async x => (await x) + 4
  );
  (async () => {
    console.log(await sum(5)); // 15 (after one second)
  })();


  const promisify = func => (...args) => 
    new Promise((resolve, reject) => 
      func(...args, (err, result) => (err ? reject(err): resolve(result)))
  )

  const deepFlatten = arr => [].concat(...arr.map((v) => Array.isArray(v) ? deepFlatten(v) : v))


  const differenceBy = ((a, b , fn) => {
    const s = new Set(...fn(b));
    return b.filter(v => !s.has(fn(v)))
  })

  const filterNonUnique = (arr) => arr.filter(v => v.indexOf(arr) === v.lastIndexOf(arr))

  const flatten = (arr, depth = 1) => 
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1): v), [])


const initalize2DArray = (w, h, val = null) => 
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

const  union = (a, b) => Array.from(new Set([...a, ...b]))

// const union = (a, b) => [...new Set([...a, ...b])]


const pick = (obj, arr) => 
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});


const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({length: maxLength}).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i])
  })
}

const unzip = arr => 
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  )

const chainAsync = fns => {
  let curr = 0;
  const next = () => fns[curr++](next);
  next();
}  

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));