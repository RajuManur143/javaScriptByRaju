function isPrime(num) {

    for (let i = 2; i < num; i++) {
        if ( num % i  == 0) {
            return false;
        }
    }
return true;
}

let num = Number(prompt("Enter the number to check prime or not"));
let x = isPrime(num);
if (x) {
    console.log("is prime number");
}
else {
    console.log("not prime number");
    
}