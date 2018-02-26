var arr = [];
for (var i = 0 ; i < 20000; i++) {
    arr.push(Math.floor(Math.random() * 200000));
}

function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len - 1 - i; j ++) {
        if (arr[j] > arr[j+1]) {
          var temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
    return arr;

}
console.log('冒泡排序');
console.time();
console.log(bubbleSort(arr));
console.timeEnd();

function selectionSort(arr) {
    var len = arr.length, minIndex;
    for (var i = 0; i < len - 1; i++) {
      minIndex = i;
      for (var j = i; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
    }
    if (i !== minIndex) {
      var temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    return arr;
}

console.log('选择排序');
console.time();
console.log(selectionSort(arr));
console.timeEnd();

function insertSort(arr) {
    for (var i = 1; i <arr.length; i ++) {
      for (var j = i; j > 0; j-- ) {
        if (arr[j] < arr[j - 1]){
          var temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        } else {
          break;
        }
      }
    }
    return arr;
}

console.log('插入排序');
console.time();
console.log(insertSort(arr));
console.timeEnd();

function mergin(left, right) {
    var re = [];
    while (left.length > 0 && right.length > 0) {
      if (left[0] > right[0]) {
        re.push(right.shift());
      } else {
        re.push(left.shift());
      }
    }
    return re.concat(left).concat(right);
}

function merginSort(arr) {
    if (arr.length === 1) {
      return arr;
    }
    var middle =  Math.floor(arr.length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle);
    return mergin(merginSort(left), merginSort(right));
}

console.log('归并排序');
console.time();
console.log(merginSort(arr));
console.timeEnd();


function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    var middleIndex = Math.floor(arr.length / 2);
    var middle = arr.splice(middleIndex, 1)[0];
    var left = [], right = [];
    for (var i = 0; i < arr.length; i++) {
      if(arr[i] <= middle) {
        left.push(arr[i])
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat([middle], quickSort(right));
}

console.log('快速排序');
console.time();
console.log(quickSort(arr));
console.timeEnd();

function search(arr, item) {
    var low, higt, middle, element;
    low = 0;
    higt = arr.length - 1;
    while (low < higt) {
      middle = Math.floor((low + higt) / 2);
      element = arr[middle];
      if (middle > item) {
        higt = middle - 1;
      } else if (middle < item) {
        low = middle + 1;
      } else {
        return middle;
      }
    }
    return -1;
}

var searchArr = quickSort(arr);
console.log('二分查找排序');
console.time();
console.log(search(searchArr, 176));
console.timeEnd();
console.time();
console.log(searchArr.indexOf(176));
console.timeEnd();

var bind = Function.prototype.bind || function (context) {
    var self = this;
    return function () {
        self.apply(context, {}.slice.call(arguments, 1))
    }
}

function flat(arr) {
    while (arr.some(item => item instanceof  'Array')) {
      arr = [].concat(...arr);
    }
    return arr;
}

const statusProvider = (promise, status) => data => {
  if (promise.status !== 'PENDING') return false;
  promise.status = status;
  promise.result = data;
  switch (status) {
      case 'FILFILLED': return promise.successListener.forEach(fn => fn(data))
      case 'REJECTED': return promise.failureListener.forEach(fn => fn(data))
  }
}

class Promise {
  constructor(executor){
    this.task = [];
    this.status = 'PENDING';
    this.result = '';
    this,successListener = [];
    this.failureListener = [];
    executor(statusProvider(this, 'FULFILLED'), statusProvider(this, 'REJECTED'));
  }
  then(...args) {
    switch (this.status) {
        case 'PENDING': {
          this.successListener.push(args[0]);
          this.failureListener.push(args[1]);
          break;
        }
        case 'FULFILLED': {
          args[0](this.result);
          break;
        }
        case 'REJECTED': {
          args[1](this.result);
        }
    }
  }
  catch(...arg) {
    return this.then(undefined, arg);
  }
}

const createStore = (reducer) => {
  let state = {};
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => (reducer) => {
    state = reducer(state, action);
    listeners.forEach(fn => fn());

    let subscribe = (listener) => {
      listeners.push(listener);
    }
    dispatch({type: '@@CHEN-REDUX'});
    return {getState, dispatch, subscribe}
  }

}

