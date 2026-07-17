/* Generative function
Syntax->
function* f_name() {
    yield 1;
    yield 2;
    yield 3;
}
f_name();
*/

function* bankLoan() {

    console.log("Apply on online");
    yield 1;

    console.log("Document verification")
    yield 2;

    console.log("Check the civil score");
    yield 3;

    console.log("Grant the loan");

}

let a = bankLoan();
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());

