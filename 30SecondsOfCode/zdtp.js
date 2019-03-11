// Curry
// Uncurry
// Bind
// createStore
// async
// quickSort
// binarySearch
// Promise
// lazyman
// vue

// Promise
// lazyman
// vue

const Curry = function(fn) {
    var args = []
    return function() {
        if (arguments.length === 0) {
            return fn.apply(this, args)
        } else {
            [].push.apply(args, arguments)
            return arguments.callee
        }
    }
}

var curry= function( fn ){
    var args = [];
    return function(){
        if ( arguments.length === 0 ){
            return fn.apply( this, args );
        }else{
            [].push.apply( args, arguments );
            // 为了链式调用
            return arguments.callee
        }
    }
};

var curry = function(fn) {
    var args = [];
    return function() {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments)
            return arguments.callee
        }
    }
}

if(!function(){}.bind()){
    Function.prototype.bind = function (context) {
        var self = this,
                args = [].slice.call(arguments);
        return function () {
            return self.apply(context, args.slice(1))
        }

    }
}


if(!function(){}.bind()) {
    Function.prototype.bind = function(context) {
        var self = this,
            args = [].slice.call(arguments);
        return function() {
            return self.apply(context, args.slice(1))
        }
    }
}

if (!function(){}.bind()) {
    Function.prototype.bind = function(context) {
        var self = this,
            args = [].slice.call(arguments);
        return function() {
            return self.apply(context, args.slice(1))
        }
    }
}
Function.prototype.bind = function(context) {
    var args = [].slice.call(arguments),
    self = this;
    return function() {
        self.apply(context, args.slice(1))
    }
}

const createStore = (reducer) => {
    let state = {}
    let listeners = []
    let dispatch = (actions) => reducer => {
        state = reducer(state, actions)
        listeners.forEach(fn => fn())
    }
    let getState = () => state
    let subscribe = (listeners) => {
        listeners.push(lis)
    } 
}


function async(genetator) {
    const ite = genetator()
    try {
        handler(ite.next())
    } catch (error) {
        ite.throw(error)
    }
    function handler(generatorResult) {
        if (generatorResult.done) {
            return
        }
        const genetatorValue = generatorResult.value
        if (generatorValue instanceof Promise) {
            genetatorValue.then(res => handler(ite.next(res)))
                .catch(err => ite.throw(err))
        }
    }
}

function quickSort(arr) {
    if(arr.length === 0) {
        return arr
    }
    var middle = Math.floor(arr.length / 2)
    var middleValue = arr.splice(middle, 1)[0]
    var left = [], right = [];
    for (var i = 0; i < arr.length; i++) {
        if (middleValue<= arr[i]) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([middleValue], quickSort(right))
}

function binarySearch(arr, target) {
    var n = arr.length, l = 0, r = n - 1;
    while(l <= r) {
        var middle = (r + l) / 2
        if (arr[middle] = target) {
            return middle
        }
        if (target > arr[mid]) {
            l = mid + 1
        } else {
            r = mid - 1
        }
        return -1

    }
}

function _LazyMan(name) {
    this.tasks = [];
    var self = this;
    var fn = (function(n){
        var name = n;
        return function() {
            console.log('Hi this is ' + name + '!')
            self.next()
        }
    })(name)
    this.tasks.push(fn)
    setTimeout(function() {
        self.next()
    }, 0)
}
_LazyMan.prototype.next = function() {
    var fn = this.tasks.shift()
    fn && fn()
}
_LazyMan.prototype.eat  = function(name) {
    var self = this
    var fn = (function(name) {
        return function(){
            console.log("Eat " + name + "~");
            self.next()
        }
    })(name);
    this.tasks.push(fn);
    return this; // 实现链式调用
}

_LazyMan.prototype.sleep = function(time) {
    var self = this;
    var fn = (function(time){
        return function() {
            setTimeout(function(){
                console.log("Wake up after " + time + "s!");
                self.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.push(fn);
   return this;
}

_LazyMan.prototype.sleepFirst = function(time) {
    var self = this;
    var fn = (function(time) {
        return function() {
            setTimeout(function() {
                console.log("Wake up after " + time + "s!");
                self.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.unshift(fn);
    return this;
}

function LazyMan(name){
    return new _LazyMan(name);
}