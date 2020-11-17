// Listen For Submit
document.getElementById('form').addEventListener('submit', function (e) {
  // Hide Results
  document.getElementById('results').style.display = 'none';
  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResult, 1000);

  e.preventDefault();
});

// Calculate Results
function calculateResult() {

  // UI VARS
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('year');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // Values
  const principal = parseFloat(amount.value);
  const calculatedInterest = (parseFloat(interest.value) / 100 / 12);
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payement
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Result
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(1);
    totalPayment.value = (monthly * calculatedPayments).toFixed(1);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(1);

    // Show Results
    document.getElementById('results').style.display = 'block';
    // Hide loader
    document.getElementById('loading').style.display = 'none';

  } else {
    // Show Error
    showError('Please Enter Correct Details !');

    // Hide loader
    document.getElementById('loading').style.display = 'none';
  }

}

// Show Error
function showError(error) {
  // Create div 
  const errorDiv = document.createElement('div');
  // add class
  errorDiv.className = 'Error-box'
  // Create textnode and append into div
  errorDiv.appendChild(document.createTextNode(error));

  // Get elements
  const formBox = document.querySelector('.form-box');
  const heading = document.querySelector('.main-title');

  // insert error message above heading
  formBox.insertBefore(errorDiv, heading);

  // Clear error message after 3 seconds
  setTimeout(errorRemover, 4000);
}

// Clear error
function errorRemover() {
  document.querySelector('.Error-box').remove();
}