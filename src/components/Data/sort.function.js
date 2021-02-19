// jshint esversion:6
function bubbleSort(arr) {
  var s1 = performance.now();
  const n = arr.length;
  let idxRec = [];
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      var tempArr = [j, false];
      if (arr[j] > arr[j + 1]) {
        var temp = 0;
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        tempArr[1] = true;
      }
      idxRec.push(tempArr);
    }
  }
  var s2 = performance.now();
  return [arr, s2 - s1, idxRec];
}
function insertionSort(arr) {
  var s1 = performance.now();
  const sorted = [arr[0]];
  const copy = arr;
  copy.shift();
  while (copy.length !== 0) {
    for (var i = 0; i <= sorted.length - 1; i++) {
      if (copy[0] <= sorted[i]) {
        sorted.splice(i, 0, arr[0]);
        break;
      } else if (copy[0] > sorted[i] && i === sorted.length - 1) {
        sorted.push(arr[0]);
        break;
      }
    }
    copy.shift();
  }
  var s2 = performance.now();
  return [sorted, s2 - s1];
}
function partition(arr, low, high) {
  let pivot = arr[low];
  let i = low + 1;
  let j = high;
  do {
    while (arr[i] <= pivot) {
      i = i + 1;
    }
    while (arr[j] > pivot) {
      j = j - 1;
    }
    if (i < j) {
      let temp = 0;
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  } while (i < j);
  let temp = 0;
  temp = arr[low];
  arr[low] = arr[j];
  arr[j] = temp;
  return j;
}
function quick(arr, low, high) {
  if (low < high) {
    const partitionIndex = partition(arr, low, high);
    quick(arr, low, partitionIndex - 1);
    quick(arr, partitionIndex + 1, high);
  }
  return arr;
}
function quickSort(arr) {
  var start = performance.now();
  const a = quick(arr, 0, arr.length - 1);
  var end = performance.now();
  return [a, end - start];
}
export { bubbleSort, insertionSort, quickSort };
