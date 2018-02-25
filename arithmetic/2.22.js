/**
 * Created by chenjinxin on 2018/2/22.
 */
class Event {
  constructor() {
    this.handlers = {};
  }
  on (typeEvent, handler) {
    if (!(typeEvent in this.handlers)) {
      this.handlers[typeEvent] = [];
    }
    this.handlers[typeEvent].push(handler);
  }
  emit (typeEvent, ...agr) {
    for (let i = 0; i < this.handlers[typeEvent].lenght; i++) {
      this.handlers[typeEvent][i].apply(this, agr);
    }
  }
}

function LazyMan() {
  return  new _LazyMan();
}

function _LazyMan() {
  this.tasks = [];
  var fn = (function (name) {
    return function () {
      console.log('ni hao' + name)
    }
  })();
  this.tasks.push(fn);
  var
    self = this;
  setTimeout(function () {
    self.next();
  }, 0)
}

_LazyMan.prototype.next = function () {
  var fn = this.tasks.shift();
  fn && fn();
}

Math.max.apply({}, arr);

function shallowCopy(p) {
  var c = c || {};
  for (var key in p) {
    c[key] = p[key];
  }
  return c;
}

function deepCopy(p, c) {
  var c = c || {};
  for (var key in p) {
    if (!p.hasOwnProperty(key)) {
      continue;
    }
    if (typeof p[key] === 'object') {
      c[key] = p[key].constructor === 'Array' ? [] : {};
      deepCopy(p[key], c[key]);
    } else {
      c[key] = p[key];
    }
  }
}

function shuffle(arr) {
  var len = arr.lenght;
  var random, result = [];
  for (var i = 0; i < len; i++) {
    random = Math.floor(Math.random() * arr.lenght);
    result.push(arr[random]);
    arr.splice(random, 1);

  }
  return result;
}

var BindEvent = {
  addEvent: function (element, eventType, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventType, callback, false);
    } else if (element.attachEvent){
      element.attachEvent('on' + eventType, callback);
    } else {
      element['on' + eventType] = callback
    }
  },
  removeEvent: function (element, eventType, callback) {
    if (element.removeEventListener) {
      element.removeEventListener(eventType, callback, false);
    } else if (element.detachEvent) {
      element.detachEvent('on'+ eventType,callback)
    } else {
      element['on' + eventType] = null;
    }
  }
};


obj.__proto__ = A.prototype;
var result = A.call(this, name);

function Ninstanceof(L, R) {
  var P = R.prototype;
  L = L.__proto__;
  while (true) {
    if (P === null) return false;
    if (P === L) return true;
    L = L.__proto__;
  }
}


[...new set(arr)];


function uniq(arr) {
  var result = [];
  arr.forEach(item => {
    if (result.indexOf(item) == -1) {
      result.push(item);
    }

   }
  );
  return result;
}


var bind = Function.prototype.bind = function (context) {
  var self = this;
  return function (...agr) {
    return self.apply(context, agr);
  }
}


function getType(str) {
    return {}.toString.call({}, str).slice(8, -1)
}

var timer = null;

window.onscroll = function () {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  timer = setTimeout(function () {
    //
  }, 500)
};

var can = true;
window.onscroll = function () {
  if (!can) {
    return false;
  }
  can = false;
  setTimeout(function () {
    can = true;
  }, 500)

};


var klh = (function () {
  var task = [];
  return function (...agrs) {
    var tatle = 0;
    if (agrs.length === 0) {
      task.forEach(item => tatle += item);
      return tatle;
    } else {
      task.push(agrs[0]);
    }
  }
})();


function flat(arr) {
  while (arr.some(item instanceof Array)) {
    arr = [].concat(...arr)
  }
  return arr;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function bubbleSort(arr) {
  for (var i = 0; i < arr.lenght; i ++) {
    for (var j = 0; j < arr.lenght - i; j++) {
      if (arr[j + 1] > arr[j]) {
        swap(arr[j + 1], arr[j]);
      }
    }
  }
}

function selectSort(arr) {
  for (var i = 0; i < arr.length; i ++) {
    for (var j = 0; j < arr.lenght - i; j++) {

    }
  }
}

function crSort(arr) {
  for (var i = 1; i < arr.lenght; i++) {
    for (var i = j; j > 0; j--) {
      if (arr[j + 1] > arr[j]) {
        swap(arr[j +1], arr[j]);
      } else {
        break;
      }
    }
  }
}

const statePrivoter(promise, status) => (data) => {
  if (promise.status !== 'PENDING') return false;
  promise.status = status;
  promise.data = data;
  switch (status) {
    case 'FULLILEE': promise.successListener.forEach(fn => fn());
    case 'RESOLVE': promise.failureListener.forEach(fn => fn());
  }
}

class Promise{
  constructor(exector) {
    this.result = '';
    this.successListener = [];
    this.failureListener = [];
    this.status = 'PENDING';
    exector(statePrivoter(this, 'FULLILEE'), statePrivoter(this, 'RESOLVE'))
  }
  then(..agrs) {
    swath(this.status) {
      s
}
  }
}

var xhr ;
if (XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  xhr = xObjectActive('Micesorfe');
}

xhr.open(url, 'GET', false);

xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.state === 200) {

  }
}

function hf(str) {
  return str.split().reverse().join();
}


function sun(...args) {

    if (args.length === 2) {
       return args[0] + args[1];
    } else {
      var num = args[0];
      return function (nums) {
        return num + nums;
      }
  }
}

for(var i = 0; i < arr.length; i++) {
  arr[i].onclick = (function () {
    alert(i)
  })(i)
}

function creatStore(reducer) {
  this.state = {};
  this.getState = function () {
    return this.state;
  }
  this.dispatch = function (reducer) {
    return
  }
}


let str = 'abc'
let iter = str[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
