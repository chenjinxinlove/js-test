//[ə'dæptɚ]  适配器

// 1、ary
//创建一个函数，该函数接受最多n个参数，忽略任何附加参数。



// const ary = (fn, n) =>(...args) => fn(...agrs.slice(0, n));

var ary = function (fn, n) {
    return function () {
        return fn.apply(null, [].slice.call(arguments, 0, n))
    }
}

const firstTwoMax = ary(Math.max, 2);
console.log([[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x)));

//2、call
//给定一个键和一组参数，在给定上下文时调用它们。

// const call = (key, ...args) => context => context[key](...agrs);

var call = function (key) {
    var args = [].slice.call(arguments, 1);
    return function (context) {
        return context[key].apply(context, args);
    }
}

Promise.resolve([1, 2, 3])
    .then(call('map', x => 2 * x))
    .then(console.log); //[ 2, 4, 6 ]
const map = call.bind(null, 'map');
Promise.resolve([1, 2, 3])
    .then(map(x => 2 * x))
    .then(console.log); //[ 2, 4, 6 ]

//3、collectInto

// const collectInto = fn => (...args) => fn(args);
var collectInto = function (fn) {
    return function () {
        return fn([].slice.call(arguments))
    }
}


const Pall = collectInto(Promise.all.bind(Promise));
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
Pall(p1, p2, p3).then(console.log); // [1, 2, 3] (after about 2 seconds)

