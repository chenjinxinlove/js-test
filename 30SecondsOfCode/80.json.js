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
  },
  {
    "id": "nest",
    "num": "84",
    "name": "",
    "descEn":"Given a flat array of objects linked to one another, it will nest them recursively. Useful for nesting comments, such as the ones on reddit.com.",
    "descCn":"给定一个相互关联的平面数组，它会递归地嵌套它们。用于嵌套注释，如reddit.com上的注释。",
    "es5": "",
    "es6": "const nest = (items, id = null, link = 'parent_id') =>items.filter(item => item[link] === id).map(item => ({ ...item, children: nest(items, item.id) }));",
    "test": "",
    "difficulty":"3"
  },
  {
    "id": "objectFromPairs",
    "num": "85",
    "name": "",
    "descEn":"Creates an object from the given key-value pairs.",
    "descCn":"从给定的键值对创建一个对象。",
    "es5": "",
    "es6": "const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});",
    "test": "objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}",
    "difficulty":"2"
  },
  {
    "id": "omit",
    "num": "86",
    "name": "",
    "descEn":"Omits the key-value pairs corresponding to the given keys from an object.",
    "descCn":"从一个对象中，省略与给定键对应的键值对。",
    "es5": "",
    "es6": "const omit = (obj, arr) =>Object.keys(obj).filter(k => !arr.includes(k)).reduce((acc, key) => ((acc[key] = obj[key]), acc), {});",
    "test": "omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }",
    "difficulty":"2"
  },
  {
    "id": "omitby",
    "num": "87",
    "name": "",
    "descEn":"Omits the key-value pairs corresponding to the given keys from an object.",
    "descCn":"从一个对象中，省略与给定键对应的键值对。",
    "es5": "",
    "es6": "const omitBy = (obj, fn) =>Object.keys(obj).filter(k => !fn(obj[k], k)).reduce((acc, key) => ((acc[key] = obj[key]), acc), {});",
    "test": "omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }",
    "difficulty":"2"
  },
  {
    "id": "pick",
    "num": "88",
    "name": "",
    "descEn":"Picks the key-value pairs corresponding to the given keys from an object.",
    "descCn":"从对象中选择对应于给定键的键值对。",
    "es5": "",
    "es6": "const pick = (obj, arr) =>arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});",
    "test": "pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }",
    "difficulty":"2"
  },
  {
    "id": "shallowClone",
    "num": "89",
    "name": "",
    "descEn":"Creates a shallow clone of an object.",
    "descCn":"创建对象的一个浅克隆。",
    "es5": "",
    "es6": "const shallowClone = obj => Object.assign({}, obj);",
    "test": "",
    "difficulty":"1"
  },
  {
    "id": "size",
    "num": "90",
    "name": "",
    "descEn":"Get size of arrays, objects or strings.",
    "descCn":"获取数组、对象或字符串的大小。",
    "es5": "",
    "es6": "const size = val =>Array.isArray(val) ? val.length: val && typeof val === 'object' ? val.size || val.length || Object.keys(val).length: typeof val === 'string' ? new Blob([val]).size : 0;",
    "test": "size([1, 2, 3, 4, 5]); // 5size('size'); // 4size({ one: 1, two: 2, three: 3 }); // 3",
    "difficulty":"2"
  },
  {
    "id": "shallowClone",
    "num": "91",
    "name": "",
    "descEn":"Unlatten an object with the paths for keys.",
    "descCn":"创建对象的一个浅克隆。",
    "es5": "",
    "es6": "",
    "test": "unflattenObject({ 'a.b.c': 1, d: 1 }); // { a: { b: { c: 1 } }, d: 1 }",
    "difficulty":"4"
  },

]