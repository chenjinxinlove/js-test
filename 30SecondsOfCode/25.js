const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v): v))
const flatten = (arr, depth = 1) => arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1): v), [])
const deepCopy = (p, c = {}) => {
    for (var key of p) {
        if (!p.hasOwnProperty(key)) {
            continue;
        }
        if (typeof p[key] === 'object') {
            c[key] = Array.isArray(p[key]) ? [] : {}
            deepCopy(p[key], c[key])
        } else {
            c[key] = p[key]
        }
    }
    return c
}
const  curry = function(fn) {
    var args = [];
    return function() {
        if (arguments.length === 0) {
            fn.apply(this, args.slice(1))
        } else {
            [].push.apply(args, arguments)
            return arguments.callee
        }
    }
} 

Function.prototype.bind = function(context) {
    var self = this,
        args = [].slice.call(arguments);
    return function() {
        return self.apply(context, args[1])
    }
}

const debounce = (fn, ms=500) => {
    let timerId;
    return function (...args) {
        timerId = setTimeout(() => {
            clearTimeout(timerId);
            fn.apply(this, args)
        }, ms);
    }
}
const throttle = (fn, ms = 500) => {
    let timerId, firstTime = true;
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
            fn.apply(this, args)
        }, ms);
    }
}
const createEventHub = () => ({
    hub: Object.create(null),
    emit(event, data) {
        (this.hub[event] || []).forEach(h => h(data))
    },
    on(event, fn) {
        if(!this.hub[event]) this.hub[event] = []
        this.hub[event].push(fn)
    },
    off(event, fn) {
        const i = (this.hub[event] || []).findIndex(h => h === fn)
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
const compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)))
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))



const  getJson(url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function () {
            try {
                if (this.status === 200) {
                    resolve(JSON.parse(this.response));
                } else {
                    reject(this.status + " " + this.statusText)
                }
            } catch(e) {
                reject(e.message)
            }
        }
        request.onerror = function () {
            reject(this.status + " " + this.statusText)
        }
        request.send()
    })
}
const getURLParameters = (url) => {
    let res = {}, reg = /(\w+) =(\w+)/g;
    while(reg.exec(url)) {
        res[RegExp.$1] = RegExp.$2
    }
    return res
}
const is = (o) => Object.prototype.toString.call(o).slice(8,-1).toLowerCase()
const eventHelper = {
    addEvent: function(ele, type, func) {
        if (ele.addEventListenner) {
            ele.addEventListenner(type, func, false)
        } else if (ele.attachEvent / detachEvent) {
            ele.attachEvent('on' + type, func)
        } else {
            ele['on' + type] = fn
        }
    }
}
const logger = store => next => action => {
    window.console.log(action)
    return next(action)
}

const trunk = ({dispatch, getState}) => next => action => {
    if (typeof action == 'function') {
        return action(dispatch, getState)
    }
    return next(action)
}

function Parent () {
    this.name = 'parent'
    this.paly = '1'
}
function Child () {
    Parent.call(this);
    this.type = 'child'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.construtor = Child

function object(o) {
    function F() {};
    F.prototype = o;
    return new F()
}

Array.prototype.forEach = function (fn, context) {
    for(var i = 0, len = this.length; i < len; i++) {
        if (typeof fn === 'function' && this.hasOwnProperty(i)) {
            fn.call(context, this[i], i, this)
        }
    }
}

(function(window, undefined) {
    var jQuery = function () {
        return new jQuery.prototype.init();
    }
    jQuery.prototype.init = function () {}
    jQuery.prototype.init.prototype = jQuery.prototype
    window.jQuery = jQuery
})(window)
var jsonp = function (options) {
    var url = options.url,
    params = options.params || {},
    callback = options.callback;

    var script = document.createElement('script')
    var arr = []
    for (var key in params) {
        arr.push(key + '=' + params[key])
    }
    params = arr.join('&')
    script.src = encodeURI(url)
    document.body.appendChild(script)
    window.callback = callback
}

var obj = {}
obj.__proto__ = A.prototype
resule = A.call(obj, 'cat')

// function instanceOf( L, R ) { //L 表示左表达式，R 表示右表达式
//     var P = R.prototype; // 取 R 的显示原型
//     L = L.__proto__; // 取 L 的隐式原型
//     while ( true ) { 
//         if ( L === null ) return false;
//         if ( P === L ) return true; 
//         L = L.__proto__; 
//     } 
// }

function quickSort(arr) {
    if (arr.length === 0) {
        return arr
    }
    var middle = Math.floor(arr.length / 2)
    var middleValue = arr.splice(middle, 1)
    var left = []
    var right = []
    for (var i = 0; i < arr.length; i ++) {
        if (target <= middle) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([middleValue], quickSort(right))
}

// 21 quickSort
// 22 binarySearch

function binarySearch (arr, target) {
    var n = arr.length,
    l = 0, r = n - 1;
    while(l < r) {
        var middle = (l+r) / 2
        if (target === arr[middle]) {
            return middle
        } else if (middle > target) {
            r = middle + 1
        } else {
            l = middle - 1
        }
    }
    return -1
}

// 23 async

function async(generation) {
    var ite = generation()
    try {
        handle(ite.next())
    } catch (error) {
        ite.throw(error) 
    }
    function handle (genaratorReslut) {
        if (genaratorReslut.done) {
            return
        }
        var generatorValue = generatorResult.value
        if (genaratorReslut instanceof Promise) {
            generatorValue.then((res) => handle(res.next()))
                .catch(err => ite.throw(err))
        }
    }
}
// function instanceOf( L, R ) { //L 表示左表达式，R 表示右表达式
//     var P = R.prototype; // 取 R 的显示原型
//     L = L.__proto__; // 取 L 的隐式原型
//     while ( true ) { 
//         if ( L === null ) return false;
//         if ( P === L ) return true; 
//         L = L.__proto__; 
//     } 
// }

function instanceOf (L, R) {
    L = L.__proto__;
    var P = R.prototype;
    while(true) {
        if (L === null) return false;
        if (P === L) return true;
        l = l.__proto__;

    }
}

// 24 instanceof
// 25 redux

const createStore = (reducer) => {
    let state = {}
    let listeness = []

    const getState = () => state

    const dispatch = (action) => (reducer) => {
        state = reducer(state, action);
        listeness.forEach(fn => fn())
    }
    let subscribe = (listener) => {
        listeness.push(listener)
    }
    //初始的状态
    dispatch({type: '@@CHEN-REDUX});
    return { getState, dispatch, subscribe }
}