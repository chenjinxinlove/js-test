// 1 const deepFlatten =
// 2 const flatten =
// 3 const  deepCopy =
// 4 const  curry && uncurry
// 5 Function.prototype.bind =
// 6 const debounce =
// 7 const throttle =
// 8 const createEventHub =
// 9 const compose =
// 10 const pipeAsyncFunctions =
// 11 const  ajax =
// 12 const getURLParameters
// 13 const is =
// 14 const eventHelper =
// 15 const logger 和 trunk
// 16 class
// 17 foreach
// 18 jQuery
// 19 jsonp
// 20 new
// 21 quickSort
// 22 binarySearch
// 23 async
// 24 instanceof
// 25 redux

const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v): v ))
const flatten = (arr, depth = 1) => arr.reduce((acc, v) => acc.concat(v => depth > 1 && Array.isArray(v) ? flatten(v, depth - 1): v) , [])
const deepCopy = (p, c = {}) => {
    for (let i in p) {
        if (!p.hasOwnProperty(i)) {
            continue
        }
        if (typeof p[i] === 'object') {
            c[i] = Array.isArray(p[i]) ? [] : {}
            deepCopy(p[i], c[i])
        } else {
            c[i] = p[i]
        }
    }
    return c
}

const curry = (fn) => {
    var args = []
    return  function() {
        if (arguments.length === 0) {
            fn.apply(this, args.slice(1))
        } else {
            [].push.call(args, arguments)
            return arguments.callee
        }
    }
}

const curry = (fn) => {
    var args = []
    return function() {
        if (arguments.length === 0) {
            fn.apply(this, args.slice(1))
        }
    }
}

Function.prototype.bind = function(context) {
    var self = this,
    var args = [].slice.call(arguments)
    return function() {
        return self.apply(context, args[1])
    }
}

const debounce = (fn, ms = 500) => {
    let timerId
    return function (...args) {
        timerId = setTimeout(() => {
            clearTimeout(timerId)
            fn.apply(this, args)
        }, ms)
    }
}

const throttle = (fn, ms = 500) => {
    let timerId, firstTime = true;
    return function(...args) {
        if(firstTime) {
            firstTime = false
            fn.apply(this, args)
            return
        }
        if (timerId) {
            return
        }
        timerId = setTimeout(function() {
            fn.apply(this, args)
            clearTimeout(timerId)
        }, ms)
    }
}


createEventHub = () => ({
    hub: Object.create(null),
    emit(event, data) {
        (this.hub[event] || []).forEach(h => h(data))
    },
    on(event, fn) {
        if (!this.hub[event]) this.hub[event] = []
        this.hub[event].push(fn)
    },
    off(event, fn) {
        let i = (this.hub[event] || []).findIndex(h => h === fn)
        if (i > -1) this.hub[event].splice(i, 1)
    },
    once(event, fn) {
        const funs = (...args) => {
            fn.apply(this, args)
            this.off(event, funs)
        }
        this.on(event, fn)
    }
})

const compose = (...fns) => fns.reduce((a,b) => (...args) => a(b(args)))

const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

const createStore = (reducer) => {
    let state = {}
    let listeners = []
    const getState = () => state
    const dispatch = (action) => (reducer) => {
        state = reducer(state, action)
        listeners.forEach(fn => fn())
    } 
    let subscribe = (listener) => {
        listener.push(listener)
    }
    dispatch({type: 'adads', paulaod: ''})
}
