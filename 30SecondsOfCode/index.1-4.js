// call
// collectInto
// flip
// pipeFunctions

/**
 * 1 call
 */

// const call = (key, ...args) => (context) => context[key](...args)

var call = function (key) {
    var args = [].slice.call(arguments, 1);
    return function (context) {
        constext[key].apply(context, args)
    }
}

var map = call('map', x => 2 * x);
// console.log(map([1,2,3]))//[2, 4, 6]

/**
 * 2 collectInto
 */

// const collectInto = (fn) => (...args) => fn(args)

var collectInto = function (fn) {
    return function() {
        fn([].slice.call(arguments))
    }
}

const pall = collectInto(function (arr) {console.log(arr);});
// console.log(pall(1, 2, 3));//[1, 2, 3]"


/**
 * 3 flip
 */

const flip = fn => (first, ...rest) => fn(...rest, first)

var f = flip(function(f,d){console.log(f,d)});
console.log(f(1,2))


/**
 * pipeFunctions
 */

 const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

const add5 = x => x + 5;const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
console.log(multiplyAndAdd5(5, 2)); // 15