/**
 * remove
 * shuffle
 * symmetricDifference
 * take
 */


 const remove = (arr, func) => 
    Array.isArray(arr)
        ? arr.filter(func).reduce((acc, val) => {
            arr.splice(arr.indexOf(val), 1);
            return acc.concat(val);
        }, [])
    : [];    

console.log(remove([1, 2, 3, 4], n => n % 2 === 0)); // [2, 4]


// shuffle

const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
}

const foo = [1, 2, 3];
shuffle(foo); // [2,3,1], foo = [1,2,3]


// symmetricDifference

const symmetricDifference = (a, b) => {
    const sA = new Set(a),
        sB = new Set(b);
    return [...a.filter(x => !sB.has(x), ...b.filter(x => !sA.has(x)))]    
}

console.log(symmetricDifference([1, 2, 3], [1, 2, 4])); // [3,4]

// take

const take = (arr, n = 1) => arr.slice(0, n);

take([1, 2, 3], 5); // [1, 2, 3]
take([1, 2, 3], 0); // []