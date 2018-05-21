/**
 * mapObject
 * partition
 * pull
 * reducedFilter
 */


// mapObject

const mapObject = (arr, fn) => 
    arr.reduce((o, i) => {o[i] = fn(i); return o; }, {})

const squareIt = arr => mapObject(arr, a => a * a);
console.log(squareIt([1, 2, 3])); // { 1: 1, 2: 4, 3: 9 }


// partition

const partition = (arr, fn) => 
    arr.reduce((arc, item) => {
        !fn(item) ? arc[0].push(item) : arc[1].push(item);
        return arc;
    }, [[], []])

const users = [{ user: 'barney', age: 36, active: false }, { user: 'fred', age: 40, active: true }];

console.log(partition(users, o => o.active));

// [[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]]


// pull

const pull = (arr, ...args) => {
    let argState = Array.isArray(args[0]) ? args[0] : args;
    let pulled = arr.filter((v, i) => !argState.includes(v));
    arr.length = 0;
    pulled.forEach(v => arr.push(v));
}

let myArray = ['a', 'b', 'c', 'a', 'b', 'c'];
console.log(pull(myArray, 'a', 'c')); // myArray = [ 'b', 'b' ]

// reducedFilter
const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );
const data = [
    {
      id: 1,
      name: 'john',
      age: 24
    },
    {
      id: 2,
      name: 'mike',
      age: 50
    }
  ];
  
reducedFilter(data, ['id', 'name'], item => item.age > 24); // [{ id: 2, name: 'mike'}]