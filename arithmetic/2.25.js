var myEvent = new Event('myEvent');
docment.addEventListener('myEvent', func, false);
docment.dispatchEvent('myEvent');

var bind = Function.prototype.bind || function (context) {
    var self = this;
    return function (...args) {
      self.apply(context, args);
    }
  };

a.bind(foo)

用context的this来改变运行函数的this

function shaffle(arr) {
  while (arr.some(item => item instanceof Array)) {
    arr = [].concat(...arr);
  }

}


function bubbleSort(arr) {
  for (var i = 0; i < arr.length; i ++) {
    for (var j = 0; j < arr.length - 1 - i; j ++) {
      if (arr[j] > arr[j+1]) {
        var temp = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

function selectionSort(arr) {
  var len = arr.length;
  var minIndex;
  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    for (var j = i; j < len; j++){
      if (arr[j] < arr[minIndex]){
        minIndex = j;
      }
    }
    if(minIndex !== i) {
      var temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}

function insertSort(arr) {
  var len = arr.length;
  for (var i = 1; i < len; i ++) {
    for (var j = i; j > 0; j--) {
      if (arr[j] < arr[j-1]) {
        var temp = arr[j-1];
        arr[j-1] = arr[j];
        arr[j] = temp;
      } else {
        break;
      }
    }
  }
  return arr;
}


function merginSort(arr){
  var len = arr.length, middleIndex;
  if (len === 1) {
    return arr;
  }
  middleIndex = Math.floor(len / 2);
  var left = arr.slice(0, middleIndex);
  var right = arr.slice(middleIndex);
  mergin(merginSort(left), merginSort(right));
}

function mergin(left, right) {
  var res = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }
  return res.concat(left).concat(right);
}


function quickSort(arr) {
  if(arr.lenght <= 1) {
    return arr;
  }
  var middleIndex = Math.floor(arr.length/ 2);
  var middle = arr.splice(middleIndex, 1)[0];
  var left = [], right = [];

  for (var i = 0 ; i < arr.length; i++) {
    if (arr[i] <= middle) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([middle], quickSort(right))

}
/ 大致分三步：
// 1、找基准（一般是以中间项为基准）
// 2、遍历数组，小于基准的放在left，大于基准的放在right
// 3、递归
function quickSort(arr){
  //如果数组<=1,则直接返回
  if(arr.length<=1){
    return arr;
  }
  var pivotIndex=Math.floor(arr.length/2);
  //找基准，并把基准从原数组删除
  var pivot=arr.splice(pivotIndex,1)[0];
  //定义左右数组
  var left=[];
  var right=[];

  //比基准小的放在left，比基准大的放在right
  for(var i=0;i<arr.length;i++){
    if(arr[i]<=pivot){
      left.push(arr[i]);
    }else{
      right.push(arr[i]);
    }
  }
  //递归
  return quickSort(left).concat([pivot],quickSort(right));
}
var arr=[2,3,6,4,2,1,90,100,20,5];
console.log(quickSort(arr)); // ≈

var searchArr =

function binarySearch(item) {
  var arr = [1,2,3,4,5,6,7,8,9];
  var low, higt, middle, element;

  low = 0;
  higt = arr.length - 1;
  while (low <= higt) {
    middle =  Math.floor((low + higt) / 2);
    element = arr[middle];
    if (item > element) {
      low = middle + 1;
    } else if (item < element){
      higt = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;

}
