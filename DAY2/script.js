
// find the area of the cicle
function area_of_circle() {
    let r = 100;
    const PI = 3.142;
    let res = PI * r * r;
    console.log(res);
}

// Invoke
area_of_circle();
//__________________________________________________________

// Argument pass
function area_of_circle1(r) {
    const PI1 = 3.142;
    let res1 = PI1 * r * r;
    console.log(res1);
}
// Invoke
area_of_circle1(100000);

//_____________________________________________________

// Argument pass with return type
function area_of_circle2(r) {
    const PI2 = 3.142;
    let res2 = PI2 * r * r;
    return res2;
}

// Invoke
let x = area_of_circle2(10000);
console.log(x);

// area of square
//___________________________________________________________
function area_of_square() {
    let a = 10;
    let res = a * a;
    console.log("Area of square is ",res);
}

// Invoke
area_of_square();