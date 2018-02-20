function quickSort(arr) {
    if (arr.length <= 1) {
       return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];

    for (var i = 0; i< arr.length; i ++) {
        if(arr[i] <= pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat([pivot], quickSort(right));
}


var arr = [];
for (var i = 0 ; i < 20000; i++) {
  arr.push(Math.floor(Math.random() * 20000));
}

// var arr=[2,3,6,4,2,1,90,100,20,5];
console.time();
console.log(arr.sort(function (a,b) {
  a - b;
})); // [1, 2
console.timeEnd();
// , 2, 3, 4, 5, 6, 20, 90, 100