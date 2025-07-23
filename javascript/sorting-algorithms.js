function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
// Select the minimum => 
function selectionSort(arr) {
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        var minimum = i;
        for (var j = i; j < n; j++) {
            if (arr[j] < arr[minimum]) {
                minimum = j;
            }
        }
        swap(arr, i, minimum);
    }
    return arr;
}
// bubble Sort => move the bigger element to the last
function bubbleSort(arr) {
    var n = arr.length;
    for (var i = n - 1; i >= 0; i--) {
        var didiSwap = 0;
        for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                didiSwap = 1;
            }
        }
        if (didiSwap === 0) {
            break;
        }
    }
    return arr;
}
// InsertionSort => 
function insertionSort(arr) {
    var n = arr.length;
    for (var i = 0; i < n; i++) {
        var j = i;
        while (j > 0 && arr[j] < arr[j - 1]) {
            swap(arr, j, j - 1);
            j--;
        }
    }
    return arr;
}
function merge(arr, low, mid, high) {
    var first = low;
    var second = mid + 1;
    var temp = [];
    while (first <= mid && second <= high) {
        if (arr[first] < arr[second]) {
            temp.push(arr[first]);
            first++;
        }
        else {
            temp.push(arr[second]);
            second++;
        }
    }
    while (first <= mid) {
        temp.push(arr[first]);
        first++;
    }
    while (second <= high) {
        temp.push(arr[second]);
        second++;
    }
    for (var i = low; i <= high; i++) {
        arr[i] = temp[i - low]; // 0 4 => 4 - 4 => 0
    }
}
function mergeSort(arr, low, high) {
    if (low === high)
        return;
    var mid = Math.floor((low + high) / 2);
    mergeSort(arr, low, mid);
    mergeSort(arr, mid + 1, high);
    merge(arr, low, mid, high);
}
//Quick Sort 
function findPivotIndex(arr, low, high) {
    var pivot = arr[low];
    var i = low;
    var j = high;
    while (i < j) {
        while (arr[i] <= pivot && i < high) {
            i++;
        }
        while (arr[j] > pivot && j > low) {
            j--;
        }
        if (i < j)
            swap(arr, i, j);
    }
    swap(arr, low, j);
    return j;
}
function quickSort(arr, low, high) {
    if (low <= high) {
        var pivotIndex = findPivotIndex(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}
var arr1 = [7, 4, 1, 5, 3];
var arr2 = [5, 4, 4, 1, 1];
quickSort(arr1, 0, 4);
quickSort(arr2, 0, 4);
console.log("test 1", arr1);
console.log("test 1", arr2);
