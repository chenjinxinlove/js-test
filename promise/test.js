const PENDING = 'PENDING' // Promise 的 初始状态
const FULFILLED = 'FULFILLED' // Promise 成功返回后的状态
const REJECTED = 'REJECTED' // Promise 失败后的状态

const isPromise = object => object && object.then && typeof object.then === 'function'
const noop = () => {}

const statusProvider = (promise, status) => data => {
    if (promise.status !== PENDING) return false
    promise.status = status
    promise.result = data
    switch(status) {
        case FULFILLED: return promise.successListener.forEach(fn => fn(data))
        case REJECTED: return promise.failurelistener.forEach(fn => fn(data))
    }
}

class APromise {
    constructor(executor) {
        this.status = PENDING
        this.successListener = []
        this.failurelistener = []
        this.result = undefined
        executor(statusProvider(this, FULFILLED), statusProvider(this, REJECTED))
    }
    /**
     * Promise原型上面的方法
     */
    then(...args) {
        const child = new this.constructor(noop)

        const handler = fn => data => {
            if (typeof fn === 'function') {
                const result = fn(data)
                if (isPromise(result)) {
                    Object.assign(child, result)
                } else {
                    statusProvider(child, FULFILLED)(result)
                }
            } else if(!fn) {
                statusProvider(child, this.status)(data)
            }
        }
        switch (this.status) {
            case PENDING: {
                this.successListener.push(handler(args[0]))
                this.failurelistener.push(handler(args[1]))
                break
            }
            case FULFILLED: {
                handler(args[0])(this.result)
                break
            }
            case REJECTED: {
                handler(args[1])(this.result)
                break
            }
        }
        return child
    }
    catch(arg) {
        return this.then(undefined, arg)
    }
}


var promise = new APromise(function (resolve, reject) {
   setTimeout(function () {
       resolve('1')
   }, 2000)
});

promise.then(function (data) {
    debugger;
    return data + '2';
}).then(function (d) {
   console.log(d)
});