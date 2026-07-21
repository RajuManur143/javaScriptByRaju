
function amstrongNumber(num) {

    let original = num;
    let sum = 0;

    let digit = num.toString().length;

    while (num > 0) {
        let lastDigit = num % 10;
        sum += lastDigit ** digit;
        num = Math.floor(num / 10);
    }

    if (original == sum) {
        return true;
    }
    else {
        return false;
    }
}

let num = Number(prompt("Enter the number to find the amstrong number"));
let x = amstrongNumber(num);
if (x) {
    console.log("Armstrong number");
}
else {
    console.log("Not ArmStrong number");
}