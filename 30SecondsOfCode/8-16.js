/**
 * Created by chenjinxin on 2018/3/18.
 */
promisify
rearg
bifurcate
chunk
compact
countBy
countOccurrences
deepFlatten

// {
//   "id": "promisify",
//   "muns": "9"
//   "descEn":"Converts an asynchronous function to return a promise.",
//   "descCn":"转换异步函数返回一个promise。",
//   "es6: "const promisify = func => (...args) =>new Promise((resolve, reject) =>func(...args, (err, result) => (err ? reject(err) : resolve(result))));",
//   "es5: "var promisify = function promisify(func) {return function () {var args = [].slice.call(arguments);return new Promise(function (resolve, reject) {return func.apply(undefined, args.concat([function (err, result) {return err ? reject(err) : resolve(result);}]));});};};",
//   "test: "const delay = promisify((d, cb) => setTimeout(cb, d));delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s",
//   "difficulty":'1'
// }

// var promisify = function promisify(func) {
//   return function () {
//     var args = [].slice.call(arguments);
//     return new Promise(function (resolve, reject) {
//       return func.apply(undefined, args.concat([function (err, result) {
//         return err ? reject(err) : resolve(result);
//       }]));
//     });
//   };
// };
//
//
// const promisify = (func) => (...args) =>
//     new Promise((resolve, reject) => {
//       func(...args, (err, result) => err ? reject(err) : resolve(result))
//     })result


// {
//   "id": "rearg",
//   "muns": "10"
//   "descEn":"Creates a function that invokes the provided function with its arguments arranged according to the specified indexes.",
//   "descCn":"Creates a function that invokes the provided function with its arguments arranged according to the specified indexes.",
//   "es6: "const rearg = (fn, indexes) => (...args) =>fn(...args.reduce((acc, val, i) => ((acc[indexes.indexOf(i)] = val), acc),Array.from({ length: indexes.length })));",
//   "es5: "var rearg = function (fn, indexes) {return function () {var args = [].slice.call(arguments);var d = args.reduce(function (acc, val, i) {acc[indexes.indexOf(i)] = val;return acc;}, Array(3))return fn.apply(null, d}}",
//   "test: "const delay = promisify((d, cb) => setTimeout(cb, d));delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s",
//   "difficulty":'2'
// }

var rearged = rearg(
  function(a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);
rearged('b', 'c', 'a'); // ['a', 'b', 'c']


const rearg = (fn, indexes) => (...args) =>
  fn(
    ...args.reduce(
      (acc, val, i) => (
        (acc[indexes.indexOf(i)] = val), acc),
      Array.from({ length: indexes.length })
    )
  );

var rearg = function (fn, indexes) {
  return function () {
    var args = [].slice.call(arguments);
    var d = args.reduce(function (acc, val, i) {
      acc[indexes.indexOf(i)] = val;
      return acc;
    }, Array(3))
    return fn.apply(null, d)
  }
}

var rearged = rearg(
  function(a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);
console.log(rearged('b', 'c', 'a')); // ['a', 'b', 'c']



// {
//   "id": "bifurcate",
//   "muns": "11",
//   "name": "分叉"
//   "descEn":"Splits values into two groups. If an element in filter is truthy, the corresponding element in the collection belongs to the first group; otherwise, it belongs to the second group.",
//   "descCn":"将值分成两组。如果在过滤器的元素是真相，集合中的对应元素属于第一集团；否则，它属于第二组。",
//   "es6: "const rearg = (fn, indexes) => (...args) =>fn(...args.reduce((acc, val, i) => ((acc[indexes.indexOf(i)] = val), acc),Array.from({ length: indexes.length })));",
//   "es5: "var rearg = function (fn, indexes) {return function () {var args = [].slice.call(arguments);var d = args.reduce(function (acc, val, i) {acc[indexes.indexOf(i)] = val;return acc;}, Array(3))return fn.apply(null, d}}",
//   "test: "const delay = promisify((d, cb) => setTimeout(cb, d));delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s",
//   "difficulty":'2'
// }


