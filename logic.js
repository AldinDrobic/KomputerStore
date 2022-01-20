let balance = 0; //This is Joes bank accout balance
let outstandingLoan = 0;
let isRepayLoan = false;
let pay = 0;
const computerArray = [];
const selectComputerElement = document.getElementById("computerListId"); 

function incrementPay(){
    pay += 100;
    return document.getElementById("pay").innerText = pay;
}

function transferPayToBank()
{
    function repayLoanByPay()//If we have a loan this function will repay the loan when the pay is transfered from pay to bank.
    {
        console.log("Repayloan bool: " + isRepayLoan);
        if (isRepayLoan){
            let reservedDeduction = 0.1 * pay; //Deduction is where the 10% of the pay amount is saved so it can be reserved for the outstanding loan.
            console.log("reserved deduction: " + reservedDeduction);
            outstandingLoan -= reservedDeduction; //Here is where the deduction is subtracted with the outstanding loan.
            console.log("Outstanding loan: " + outstandingLoan)
            pay -= reservedDeduction; //Drag of the 10% deduction from pay beacuse the 10% went to the outstanding loan.
            console.log("Pay: " + pay);
            if (outstandingLoan < 0) //If deduction is bigger than outstanding loan (outstanding loan = 10 && reservedDeduction == 15) then it will be negative. If this happens we want to return the money that is overflowing to Joe.
            {
                pay += (outstandingLoan * (-1)) //Multiply with -1 so the negative number will be positive. Then add it to the bank.                
            }
            if(outstandingLoan <= 0)//If we don't have any loan we will set the bool to false here.
            {
                isRepayLoan = false; //Set bool to false so the user can make a new loan.
                document.getElementById("outstandingLoanDiv").style.display = "none";
            }
        }
    }
    function resetPay()//Resets pay to 0 after the amount has been transfered to bank.
    { 
        pay = 0;
        return document.getElementById("pay").innerText = pay;
    }
    repayLoanByPay(); //Must run before resetPay() beacuse if Joe has an outstanding loan 10% of the pay must first be reserved.
    balance += pay; //Must run down here beacuse of conditions.
    resetPay(); //Set the pay to 0.
    document.getElementById("outstandingLoan").innerText = outstandingLoan;
    document.getElementById("balance").innerText = balance;

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

            if ((loanInput) > (balance * 2))//Maximum loan is double the amount in bank. We check that Joe cannot loan more the double the amount.
            { 
                alert("You can't loan more than double your bank account. Maximum loan amount for you now is " + (balance * 2));
            }

            if ((loanInput) <= (balance * 2) && loanInput > 0) //If the loan input is acceptable then we will be adding it to the outstanding loan.
            { 
                outstandingLoan = loanInput; //Adding loan to the outstanding loan.
                balance += loanInput;
                loanInput = 0; //resetting loan.
                isRepayLoan = true; //Set bool to true so that user cant make new loan until this one is repaid.
                document.getElementById("outstandingLoan").innerText = outstandingLoan; //Adding loan to outstanding loan.
                document.getElementById("balance").innerText = balance;
                document.getElementById("outstandingLoanDiv").style.display = "block";

            }              
    }
    else 
    {
         alert("You must repay your loan before you can make a new one!");
    }       
}

function repayLoan(){
    if (pay < outstandingLoan)
    {
        alert("You have insufficient pay, go and work a little bit.")
    }
    else
    {
        outstandingLoan = document.getElementById("outstandingLoan").innerText;
        pay -= outstandingLoan;
        outstandingLoan = 0;
        balance += pay;
        pay = 0;
        isRepayLoan = false; //Set bool to true so that user cant make new loan until this one is repaid.
        document.getElementById("balance").innerText = balance;
        document.getElementById("pay").innerText = pay;
        document.getElementById("outstandingLoan").innerText = outstandingLoan;       
        document.getElementById("outstandingLoanDiv").style.display = "none";
    }
   
}

//Fetching api and sending data to store
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
.then(function(response)
{    
    return response.json()
})
.then(function(getArray)
{
    for (computer of getArray) {
        computerArray.push(computer);
    }  
})
.then(function() //This function will populate select list with data from array.
{
    for (computer of computerArray) 
    {         
        const computerElement = document.createElement("option");
        computerElement.value = computer.id;
        computerElement.appendChild(document.createTextNode(computer.title));
        selectComputerElement.appendChild(computerElement);  
        // document.getElementById("computerFeatures").innerText = computerArray[selectComputerElement.value-1].specs; //Setting description, it is -1 beacuse we are referencing index num inside the array 
    }
    setSelectedComputer()//This must run here for the first time so that the computer data will be shown in html.
})

function setSelectedComputer()
{
    document.getElementById("computerFeatures").innerText = computerArray[selectComputerElement.value-1].specs; //Setting description, it is -1 beacuse we are referencing index num inside the array 
    document.getElementById("computerTitle").innerText = computerArray[selectComputerElement.value-1].title;
    document.getElementById("computerDescription").innerText = computerArray[selectComputerElement.value-1].description;
    document.getElementById("computerPrice").innerText = computerArray[selectComputerElement.value-1].price;
    document.getElementById("computerImage").src = "https://noroff-komputer-store-api.herokuapp.com/"  + computerArray[selectComputerElement.value-1].image;
}

function buyComputer()
{
    if(balance >= computerArray[selectComputerElement.value-1].price && isRepayLoan == false)
    {
        alert("You successfully bought a computer.")
        balance -= computerArray[selectComputerElement.value-1].price;
        document.getElementById("balance").innerText = balance;
    }
    else if (isRepayLoan == true)
    {
        alert("You must repay your loan before you buy a computer.")
    }
    else
    {
        alert("You have insufficient balance")
    }
}



 