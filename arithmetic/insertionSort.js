/**
 * Created by chenjinxin on 2018/2/18.
 */

function insertionSort(arr) {
  console.time();
  for (var i = 1; i < arr.length; i++) {
    //寻找元素arr[i]合适的插入位置
    for(var j = i; j > 0; j--) {
      if(arr[j] < arr[j-1]) {
        // swap(arr[j], arr[j-1]);
        var temp = arr[j];        //元素交换
        arr[j] = arr[j-1];
        arr[j-1] = temp;
      } else {
        break;
      }
    }
    //
    for (var j = i; j > 0 && arr[j] < arr[j-1]; j--) {

    }

  }
  console.timeEnd();
  return arr;
}
var arr = [];
for (var i = 0 ; i < 20000; i++) {
  arr.push(Math.floor(Math.random() * 20000));
}

console.log(insertionSort(arr));

//优化

function insertion(arr) {
  console.time();
  for (var i = 1; i < arr.length; i++) {
    var e = arr[i];
    var j ;
    for (j = i ; j > 0 && arr[j-1] > e; j--) {
      arr[j] = arr[j-1];
    }
    arr[j] = e;
  }
  console.timeEnd();
  return arr;
}

console.log(insertion(arr));


//
// i等于1
//
// 1开始很2比，如果2大于1，就交换：1243
//
// i等于2 就是4 开始跟1的位置来比较， 4和2比较 4大于终止循环
//
// i等于3 就是3  3很4比较，3很4交换位置，1234  然后3很2比较，3比2大终止循环
function insertionSort(arr) {
  let len = arr.length
  for(let i = 1; i < len; i++ ) {
    for(let j = i; j > 0 && arr[j] < arr[j-1]; j--) {
      [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
    }
  }
}