"use strict";
// Find the secod largest elemnt from an array
function findTheSecondLargest(arr) {
    let largest = arr[0];
    let secondLargest = -Infinity;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === largest)
            continue;
        if (arr[i] > largest) {
            secondLargest = largest;
            largest = arr[i];
        }
        else if (arr[i] > secondLargest) {
            secondLargest = arr[i];
        }
    }
    return secondLargest;
}
console.log(findTheSecondLargest([4, 5, 1, 4, 7, 4, 6]));
