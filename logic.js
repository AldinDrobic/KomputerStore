let balance = 0; //This is Joes bank accout balance
let outstandingLoan = 0;
let isRepayLoan = false;
let pay = 0;

function incrementPay(){
    pay += 100;
    return document.getElementById("pay").innerHTML = pay;
}