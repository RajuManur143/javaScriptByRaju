let fib1 = 0;
let fib2 = 1;
console.log("fib1 = ",fib1);
console.log("fib2 = ",fib2);


function fib(num) {

    for (let i = 2; i <= num; i++) {
        let fib3 = fib1 + fib2;
        console.log(fib3);
        fib1 = fib2;
        fib2 = fib3;
    }

}

let num = Number(prompt("Enter the number to find the fibonacci = "));
fib(num);
