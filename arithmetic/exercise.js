// 发布订阅

class Event {
    constructor() {
        this.handlers = {};
    }
    on (eventType, handler) {
        if (!(eventType in this.handlers)) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
    }

    emit (eventType, ...args) {
        for (let i = 0; i < this.handlers[eventType].length; i++) {
            this.handlers[eventType][i].apply(this, args);
        }
        return this;

    }
}

//实现一个lazyman

function _LazyMan(name) {
    this.tasks = [];
    var self = this;
    var fn = (function (n) {
        var name = n;
        return function () {
            console.log("Hi ! This is "  + name + "!");
            self.next();
        }
    })(name);
    this.tasks.push(fn);
    setTimeout(function () {
        self.next();
    }, 0);
}

_LazyMan.prototype.next = function () {
    var fn = this.tasks.shift();
    fn && fn();
};

_LazyMan.prototype.eat = function () {
    var self = this;
  var fn = (function (eat) {
    var eat = eat;
    return function () {
        console.log("Eat " + name + "~");
        self.next()
    }
  })(eat) ;
  this.tasks.push(fn);
  return this;
};

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
};

_LazyMan.prototype.sleepFirst = function (this) {
    var self = this;
    var fn = (function (name) {
        return function () {
            setTimeout(function () {
                console.log("Wake up after " + time + "s!");
                self.next();
            }, time * 1000);
        }
    })(name);
    this.tasks.unshift(fn);
    return this;
};

function LazyName(name) {
    return new _LazyMan(name)
}



//取数组的最大最小

Math.min.apply({},[1,2,3,4])


//数组的深拷贝

JSON.parse(JSON.stringify(p))

function deepCopy(p, c) {
    var c = c || {};

    for (var i in p) {
        if (!p.hasOwnProperty(i)) {
            continue;
        }
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === 'Array') ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}
var v = {...obj};
function shallowCopy(p) {
    var c = {};
    for (var i in p) {
        c[i] = p[i];
    }
    return c;
}


//洗牌

function shuffle(arr) {
    var result = [],random;
    while (arr.lenght > 0) {
        random = Math.floor(Math.random() * arr.lenght);
        result.push(arr[random]);
        arr.splice(random, 1)
    }
    return  result;
}
//通用事件处理函数
var EventHelper = {
    addEvent: function (element, type, func) {
        if (element.addEventListener) {
            element.addEventListener(type, func, false);
        } else if(element.attachEvent){
            element.attachEvent('on' + type, func);
        } else {
            element['on' + type] = func;
        }
    },

    removeEvent: function (element, type, func) {
      if (element.removeEventListener) {
          element.removeEventListener(type, func, false);
      } else if (element.attachEvent) {
          element.detachEvent('on' + type, func);
      } else {
          element['on' + type] = null;
      }
    }
}

//自定义事件

var myEvent = new Event('myEvent');
document.addEventListener('myEvent', func, false);
document.dispatchEvent('myEvent');


//模拟new的过程

class A {
    constructor(name){
        this.name = name;
    }

    getName() {
        console.log(this.name);
    }
}


new A('chen')  = {
    let obj = {};
    obj.__proto__ = A.prototype;
    let result = A.call(obj, 'chen');
    return typeof result === 'obj'? result : obj;
}


//instanceof的模拟

function instanceOf(L, R) {
    var P = R.prototype;
    L = L.__proto__;
    while (true) {
        if ( L === null) return false;
        if (P === L) return true;
        L = L.__proto__;
    }

}

//数组去重

[...new Set(arr)];

function uniq(arr) {
    let output = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (output.indexOf(arr[i]) === -1) {
            output.push(arr[i]);
        }
    }
}

function uniqArr(arr) {
    var obj = {}, output = [];
    for (var i = 0, len = arr.length; i < len; i ++) {
        if (!obj[arr[i]]){
            obj[arr[i]] = true;
            arr1.push(arr[i]);
        }
    }
    return output;
}

//bind的实现

var bind = Function.prototype.bind || function (context) {
    var self = this;
    return function () {
        return self.apply(context, [].slice.call(arguments, 1))
    }
};

改的是bar的this, 用foo

bar.bind(foo);


//判断类型

function getType(isType) {
    return {}.toString.call(isType).slice(8, -1);
}

//去抖

var timer = null;
window.onscroll = function () {
    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(function () {
        console.log('ddd');
    }, 500)

}


//节流
var can = true;
window.onscroll = function () {
    if (!can) {
        return;
    }
    can = false;
    setTimeout(function () {
        can = true;
    }, 500)

}

//柯里化

var overtime = (function () {
    var args = [];
    return function () {
        if (arguments.length === 0){
            var time = 0;
            for (var i = 0; i < args.length ; i ++) {
                time += args[i];
            }
            return time;
        }else {
            [].push.applys(args, arguments);
        }
    }
})();


//数组扁平

function flatten(arr) {
    while (arr.some(item => item instanceof  Array)) {
        arr = [].concat(...arr)
    };
    return arr;
}

//返回随机数

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//冒泡排序
function bubbleSort(arr) {
    for(var i = 0; i < arr.length; i ++) {
        for (j = 0; i < arr.length - i - 1; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1])
            }
        }
    }
    return arr;
}

//快速排序
function quickSort(arr) {
    var left = [];
    var right = [];
    var index = Math.floor(arr.length / 2);
    var indexValue = arr[index];
    arr.splice(index,1);

    for (var i = 0; i < arr.length ; i ++) {
        if (arr[i] < indexValue) {
            left.push(arr[i]);
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([indexValue], quickSort(right))
}
//选择排序

function selectSort(arr) {
    for(var i = 0; i < arr.length; i ++) {
        var min = arr[i];
        var k = i;
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (min > arr[j]) {
                min = arr[j];
                 k =j;
            }
        }
        arr[k] = arr[i];
        arr[i] = min;
    }
}

//二分查找

var binarySearch  = function (item) {
    this.quickSort();
    var low = 0;
    high = array.length - 1,
        mid, element;

    while (low < high) {
        mid = Math.floor((low + high) / 2);
        element = array[mid];
        if (element < item) {
            low = mid + 1;
        } else if (element > item) {
            high = mid - 1;
        } else {
            return mid;
        }
        return -1;
    }
}

//ajax的实现

var xhr = new XMLHttpRequest();
xhr.open('GET', '', false);
xhr.send(null);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.state == 200) {

        }
    }
}

//回文函数
return (str == str.split('').reverse().join(''));

//sum(2,3)  sum(2)(3)

function sum(...args) {
    var first = args[0];
    if(args.length === 1) {
        return function (sec) {
            return sec + first;
        }
    } else {
        return args[0] + args[1]
    }
}

//找出最大的两个书
let getMaxProfit = function getMaxProfit(arr){
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    return max - min;
}

// swap

function swap(a ,b) {
    a = a - b ;
    b = a + b;
    a = b - a;
    return [a,b];
}