let balance = 0; //This is Joes bank accout balance
let outstandingLoan = 0;
let isRepayLoan = false;
let pay = 0;

function incrementPay(){
    pay += 100;
    return document.getElementById("pay").innerText = pay;
}

function transferPayToBank(){
    balance += pay;
    
    function resetPay(){ //Resets pay to 0 after the amount has been transfered to bank.
        pay = 0;
        return document.getElementById("pay").innerText = pay;
    }

    function repayLoanByPay(){//If we have a loan this function will repay the loan when the pay is transfered from pay to bank.
        if (isRepayLoan){
            let reservedDeduction = 0.1 * pay; //Deduction is where the 10% of the pay amount is saved so it can be reserved for the outstanding loan.
            outstandingLoan -= reservedDeduction; //Here is where the deduction is subtracted with the outstanding loan.
            if (outstandingLoan < 0) //If deduction is bigger than outstanding loan (outstanding loan = 10 && reservedDeduction == 15) then it will be negative. If this happens we want to return the money that is overflowing to Joe.
            {
                outstandingLoan = (outstandingLoan * (-1)) //Multiply with -1 so the negative number will be positive. Then add it to the bank.
                isRepayLoan = false; //Set bool to false so the user can make a new loan.
            }
        }
    }

    repayLoanByPay(); //Must run before resetPay() beacuse if Joe has an outstanding loan 10% of the pay must first be reserved.
    resetPay(); //Set the pay to 0.
    return document.getElementById("balance").innerText = balance;

}