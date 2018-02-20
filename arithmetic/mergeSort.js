/**
 * Created by chenjinxin on 2018/2/18.
 */
//将arr[l..mid]和arr[mid+1...r]两个部分进行归并
// function _merge(arr, l, mid, r) {
//   var aux = [];
//   for (var i = l; i <= r; i++) {
//     aux[i-l] = arr[i];
//   }
//   var i =l, j = mid + 1;
//   for (var k = l; k <= r; k++) {
//
//     if(i < mid) {
//       arr[k] = aux[j-l];
//       j++;
//     } else if (j > r) {
//       arr[k] = aux[i - l];
//       i++;
//     } else if (aux[i-l] < aux[j - k]) {
//       arr[k] = aux[i-l];
//       i++;
//     } else {
//       arr[k] = aux[j - l];
//       j++;
//     }
//   }
// }
//
// // 递归使用归并排序，对arr[l...r]的范围进行排序
// function _mergeSort(arr, l, r ) {
//   if (l>=r) {
//     return;
//   }
//   var mid =  Math.ceil((l + r) / 2);
//
//   _mergeSort(arr,l,mid);
//   _mergeSort(arr,mid+1,r);
//   _merge(arr, l, mid, r);
//
// }
// function mergeSort(arr) {
//   console.time();
//   var len = arr.length;
//   _mergeSort(arr, 0 , len - 1);
//   console.timeEnd();
// }

var arr = [];
for (var i = 0 ; i < 20000; i++) {
  arr.push(Math.floor(Math.random() * 20000));
}


function merge(left, right) {
  var re = [];
  while(left.length > 0 && right.length > 0) {
    if(left[0] < right[0]) {
      // 如果左边的数据小于右边的数据，将左边的数据取出，放到新数组那里
      re.push(left.shift());
    } else {
      re.push(right.shift());
    }
  }
  /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
  return re.concat(left).concat(right);
}

function mergeSort(arr) {
  if(arr.length == 1){
    return arr;
  }
  /* 首先将无序数组划分为两个数组 */
  var mid = Math.floor(arr.length / 2);
  var left = arr.slice(0, mid);
  var right = arr.slice(mid);
  /* 递归分别对左右两部分数组进行排序合并 */
  // if (arr[mid] > arr[mid + 1]) {
    return merge(mergeSort(left), mergeSort(right));
  // }
}
console.time();
console.log(mergeSort(arr));
console.timeEnd();