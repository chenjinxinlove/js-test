/**
 * Created by chenjinxin on 2018/3/18.
 */
class Event {
  constructor() {
    this.handlers = {};
  }
  on(typeEvent, handler) {
    if(!this.handlers[typeEvent]) {
      this.handlers[typeEvent] = []
    }
    this.handlers.push(handler);
  }
  emit(typeEvent) {
    let args = [].slice.call(arguments, 1);
    for (let i = 0; i < this.handlers[typeEvent].length; i++) {
      this.handlers[typeEvent][i].apply(this, args)
    }
    return this;
  }
}

var _LazyMan = function () {
  this.tasks = [];
  var fn = (function (name) {

  })(name)
  this.tasks.push(fn);
  setTimeout(function () {
   this.next()
  })
}
_LazyMan.prototype.next = function () {
  var fn = this.tasks.shift;
  fn && fn()
}

var deepCopy = function (p, c) {
  var c = c || {};
  for (key in p) {
    if (!p.hasOwnProperty(key)) {
      continue;
    }
    if (typeof p[key] === 'object') {
      c[key] = p[key].constructor === 'Array' ? [] : {}
    } else {
      p[key] = c[key]
    }
  }
}




var shuffle = function (arr) {
  var random, result = [];
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length)
    result.push(arr[rendom]);
    arr.splice(random, 1)
  }
  return result;
}


var boundEvent = {
  on: function (element, type, callback) {
    if (element.addEventListener) {
      element.addEventListener(type, callback, false)
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, callback)
    } else {
      element['on' + type] = callback
    }
  },
  off: function (element, type, callback) {
    if (element.removeEventListener) {
      element.removeEventListener(type, callback, false)
    }else if (element.detachEvent){
      element.detachEvent('on' + type, callback)
    }else {
      element['on' + type] = null
    }
  }
}



obj.__proto__ = this.prototype;
 A.call(obj, 'name')

function instandOf(L, R) {
  var P = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) return false
    if (L === P) {return true}
    L = L.__proto__
  }

}


Function.prototype.bind = Function.prototype.bind || function (context) {
    var self = this;
    var args = [].slice.call(arguments, 1);
    var F = function () {

    }
    function bound() {
      return self.apply(this instanceof F ? this : context, args.concat([].slice(arguments)))
    }
    F.prototype = this.prototype
    bound.prototype = new bound();

    return bound

  }


  var debounce = function (fn, time) {
   var timer
    return function () {
      var self = this;
      var args = [].slice.call(arguments)
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        fn.apply(self, args)
      }, time)
    }
  }

  var d = debounce(function () {
    console.log('1')
  }, 2000)
  window.onscroll = d()

var can = true;
window.onscroll = function () {
  if(!can) {
    return;
  }
  can = fasle;
  setTimeout(function () {
    can = true
  }, 5000)
}


var throttle = function (fn , time) {
  var can = true, timer;
  return function () {
    var self = this, args = [].slice.call(arguments);
    if (!can) {
      return
    }
    can = false;
    timer = setTimeout(function () {
      clearTimeout(timer);
      can = true;
      fn.apply(self, self)
    }, time)
  }
}

var t = throttle(function () {
  console.log('1')
}, 1000)

window.onscroll = t()



var curring = function (fn) {
  var args = [];
  return function () {
    if (arguments.length === 0 ) {
        return fn.apply(this, args)
    }else {
      [].push.apply(args, arguments);
      return arguments.callee
    }
  }
}

var xml = new XMLHttpRequest();
xml.open('get', url, false)
xml.send('')
xml.onreadystatechange(function () {
  xml.readyState == 4 && xml.status === 200
})




