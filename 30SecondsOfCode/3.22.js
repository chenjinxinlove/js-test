const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );
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

const remove = (arr, func) => {
  Array.isArray(arr)
    ? arr.filter(arr).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val)
    }, []) : []
}


const remove = (arr, func) => {
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
    arr.splice(arr.indexOf(val), 1);
    return acc.concat(val)
    }) : []
}



const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const shuffle = ([...arr]) => {
  let m = arr.lenght;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]

  }
}






const symmetricDifference = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
};

const symmetricDifference = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...a.filter(x=>!sB.has(x)), ...b.filter(x => !sA.has(x))];
}







var attempt = function (fn) {
    try {
      return fn.apply(fn, [].slice.call(arguments, 1))
    } catch (e) {
      return e instanceof Error ? e : new Error(e)
    }
}








const powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
const powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]])

powerset([1, 2]); // [[], [1], [2], [2,1]]



const deepClone = obj => {
    let clone = Object.assign({}. obj);
    Object.keys(clone).forEach(
        key => (clone[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key])
    )
}

const deepClone = obj => {
    let clone = Object.assign({}, obj);
    Object.keys(clone).forEach(
        key => (clone[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key])
    )
}


const functions = (obj, inherited = false) =>
    (
        inherited ?
            [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))]
            : Object.keys(obj)
    ).filter(key => typeof obj[key] === 'function')

