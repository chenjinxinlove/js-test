function selectSort(arr) {
    let len = arr.length;
    let minIndex;
    for(let i = 0; i < len ;i ++) {
        minIndex = i;
        for (let j = i+1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr;
}