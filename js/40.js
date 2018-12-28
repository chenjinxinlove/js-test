const deepFlatten = arr => arr.concat(...arr.map(v => {
    return Array.isArray(v) ? deepFlatten(v) : v  
})
)
const flatten = (arr, depth = 1) => arr.reduce((acc, v) => {
    return acc.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1): v)
}, [])

const deepClone = obj => {
    const c = {};
    Object.keys(obj).forEach(
        key => (c[key] = typeof obj[key] === 'object' ? deepClone(obj[key]): obj[key])
    )
    return Array.isArray(obj) ? Array.from(clone) : c
}

const curry = (fn, arity = fn.length, ...args) =>
    arity <= args.length ? fn(...args): curry.bind(null, fn, arity, ...args)

const sun = (...agrs) => {
    let fir = arguments[0]
    if (args.length === 2) {
        return args[0] + args[1]
    } else {
        return function (sec) {
            return fir + src
        }
    }
}

const bind = (fn, context, ...boundArgs) => (...args) => fn.apply(context, [...boundArgs, ...args])

if(!function(){}.bind) {
    Function.prototype.bind = function(context) {
        var selft = this,
        args = [].slice.call(arguments)
        return function () {
            return function () {
                return self.apply(context, args.slice(1))
            }
        } 
    }
}

const statusProvider = (promise, status) => data => {
    if (promise.status !== PENDING) return false
    promise.status = status
    promise.result = data
    switch(status) {
        case FULFILLED: return promise.successListener.forEach(fn => fn(data))
        case REJECTED: return promise.failureListener.forEach(fn => fn(data))
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.successListener = []
        this.failureListener = []
        this.result = undefined
        executor(statusProvider(this, FULFILLED), statusProvider(this, REJECTED))
    }
    then(...args) {
        switch (this.status) {
            case PENDING: {
                this.successListener.push(args[0])
                this.failureListener.push(args[1])
            }
            case FULFILLED: {
                args[0](this.result)
                break
            }
            case REJECTED: {
                args[1](this.result)
            }
        }
    }
    catch(arg) {
        return this.then(undefined, arg)
    }
}

const debounce = (fn, ms = 500) => {
    let timer;
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => fn.apply(fn, args), ms)
    }
}

const throttle = (fn, interval = 500) => {
    let firstTime = true, timer;
    return function (...args) {
        if (firstTime) {
            fn.apply(this, args)
            firstTime = false
            return
        }
        if (timer) {
            return false
        }
        timer = setTimeout(() => {
            clearTimeout(timer)
            fn.apply(this, args)
        }, interval)
    }
}

const createEventHub = () => ({
    hub: Object.create(null),
    emit(event, data) {
        (this.hub[event] || []).forEach(handler => handler(data))
    },
    on(event, handler) {
        if (!this.hub[event]) this.hub[event] = []
        this.hub[event].push(handler)
    }
})

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))) 

const pipeAsyncFunction = (...fns) => args => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

const getUrlPar = url => {
    let obj = {}
    const reg = /(\w+)=(\w+)/g
    while(reg.exec(url)) {
        obj[RegExp.$1] = RegExp.$2
    }
    return obj
}

{}.toString.call(o)



const EventHelper = {
    addEvent: function (ele, type, func) {
        if (ele.addEventListener) {
            ele.addEventListener(type, func, false)
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + type, func)
        } else {
            element['on' + type] = func
        }
    },
    removeEvent: function (ele, type, func) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, func, false)
        } else if (element.attachEvent) {
            element.detachEvent('on' + type, func)
        } else {
            element['on' + type] = null
        }
    }
}


const logger = store => next => action => {
    return next(action)
}

function Parent () {
    this.name = 'parent'
}
function Child () {
    Parent.call(this)
    this.age = 23
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child


if(typeof Array.prototype.forEach !== 'function') {
    Array.prototype.forEach = function (fn, context) {
        for(var i = 0, len = this.length; i < len; i++) {
            if (typeof fn === 'function' && this.hasOwnProperty(i)) {
                fn.call(context, this[i], i, this)
            }
        }
    }
}

obj.__proto__ = F.prototype
F.call(obj)
return obj