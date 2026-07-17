/*

first call function 
___________________________
syntax =>
    function higerOrder(a) {

    a();
}

let a = function f_name() {

let r = 10;
const PI = 3.142;
let res = PI * r * r;
console.log(res);

}

// Invoke
higerOrder(a);

*/

function higerOrder(a) {
    a();
}

// first call function
let a = function area_of_circle() {
    let r = 10;
    const PI = 3.142;
    let res = PI * r * r;
    console.log(res);

}

// Invoke
higerOrder(a);