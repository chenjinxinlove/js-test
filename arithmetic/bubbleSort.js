function bubbleSort(arr) {
    var len = arr.length;
    for(var i = 0; i <len; i++) {
        for(var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                var temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

//点击每一列的时候alert其index

// var docment.getElementByTagName('li')


function bubblesort(arr) {
    let len = arr.length;
    for(let i = 0; i < len ; i++) {
        for(let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1] ) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr;
}

console.log(bubblesort([1,3,2,5]))

