const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

const promise = function (arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(arg)
        }, 500)
    })
}

promise(5).then((data) => {
    console.log(data)
    return data
}).then((data) => {
    console.log(data + '11')
})

// 上面展示了，单个promise函数是怎么运行
// 当有一组函数时，也要那样执行，当第一个参数，不是一个primose的对象时，需要把它变成一个promise传入
// reduce 函数

// array.reduce(callback[, initialValue])
// callback函数接受4个参数：之前值、当前值、索引值以及数组本身。initialValue参数可选，表示初始值。若指定，则当作最初使用的previous值；如果缺省，则使用数组的第一个元素作为previous初始值，同时current往后排一位，相比有initialValue值少一次迭代。

// var sum = [1, 2, 3, 4].reduce(function (previous, current, index, array) {
//   return previous + current;
// });

// console.log(sum); // 10
// 说明：

// 因为initialValue不存在，因此一开始的previous值等于数组的第一个元素。
// 从而current值在第一次调用的时候就是2.
// 最后两个参数为索引值index以及数组本身array.

// 利用reduce的递归特性，初始化第一个参数，为promise,Promise.resolve(arg)就是上面promise的代码实现

const sum = pipeAsyncFunctions(
    x => x + 1,
    x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
    x => x + 3,
    async x => (await x) + 4
  );
  (async () => {
    console.log(await sum(5)); 
  })();

// const delay = promisify((d, cb) => setTimeout(cb, d));
// delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s


function delay(arg, callback) {
    setTimeout(() => {
        callback(arg + '1')
    }, 1000);
}

delay(5, function(arg){
    console.log(arg)
})

const promisify = func => (...args) =>
    new Promise((resolve, reject) => func(...args, (err, result) => (err ? reject(err): resolve(result))))


// 开始传入函数，在出入函数需要的参数，为了转化成primise，执行函数，自己写callback，错误返回reject，成功resolve

const deepFlatten = arr => [].concat(...arr.map((v) => Array.isArray(v) ? deepFlatten(v) : v))

// concat可以连接数组 [].concat([1,2,3,4], [4,5,6,7]) => [1, 2, 3, 4, 4, 5, 6, 7]
// 然后试试map来变量数组，是数组的递归扁平，不是数组的返回[]


// deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]

const differenceBy = ((a, b, fn) => {
    const s = new Set(...fn(b));
    return b.filter(v => !s.has((fn(v))))
  })

// 利用new Set 来把一个数组的去重，然后在利用filter来进行比较



  const filterNonUnique = (arr) => arr.filter(v => arr.indexOf(v) === arr.lastIndexOf(v))
//   [1, 2, 2, 3, 4, 4, 5].indexOf(5) => 6 [1, 2, 2, 3, 4, 4, 5].lastIndexOf(5) => 6
// indexOf是从前面开始遍历，lastindexof是从后面开始遍历，但是位置都是从前面算的，但是如果是有重复的书就不一样了

// console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5])); // [1,3,5]

const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), [])

// flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]

const shuffle = arr => {
    let m = arr.length;
    while (m) {
        const i = Math.floor(Math.random() * m--); // 产生在循环只内的随机数
        [arr[m], arr[i]] = [arr[i], arr[m]];// 交换两个值
    }
    return arr
}

// console.log(shuffle([1,2,3]))

const union = (a, b) => [...new Set([...a, ...b])]
const union = (a, b) => Array.from(new Set([...a, ...b]))

// console.log(union([1,2,3], [4,3,2]))

// const pick = (obj, arr) => 
//     arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {})

// console.log( pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']))


// const zip = (...arrays) => {
//     const maxLength = Math.max(...arrays.map(x => x.length));
//     return Array.from({length: maxLength}).map((_, i) => {
//         return Array.from({length: arrays.length}, (_, k) => arrays[k][i])
//     })
// }

// console.log(zip(['a', 'b'], [1, 2], [true, false]))