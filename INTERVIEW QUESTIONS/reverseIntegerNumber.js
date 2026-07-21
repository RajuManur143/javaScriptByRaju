
function reverseNumber(num) {
    let reverse = 0;
    while (num > 0) {
        let lastDigit = num % 10;
        reverse = reverse * 10 + lastDigit;
        num = Math.floor(num / 10);
    }
return reverse;
}

let num = Number(prompt("Enter the number which is more than two digits = "));
let x = reverseNumber(num);
console.log(x);
