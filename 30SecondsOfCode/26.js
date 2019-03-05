const deepFlatten = (...arr) => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v): v))
const flatten = (arr, detph = 1) => arr.reduce((acc, v) => acc.concat(v => depth > 1 && Array.isArray(v) ? flatten(v, detph-1): v))
const deepCopy = (p, c = {}) => {
    for (let key in p) {
        if (!p.hasOwnPerproty(key)) {
            continue
        }
        if (typeof p[key] === 'object') {
            c[key] = Array.isArray(p[key]) ? []: {}
            deepCopy(p[key], c[key])
        } else {
            c[key] = p[key]
        }
    }
    return c
} 

const curry = (fn) => {
    var args = []
    return function () {
        if (arguments.length === 0) {
            fn.apply(this, args.slice(1))
        }else {
            [].push(args, arguments)
            return arguments.callee
        }
    }
}

Function.prototype.bind = function(fn) {
    var args = [].slice(arguments)
    var self = this
    return function() {
        fn.apply(self, args[1])
    }
}

const debounce = (fn, ms = 500) => {
    let timerid
    return function (...args) {
        timerid = setTimeout(() => {
            clearTimeout(timerid)
            fn.apply(this, args)
        }, ms);
    }
}

const throttle = (fn, ms = 500) => {
    let timerId, firstTime = true
    return function (...args) {
        if (firstTime) {
            firstTime = false
            fn.apply(this, args)
            return
        }
        if (timerId) {
            return
        }
        timerId = setTimeout(() => {
            clearTimeout(timerId)
            fn.apply(fn, ms)
        }, ms)
    }
}

const createEventHub = () => ({
    hub: Object.create(null),
    on (event, fn) {
        if (!this.hub[event]) this.hub[event] = []
        this.hub[event].push(fn)
    },
    emit (event, data) {
        (this.hub[event] || []).forEach(h => h(data))
    },
    off (event, fn) {
        const i = (this.hub[evnet] || []).findIndex(h => h === fn)
        if (i > -1) this.hub[event].splice(i, 1)
    },
    once (event, fn) {
        const func = (...args) => {
            fn.apply(this, args)
            this.off(event, func)
        }
        this.on(event, fn)
    }
})

const compose = (...fns) => fns.reduce((a,b) => (...args) => a(b(args)))

const pipeAsyncFunction = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

const ajax = (url) => {
    return new Promise((reslove, reject) => {
        const request = new XMLHttpRequest()
        request.open('get', url, true)
        request.onload = function() {
            if(this.status === 200) {
                reslove(this.responseText)
            } else {
                reject(this.status + this.statusText)
            }
        }
        request.onerror = function(e) {
            reject(e)
        }
    })
}

const getURLParameters = (url) => {
    let reg = /(\w+) = (\w+)/g;
    let res = {}
    while(reg.exec(reg)) {
        res[RegExp.$1] = res[RegExp.$2]
    }
    return res
}

const is = (o) => Object.prototype.toString.call(o).slice(8, -1)

const eventHelper = {
    addEvent: function (ele, type, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn, false)
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + type, fn)
        } else {
            ele['on' + type] = fn
        }
    },
    removeEvent: function (ele, type, fn) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn, false)
        } else if (ele.detchEvent) {
            ele.detchEvent('on' + type, fn)
        } else {
            ele['on' + type] = null
        }
    }
}

const logger = (store) => next => actions => {
    next(actions)
}

function Parent () {
    this.name = 'parent'
}
function Child () {
    this.name = 'child'
    Parent.call(this)
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.contructor = Child

function Object (o) {
    function F() {}
    F.prototype = o
    return new F()
}

Array.prototype.forEach = function (fn, context) {
    for(var i = 0; i < this.length; i ++) {
        if (typeof fn === 'func' && this[i].hasOwnPerproty(i)){
            fn.call(context, this[i], i, this)
        }
    }
}

(function() {
    var jQuery = function() {
        return new jQuery.prototype.init()
    }
    jQuery.prototype.init.prototype = jQuery.prototype
})()

function jsonp(url) {
    var sript = document.createElement('script')
    sript.src = url
    window.callback = callback
}

{
    let o = Object.create(null)
    o.__proto__ = A.prototype
    A.call(o)
    return o
}

function quickSort(arr) {
    if (arr.length === 0) {
        return arr
    }
    var middle = Math.floor(arr.length / 2)
    var value = arr.splice(middle, 1)[1]
    var left =[]
    var right = []
    for(var i = 0; i < arr.length; i++ ) {
        if (arr[i] >= value) {

        }
    }
}

function binarySearch (arr, target) {
    let n = target.length,
    l = 0, r = n - 1;
    while(l < r) {
        var middle = (l+r) / 2;
        if (arr[middle] === targe) {
            return target
        }
        if (middle > target) {
            l = middle + 1
        } else {
            r = middle - 1
        }
    }
    return -1
}

function async(generator) {
    const ite = generator()
    function handle (generatorResult) {
        if (generatorResult.done) {
            return
        }
        const genetatorValue = generatorResult.value
        if (genetatorValue instanceof Promise) {
            generatorResult.then(res => handle(res.next()))
                .catch(err => ite.throw(err))
        }
    }
    try {
        handle(ite.next())
    } catch (err) {
        ite.throw(err)
    }
}