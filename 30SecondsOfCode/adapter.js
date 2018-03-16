// //[ə'dæptɚ]  适配器
//
// // 1、ary
// //创建一个函数，该函数接受最多n个参数，忽略任何附加参数。
//
//
//
// // const ary = (fn, n) =>(...args) => fn(...agrs.slice(0, n));
//
// var ary = function (fn, n) {
//     return function () {
//         return fn.apply(null, [].slice.call(arguments, 0, n))
//     }
// }
//
// const firstTwoMax = ary(Math.max, 2);
// console.log([[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x)));
//
// //2、call
// //给定一个键和一组参数，在给定上下文时调用它们。
//
// // const call = (key, ...args) => context => context[key](...agrs);
//
// var call = function (key) {
//     var args = [].slice.call(arguments, 1);
//     return function (context) {
//         return context[key].apply(context, args);
//     }
// }
//
// Promise.resolve([1, 2, 3])
//     .then(call('map', x => 2 * x))
//     .then(console.log); //[ 2, 4, 6 ]
// const map = call.bind(null, 'map');
// Promise.resolve([1, 2, 3])
//     .then(map(x => 2 * x))
//     .then(console.log); //[ 2, 4, 6 ]
//
// //3、collectInto
//
// // const collectInto = fn => (...args) => fn(args);
// var collectInto = function (fn) {
//     return function () {
//         return fn([].slice.call(arguments))
//     }
// }
//
// const pall = collectInto(function (arr) {
//     console.log(arr);
// });
//
// pall(1, 2, 3);
//
// const Pall = collectInto(Promise.all.bind(Promise));
// let p1 = Promise.resolve(1);
// let p2 = Promise.resolve(2);
// let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
// Pall(p1, p2, p3).then(console.log); // [1, 2, 3] (after about 2 seconds)
//
// //4flip  翻转
//
//const flip = fn => (first, ...rest) => fn(...rest, first)

var flip = function (fn) {
  return function () {
      var args = [].slice.call(arguments);
      var first = args[0];
      args.shift();
      args.push(first);
      return fn.apply(fn, args)
  }
};

var f = flip(function(f,d){console.log(f,d)})
f(1,2)

// let a = { name: 'John Smith' };
// let b = {};
// const mergeFrom = flip(Object.assign);
// let mergePerson = mergeFrom.bind(null, a);
// mergePerson(b); // == b
// b = {};
// Object.assign(b, a); // == b
//
// //5 over   越过
// //const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args))
//
var over  = function () {
    var fns = [].slice.call(arguments);
    return function () {
        var args = [].slice.call(arguments);
        return fns.map(function (fn) {
            return fn.apply(null, args);
        })
    }
}
//
// //6 overArgs
// const overArgs = (fn, transforms) => (...args) => fn(...args.map((val, i) => transforms[i](val)))

var overArgs = function (fn, transforms) {
    return function () {
        var args = [].slice.call(arguments);
         return args.map(function (val, i) {
             return transforms[i](val)
        })
    }
}

const square = n => n * n;
const double = n => n * 2;
const fn = overArgs((x, y) => [x, y], [square, double]);
console.log(fn(9, 3)); // [81, 6]