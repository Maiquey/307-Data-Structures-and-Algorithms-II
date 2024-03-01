n = 30;

const pArray = [0, 1, 5, 8, 9, 12, 15, 16, 19, 24, 30, 36, 38, 42, 45, 46, 49, 54, 56, 57, 58, 60, 64, 66, 69, 72, 74, 77, 80, 84, 86];
function CutRod(p, n){ /* p is an array, p[i] has the price for piece of i inches.*/
    if (n == 0){
        return 0;
    }
    q = -999999;
    for (let i = 1; i < n + 1; i++){
        q = Math.max(q, p[i] + CutRod(p, n - i))
    }
    return q;
}

function MemoizedCutRod(p, n){
    r = Array(n+1).fill(-999999);
    return MemoizedCutRodAux(p, n, r);
}

function MemoizedCutRodAux(p, n, r){
    if (r[n] >= 0){
        return r[n];
    } else if (n == 0) {
        q = 0;
    } else {
        q = -999999;
    }
    for (let i = 1; i <= n; i++){
        q = Math.max(q, p[i] + MemoizedCutRodAux(p, n - i, r));
    }
    r[n] = q;
    return q;
}

function BottomUpCutRod(p, n){
    r = Array(n+1).fill(-999999);
    r[0] = 0;
    for (j = 1; j <= n; j++){
        q = -999999;
        for (i = 1; i <= j; i++){
            q = Math.max(q, p[i] + r[j - i]);
        }
        r[j] = q;
    }
    return r[n];
}

const startTime = performance.now();
q = CutRod(pArray, n);
console.log(q)
const endTime = performance.now();
const timeElapsed = endTime - startTime;
console.log(`CutRod time: ${timeElapsed} milliseconds`);

const startTime2 = performance.now();
q = MemoizedCutRod(pArray, n);
console.log(q)
const endTime2 = performance.now();
const timeElapsed2 = endTime2 - startTime2;
console.log(`CutRod time: ${timeElapsed2} milliseconds`);

const startTime3 = performance.now();
q = BottomUpCutRod(pArray, n);
console.log(q)
const endTime3 = performance.now();
const timeElapsed3 = endTime3 - startTime3;
console.log(`CutRod time: ${timeElapsed3} milliseconds`);
