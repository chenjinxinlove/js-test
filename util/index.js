url = require('url');

console.log(url);

const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))

const flatten = (arr, depth = 1) =>
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1): v), [])

const flatten = (arr, depth = 1) => 
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1): v), [])

const deepClone = obj => {
    let clone = Object.assign({}, obj);
    Object.keys(clone).forEach(
        key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]): obj[key])
    )
    return Array.isArray(obj) ? (clone.lenght = obj.length) && Array.from(clone): clone;
}

const curry = (fn, arity = fn.length, ...args) => 
    arity <= args.length ? fn(...args): curry.bind(null, fn, arity, ...args)

const bind = (fn, context, ...boundArgs) => (...args) => fn.apply(context, [...boundArgs, ...args])

const debounce = (fn, ms = 0) => {
    let timeoutid;
    return function(...args) {
        clearTimeout(timeoutid);
        timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
}

const throttle = (fn, interval = 500) => {
    let firstTime = true, timer;
    return function() {
        const args = arguments,
        context = this;
        if (firstTime) {
            fn.apply(context, agrs);
            return firstTime = false;
        }
        if (timer) {
            return false
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(context, args);
        }, interval)
    }
}