
function GCD(num1, num2) {

    let hcf = 1;

    for (let i = 1; i < Math.min(num1,num2); i++) {
        if (num1 % i == 0 && num2 %  i == 0) {
            hcf = i;
        }
    }
return hcf;
}


let  num1 = Number(prompt("Enter the number to find the gcd"));
let num2 = Number(prompt("Enter the 2nd number to find the gcd"));

let x = GCD(num1, num2);
console.log(x);
