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

function getLoan()
{
    if (isRepayLoan == false)
    {
            let loanInput = prompt("How big a loan do you want?"); //Promp windows opens and lets the user type in loan amount.
            loanInput = parseInt(loanInput); //Parsing so I will get correct format.
            checkNaN = Number.isInteger(loanInput);//Alerting user that they didn't enter a digit.
            if (checkNaN == false || loanInput < 1) 
            {
                alert("You must enter a valid number.")
            }
       
            do 
            {//I want to do this until the user adds a correct loan amount.
                if ((loanInput) > (balance * 2))
                { //Maximum loan is double the amount in bank. We check that Joe cannot loan more the double the amount.
                    alert("You can't loan more than double your bank account. Maximum loan amount for you now is " + (balance * 2));
                    loanInput = prompt("How big a loan do you want?"); //Promp windows opens and lets the user type in loan amount.
                    loanInput = parseInt(loanInput); //Parsing so I will get correct format.
                    checkNaN = Number.isInteger(loanInput);//Alerting user that they didn't enter a digit.
                    if (checkNaN == false) 
                    {
                        alert("You must enter a valid number.")
                    }
                }
            } while ((loanInput) > (balance * 2));
            
            if ((loanInput) <= (balance * 2) && loanInput > 0) //If the loan input is acceptable then we will be adding it to the outstanding loan.
            { 
                outstandingLoan = loanInput; //Adding loan to the outstanding loan.
                loanInput = 0; //resetting loan.
                isRepayLoan = true; //Set bool to true so that user cant make new loan until this one is repaid.
                return document.getElementById("outstandingLoan").innerHTML = outstandingLoan; //Adding loan to outstanding loan.
            }               
    }
    else 
    {
         alert("You must repay your loan before you can make a new one!");
    }       
}