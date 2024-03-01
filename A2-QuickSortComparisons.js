i = 5;
k = 100;
n = (2 ** i)*1000;

const array = Array(n).fill().map(() => Math.floor(Math.random() * n) + 1);
const array2 = Array(n);

for (let i = 0; i < array.length; i++){
    array2[i] = array[i];
}

/////////////////
function quickSort(A,l,r){
    if (l < r){
        q = randomizedPartition(A, l, r);
        quickSort(A,l,q-1);
        quickSort(A,q+1,r);
    }
}

function randomizedPartition(A,l,r){
    const i = Math.floor(Math.random() * (r - l + 1) + l);
    temp = A[i];
    A[i] = A[r];
    A[r] = temp;
    return partition(A,l,r);
}

function partition(A,l,r){
    x = A[r];
    i = l - 1;
    for (j = l; j < r; j++){
        if (A[j] <= x){
            i = i + 1;
            temp = A[i];
            A[i] = A[j];
            A[j] = temp;
        }
    }
    temp = A[i + 1];
    A[i + 1] = A[r];
    A[r] = temp;
    return (i + 1);
}
///////////////
function variantRandomizedQuickSort(A,l,r,k){
    variantQuickSort(A,l,r,k);
    insertionSort(A);
}

function variantQuickSort(A,l,r,k){
    if (l < r && (r - l + 1) >= k){
        q = randomizedPartition(A, l, r);
        variantQuickSort(A,l,q-1,k);
        variantQuickSort(A,q+1,r,k);
    }
}

function insertionSort(A) {
    for (let i = 1; i < A.length; i++) {
        let current = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > current) {
            A[j + 1] = A[j];
            j--;
        }
        A[j + 1] = current;
    }
}

const startTime = performance.now();
quickSort(array, 0, n - 1);
const endTime = performance.now();
const timeElapsed = endTime - startTime;
console.log(`QuickSort time: ${timeElapsed} milliseconds`);
const startTime2 = performance.now();
variantRandomizedQuickSort(array2, 0, n - 1, k);
const endTime2 = performance.now();
const timeElapsed2 = endTime2 - startTime2;
console.log(`Variant quicksort time: ${timeElapsed2} milliseconds`);
//console.log(array)
//console.log(array2)