/**
 * Created by chenjinxin on 2018/4/5.
 */
[
  {
    "id": "get",
    "num": "80",
    "name": "",
    "descEn":"Retrieve a set of properties indicated by the given selectors from an object.",
    "descCn":"从对象中检索给定选择器所指示的一组属性。",
    "es5": "",
    "es6": "const get = (from, ...selectors) =>[...selectors].map(s =>s.replace(/\[([^\[\]]*)\]/g, '.$1.').split('.').filter(t => t !== '').reduce((prev, cur) => prev && prev[cur], from));",
    "test": "",
    "difficulty":"3"
  },
  {
    "id": "invertKeyValues",
    "num": "81",
    "name": "",
    "descEn":"Inverts the key-value pairs of an object, without mutating it. The corresponding inverted value of each inverted key is an array of keys responsible for generating the inverted value. If a function is supplied, it is applied to each inverted key.",
    "descCn":"key and vlaue",
    "es5": "",
    "es6": "const invertKeyValues = (obj, fn) =>Object.keys(obj).reduce((acc, key) => {const val = fn ? fn(obj[key]) : obj[key];acc[val] = acc[val] || [];acc[val].push(key);return acc;}, {});",
    "test": "",
    "difficulty":"3"
  },
  {
    "id": "matches",
    "num": "82",
    "name": "",
    "descEn":"Compares two objects to determine if the first one contains equivalent property values to the second one.",
    "descCn":"比较两个对象，以确定第一个对象是否包含第二个对象的等价属性值。",
    "es5": "",
    "es6": "const matches = (obj, source) =>Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);",
    "test": "",
    "difficulty":"2"
  },
  {
    "id": "merge",
    "num": "83",
    "name": "",
    "descEn":"Creates a new object from the combination of two or more objects.",
    "descCn":"从两个或多个对象的组合创建一个新对象。",
    "es5": "",
    "es6": "const merge = (...objs) =>[...objs].reduce((acc, obj) =>Object.keys(obj).reduce((a, k) => {acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];return acc;}, {}),{});",
    "test": "",
    "difficulty":"2"
  }
]