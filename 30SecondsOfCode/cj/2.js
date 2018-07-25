const unzip = arr =>
    arr.reduce(
        (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
        Array.from({
            length: Math.max(...arr.map(x => x.length))
        }).map(x => [])
    )

console.log(unzip([['a', 1, true], ['b', 2, false]])) //[['a', 'b'], [1, 2], [true, false]]


const chainAsync = fns => {
    let curr = 0;
    const next = () => fns[curr++](next);
    next()
} 

chainAsync([
    next => {
      console.log('0 seconds');
      setTimeout(next, 1000);
    },
    next => {
      console.log('1 second');
    }
  ]);

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = compose(add5, multiply)
console.log(multiplyAndAdd5(5, 2)) //-> 15

const curry = (fn, arity = fn.length, ...args) => 
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)

curry(Math.pow)(2)(10) //-> 1024
curry(Math.min, 3)(10)(50)(2) //-> 2

const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve())

const delay = d => new Promise(r => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]);


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