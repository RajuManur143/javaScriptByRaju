

function sumOfDigits(num) {

    let sum = 0;

    while(num > 0) {
        let lastDigit = num % 10;
        sum += lastDigit;
        num = Math.floor(num / 10);
    }
return sum;
}

let num = Number(prompt("Enter the number to find the sum of its"))
let x = sumOfDigits(num);
console.log(x);
