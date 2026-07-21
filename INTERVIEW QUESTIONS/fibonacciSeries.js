
function fibonacci(num) {

    let firstTerm = 0;
    let secondTerm = 1;
    let thirdTerm = 0;

    for (let i = 2; i <= num; i++) {
        thirdTerm = firstTerm + secondTerm;
        firstTerm = secondTerm;
        secondTerm = thirdTerm;
    }
return thirdTerm;
}

let num = Number(prompt("Enter the number to find the fibonacci"));
let x = fibonacci(num);
console.log(x);
