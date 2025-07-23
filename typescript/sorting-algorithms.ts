function swap(arr: number[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
 }
 // Select the minimum => 
 function selectionSort(arr: number[]) {
     const n = arr.length;
     for(let i = 0; i < n - 1; i++) {
       let minimum = i;
       for(let j = i; j < n; j++) {
         if(arr[j] < arr[minimum]) {
            minimum = j;
         }
       }
       swap(arr, i, minimum);
     }
 
     return arr;
 }
 
 // bubble Sort => move the bigger element to the last
 function bubbleSort(arr: number[]) {
   const n = arr.length;
 
   for(let i = n - 1; i >=0; i--) {
     let didiSwap = 0;
     for(let j = 0; j < i; j++) {
       if(arr[j] > arr[j + 1]) {
         swap(arr, j, j + 1);
         didiSwap = 1;
       }
     }
     if(didiSwap === 0) {
       break;
     }
   }
 
   return arr;
 }
 
 
 // InsertionSort => 
 
 function insertionSort(arr: number[]) {
   const n = arr.length;
 
   for(let i = 0; i < n; i++) {
     let j = i;
     while(j > 0 && arr[j] < arr[j-1]) {
       swap(arr, j, j - 1);
       j--;
     }
   }
 
   return arr;
 }
 
 function merge(arr: number[], low: number, mid: number, high: number) {
   let first = low;
   let second = mid + 1;
   let temp = [];
 
   while(first <= mid && second <= high) {
     if(arr[first] < arr[second]) {
       temp.push(arr[first]);
       first++;
     } else {
       temp.push(arr[second]);
       second++;
     }
   }
 
   while(first <= mid) {
     temp.push(arr[first]);
     first++;
   }
 
   while(second <= high) {
     temp.push(arr[second]);
     second++;
   }
 
   for(let i = low; i <= high; i++) {
     arr[i] = temp[i - low];  // 0 4 => 4 - 4 => 0
   }
 }
 
 function mergeSort(arr: number[], low: number, high: number) {
   if(low === high) return;
 
   const mid = Math.floor((low + high) / 2);
 
   mergeSort(arr, low, mid);
   mergeSort(arr, mid + 1, high);
 
   merge(arr,low, mid, high);
 }
 
 
 //Quick Sort 
 
 function findPivotIndex(arr: number[], low: number, high: number) {
    const pivot = arr[low];
    let i = low ;
    let j = high;
 
    while(i < j) {
        while(arr[i] <= pivot && i < high) {
            i++;
        }
 
        while(arr[j] > pivot && j > low) {
          j--;
        }
 
        if(i < j) swap(arr, i, j);
    }
    swap(arr, low, j);
    return j;
 }
 
 function quickSort(arr: number[], low: number, high: number) {
   if(low <= high) {
     const pivotIndex = findPivotIndex(arr, low, high);
     quickSort(arr, low, pivotIndex - 1);
     quickSort(arr, pivotIndex + 1, high);
   }
 }
 
 const arr1 = [7, 4, 1, 5, 3];
 const arr2 = [5, 4, 4, 1, 1];
 quickSort(arr1, 0, 4)
 quickSort(arr2, 0, 4)
 
 
 console.log("test 1", arr1);
 console.log("test 1", arr2);