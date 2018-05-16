/**
 * promisify  chunk  compact  countBy
 */

// promisify   需要重点掌握
// const promisify = func => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => (err ? reject(err) : resolve(result))));
var promisify = function promisify(func) {
    return function () {
        var args = [].slice.call(arguments);
        return new Promise(function (resolve, reject) {
            return func.apply(undefined, args.concat([function (err, result) {
                return err ? reject(err) : resolve(result);
            }]));
        });
    };
};
const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s"


// chunk 

const chunk = (arr, len) => {
    let array = []
    return arr.reduce((res, item, index) => {

        array.push(item);
        if(array.length === len || index === array.length - 1) {
            res.psuh(array)
            array = []
        }
        return res
    }, [])
}

// const chunk = (arr, size) = Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>arr.slice(i * size, i * size + size));

console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1,2],[3,4],[5]]


// compact

const compact = arr => arr.filter(Boolean);

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]


// countBy
const countBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

console.log(countBy([6.1, 4.2, 6.3], Math.floor)); // {4: 1, 6: 2}
console.log(countBy(['one', 'two', 'three'], 'length')); // {3: 2, 5: 1}