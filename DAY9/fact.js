
let sum = 1;

function factorial(num) {
    for (let i = num; i >=1; i--) {
        sum = sum * i;
    }
    console.log("factorail numbers "+num+" is = ",sum);
}

let num = Number(prompt("Enter the to find the factorial is = "));
factorial(num);