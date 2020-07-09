let tableBody = document.querySelector('.tableBody');
let initialAmount = document.getElementById('initial_amount');
let interestRate = document.getElementById('interest_rate');
let years1 = document.getElementById('years1');
const button1 = document.getElementById('button1');
let notification = document.getElementById('form-notification')

button1.addEventListener('click', function() {
  if(initialAmount.value == 0 || interestRate.value == 0 || years1.value == 0) {
    notification.textContent = "Fill all sections above to get final value"
  }
  else if(years1.value < 0 || years1.value > 100) {
    notification.textContent = "Years should be between 0 and 100";
  }
  else {
    notification.textContent = "";
    runCalculations(initialAmount.value, interestRate.value, years1.value)
  }
})

function twoDecimals(num) {
  num = Number(num);
  return Number(num.toFixed(2));
}

function runCalculations(initial_amount, interest_rate, years) {
  let tableRows = "";

  function addToTable(year, amount, interest, total) {
     tableRows += `<tr><td>${year}</td><td>${amount}</td><td>${interest}</td><td>${total}</td></tr>`
  }

  let amount = twoDecimals(initial_amount);
  let interest = amount * twoDecimals(interest_rate) / 100;
  interest = twoDecimals(interest);
  let total = twoDecimals(amount + interest);
  addToTable(1, amount, interest, total);

  for(let i=2; i<=years; i++) {
    amount = total;
    interest = amount * twoDecimals(interest_rate) / 100;
    interest = twoDecimals(interest)
    total = twoDecimals(amount+interest);
    addToTable(i, amount, interest, total);
  }

  tableBody.innerHTML = tableRows;
}



