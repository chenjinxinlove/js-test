const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
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

  const promisify = func => (...args) =>
    new Promise((resolve, reject) => 
    func(...args, (err, result) => (err ? reject(err): resolve(result)))
  )

  const deepFlatten = arr => [].concat(...arr.map((v) => Array.isArray(v) ? deepFlatten(v) : v))
  const deepFlatten = arr => [].concat(...arr.map((v) => Array.isArray(v) ? deepFlatten(v) : v))

  const differenceBy = ((a, b, fn) => {
    const s = new Set(...fn(b));
    return b.filter(v => !s.has(fn(v)))
  })

  const differenceBy = ((a, b, fn) => {
    const s = new Set(...fn(b));
    return b.filter(v => !s.has((fn(v))))
  })


  const filterNonUnique = (arr) => arr.filter(v => v.indexOf(arr) === v.lastIndexOf(arr))

  const filterNonUnique = (arr) => arr.filter(v => v.indexOf(arr) === v.lastIndexOf(arr))

  const flatten = (arr, depth = 1) => 
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1): v), [])

  const flatten = (arr, depth = 1) =>
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1): v), [])  

const initalize2DArray = (w, h, val = null) => 
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));


const initalize2DArray = (w, h, val = null) =>
  Array.from({length: h}).map(() => Array.from({length: w}).fill(val))  

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}


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

const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({length: maxLength}).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i])
  })
}

const zip = (...arrays) => {
  const maxLength = Math.max(...arrays.map(x => x.length));
  return Array.from({length: maxLength}).map((_, i) => {
    return Array.from({length: arrays.length}, (_, k) => arrays[k][i])
  })
}

const unzip = arr => 
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  )

const unzip = arr => 
  arr.reduce(
    (acc,val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  )

const chainAsync = fns => {
  let curr = 0;
  const next = () => fns[curr++](next);
  next();
} 

const chainAsync = fns => {
  let curr = 0;
  const next = () => fns[curr++](next);
  next();
}

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));


const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);


const delay = d => new Promise(r => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]);


const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve())


const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

const memoize = fn => {
  const cache = new Map();
  const cached = function(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val) && cache.get(val));
  };
  cached.cache = cache;
  return cached;
}

const once = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  }
}

var throttle = function ( fn, interval ) {
  var __self = fn, // 保存需要被延迟执行的函数引用
          timer, // 定时器
          firstTime = true; // 是否是第一次调用
  return function () {
      var args = arguments,
              __me = this;
      if ( firstTime ) { // 如果是第一次调用，不需延迟执行
          __self.apply(__me, args);
          return firstTime = false;
      }
      if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
          return false;
      }
      timer = setTimeout(function () { // 延迟一段时间执行
          clearTimeout(timer);
          timer = null;
          __self.apply(__me, args);
      }, interval || 5000 );
  };
};


const uncurry = (fn, n = 1) => (...args) => {
  const next = acc => args => args.reduce((x, y) => x(y), acc);
  if (n > args.length) throw new RangeError('arguments too few');
  return next(fn)(args.slice(0, n))
}

const bindAll = (obj, ...fns) =>
  fns.forEach(
    fn => (
      (f = obj[fn]),
      (obj[fn] = function() {
        return f.apply(obj)
      })
    )
  )

const deepClone = obj => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
}

const flattenObject = (obj, prefix = '') => 
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});


  const pad = (str, length, char = ' ') => 
    str.padStart((str.length + length) / 2, char).padEnd(length, char);

const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

const fromCamelCase = (str, separator = '_') => 
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();

const reverseaString = str => [...str].reverse().join();

const toCamelCase = str => {
  let s = 
    str && 
    str
  .match(/[A-Z]{2, 0}(?=[A-Z][a-z]+[0-9]*|\b) | [A-Z]?[a-z]+[0-9]* | [A-Z]|[0-9]+/g)
  .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
  .join('');
  return s.slice(0, 1).toLowerCase() + s.slice()
}

const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

const is = (type, val) => ![, null].includes(val) && val.constructor === type;


const isPromiseLike = obj => 
  obj !== null &&
  (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'


  const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );

const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
}  

const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
 }

 const parseCookie = str => 
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {})
    
const fibonacci = n => 
    Array.from({ length: n }).reduce(
      (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i)
    )