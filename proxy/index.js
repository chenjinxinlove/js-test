// var obj = new Proxy({}, {
//     get: function(target, key, receiver){
//         console.log(`getting ${key}!`)
//         return Reflect.get(target, key, receiver)
//     },
//     set: function(target, key, value, receiver){
//         console.log(`setting ${key}`)
//         return Reflect.set(target, key, value, receiver)
//     }
// })

// var proxy = new Proxy({}, {
//     get: function(target, property) {
//         return 35
//     }
// })

// get

// var person = {
//     name: '张三'
// }

// var proxy = new Proxy(person, {
//     get: function(target, property) {
//         if (property in target) {
//             return target[property]
//         } else {
//             throw new ReferenceError("Property \"" + property + "\" does not exist.");
//         }
//     }
// })

// proxy.name // "张三"

// let proto = new Proxy({}, {
//     get(target, propertyKey, receiver) {
//         console.log('GET' + propertyKey);
//         return target
//     }
// })
// let obj = Object.create(proto);

// function createArray(...elements) {
//     let handler = {
//         get(target, propKey, receiver) {
//             let index = Number(propKey);
//             if (index < 0) {
//                 propKey = String(target.length + index)
//             }
//             return Reflect.get(target, propKey, receiver)
//         }
//     }
//     let target = []
//     debugger
//     target.push(...elements)
//     return new Proxy(target, handler)
// }

// var arr = createArray('a', 'b', 'c')

// var pipe = (function () {
//     return function(value) {
//         var funcStack = []
//         var oproxy = new Proxy({}, {
//             get: function(pipeObject, fnName) {
//                 if (fnName === 'get') {
//                     return funcStack.reduce(function(val, fn){
//                         return fn(val)
//                     }, value)
//                 }
//                 funcStack.push(window[fnName])
//                 return oproxy
//             }
//         })
//     }
// })()

// var pipe = (function () {
//     return function (value) {
//       var funcStack = [];
//       var oproxy = new Proxy({} , {
//         get : function (pipeObject, fnName) {
//           if (fnName === 'get') {
//             return funcStack.reduce(function (val, fn) {
//               return fn(val);
//             },value);
//           }
//           funcStack.push(window[fnName]);
//           return oproxy;
//         }
//       });
  
//       return oproxy;
//     }
//   }());
  
//   var double = n => n + 1;
//   var pow    = n => n + 2;
//   var reverseInt = n => n + 3;
  
// //   var s = pipe(2).double.pow.reverseInt.get; // 63
// const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))) 
//   console.log(compose(double, pow, reverseInt)(2))
// console.log(s)

// const dom = new Proxy({}, {
//     get(target, property) {
//       return function(attrs = {}, ...children) {
//         const el = document.createElement(property);
//         for (let prop of Object.keys(attrs)) {
//           el.setAttribute(prop, attrs[prop]);
//         }
//         for (let child of children) {
//           if (typeof child === 'string') {
//             child = document.createTextNode(child);
//           }
//           el.appendChild(child);
//         }
//         return el;
//       }
//     }
//   });
  
//   const el = dom.div({},
//     'Hello, my name is ',
//     dom.a({href: '//example.com'}, 'Mark'),
//     '. I like:',
//     dom.ul({},
//       dom.li({}, 'The web'),
//       dom.li({}, 'Food'),
//       dom.li({}, '…actually that\'s it')
//     )
//   );
  
//   document.body.appendChild(el);


// var proxy = new Proxy({}, {
//     get: function(target, property, receiver) {
//         return receiver
//     }
// })

// console.log(proxy.getReceiver === proxy)

// const target = Object.defineProperties({}, {
//     foo: {
//       value: 123,
//       writable: false,
//       configurable: false
//     },
//   });
  
//   const handler = {
//     get(target, propKey) {
//       return 'abc';
//     }
//   };
  
//   const proxy = new Proxy(target, handler);
  
//   proxy.foo

// let validator = {
//   set: function(obj, prop, value) {
//     if(prop === 'age') {
//       if(!Number.isInteger(value)) {
//         throw new TypeError('The age is not an integer')
//       }
//       if(value > 200) {
//         throw new RangeError('The age seems invalid')
//       }
//     }
//     obj[prop] = value
//   }
// }

// let person = new Proxy({}, validator)

// person.age = 300 // 报错
// // person.age = 'young' // 报错
// // person.age = 100
// console.log(person.age)
// // person.age = 'young' // 报错
// // person.age = 300 // 报错

// function invariant(key, action) {
//   if (key[0] === '_') {
//     throw new Error('sdd')
//   }
// }

// const handler = {
//   get(target, key) {
//     invariant(key, 'get')
//     return target[key]
//   },
//   set(target, key, value) {
//     invariant(key, value)
//     target[key] = value
//     return true
//   }
// }

// const target = {}
// const proxy = new Proxy(target, handler)
// proxy._prop

// proxy._prop = 'c'

// var handler = {
//   appley (target, ctx, args) {
//     return Reflect.apply(...arguments)
//   }
// }

// var target = function (params) {
//   return 'I am the target'
// }
// var handler = {
//   apply: function () {
//     return 'I am the proxy'
//   }
// }
// var p = new Proxy(target, handler);

// var twice = {
//   apply(target, ctx, args) {
//     return Reflect.apply(...arguments) * 2
//   }
// }

// function sum(left, right) {
//   return left + right
// }

// var proxy = new Proxy(sum, twice)

// console.log(proxy(1, 2))
// console.log(proxy.call(null, 5, 6))
// console.log(proxy.apply(null, [7, 8]))

// var handler = {
//   has (target, key) {
//     if (key[0] === '_') {
//       return false
//     }
//     return key in target
//   }
// }

// var target = {_prop: 'foo', prop: 'foo'}
// var proxy = new Proxy(target, handler)
// console.log('_prop' in proxy)
// console.log('prop' in proxy)

// var obj = {a: 10}
// Object.preventExtensions(obj)

// var p = new Proxy(obj, {
//   has: function(target, prop) {
//     return false
//   }
// })

// 'a' in p

// var handler = {
//     constructor(target, args, newTarget) {
//         return new target(...args)
//     }
// }

// var p = new Proxy(function() {}, {
//     construct: function (target, args) {
//         console.log('called' + args.join())
//         return {value: args[0] * 10}
//     }
// })

// console.log(new p(1).value)

// var p = new Proxy(function(){}, {
//     construct: function (target, argumentsList) {
//         return 1
//     }
// })

// new p()

// var handler = {
//     deleteProperty(target, key) {
//         invariant(key, 'delete');
//         delete target[key];
//         return true
//     }
// }
// function invariant(key, action) {
//     if (key[0] === '_') {
//         throw new Error('dd')
//     }
// }

// var target = {_prop: 'foo'}
// var proxy = new Proxy(target, handler)

// delete proxy._prop

// var handler = {
//     defineProperty(target, key, descriptor) {
//         return false
//     }
// }
// var target = {}
// var proxy = new Proxy(target, handler)
// proxy.foo = 'bar'

// var handler = {
//     getOwnPropertyDescriptor(target, key) {
//         if (key[0] === '_') {
//             return ;
//         }
//         return Object.getOwnPropertyDescriptor(target, key)
//     }
// }
// var target = {_foo: 'bar', baz: 'tar'}
// var proxy = new Proxy(target, handler)

// console.log(Object.getOwnPropertyDescriptor(proxy, 'wat'))
// console.log(Object.getOwnPropertyDescriptor(proxy, '_foo'))
// console.log(Object.getOwnPropertyDescriptor(proxy, 'baz'))

// var proto = {};
// var p = new Proxy({}, {
//     getPrototypeOf(target) {
//         return proto
//     }
// });

// console.log(Object.getPrototypeOf(p) === proto)

// var p = new Proxy({}, {
//     isExtensible: function(target) {
//         console.log('called')
//         return true
//     }
// })
// Object.isExtensible(p)

// let target = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// let handler = {
//     ownKeys(target) {
//         return ['a']
//     }
// }

// let proxy = new Proxy(target, handler)

// console.log(Object.keys(proxy))

// let target = {
//     _bar: 'foo',
//     _prop: 'bar',
//     prop: 'baz'
// }

// let handler = {
//     ownKeys(target) {
//         return Reflect.ownKeys(target).filter(key => key[0] !== '_')
//     }
// }

// let proxy = new Proxy(target, handler)
// for(let key of Object.keys(proxy)){
//     console.log(target[key])
// }

// let target = {
//     a:1,
//     b:2,
//     c:3,
//     [Symbol.for('secret')]: '4'
// }

// Object.defineProperty(target, 'key', {
//     enumerable: false,
//     configurable: true,
//     writable: true,
//     value: 'static'
// })

// let handler = {
//     ownKeys(target) {
//         return ['a', 'd', Symbol.for('secret'), 'key']
//     }
// }

// let proxy = new Proxy(target, handler)

// console.log(Object.keys(proxy))

// var p = new Proxy({}, {
//     ownKeys: function(target) {
//       return ['a', 'b', 'c'];
//     }
//   });
  
//   console.log(Object.getOwnPropertyNames(p))
//   // [ 'a', 'b', 'c' ]

// const obj = { hello: 'world' };
// const proxy = new Proxy(obj, {
//   ownKeys: function () {
//     return ['a', 'b'];
//   }
// });

// for (let key in proxy) {
//   console.log(key); // 没有任何输出
// }

// var obj = {}

// var p = new Proxy(obj, {
//     ownKeys: function (target) {
//         return [123, true, undefined, null, {}, []]
//     }
// })
// Object.getOwnPropertyNames(p)

// var handler = {
//     setPrototypeOf(target, proto) {
//         throw new Error('changing the prototype is forbidden')
//     }
// }
// var proto = {}
// var targer = function () {}
// var proxy = new Proxy(targer, handler)
// Object.setPrototypeOf(proxy, proto)


// let target = {}
// let handler = {}

// let {proxy, revoke} = Proxy.revocable(target, handler)

// proxy.foo = 123
// console.log(proxy.foo)

// revoke()
// proxy.foo

// var myObject = {
//     foo: 1,
//     bar: 2,
//     get baz() {
//         return this.foo + this.bar
//     }
// }


// var myObject = {
//     foo: 1
// }

// console.log('foo' in myObject)

// console.log(Reflect.has(myObject, 'foo'))

// function g(name) {
//     this.name = name
// }

// let i = new g('张三')
// let n = Reflect.construct(g, ['张三']);

// console.log(i, n)