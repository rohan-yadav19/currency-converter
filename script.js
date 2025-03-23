const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

// Fetch currency options
async function loadCurrencies() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    // Populate dropdowns
    currencies.forEach((currency) => {
      let option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;
      fromCurrency.appendChild(option1);

      let option2 = document.createElement("option");
      option2.value = currency;
      option2.textContent = currency;
      toCurrency.appendChild(option2);
    });

    // Set default values
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
}

// Convert currency
async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = amount.value;

  if (amountValue === "" || amountValue <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const rate = data.rates[to] / data.rates[from];
    const convertedAmount = (amountValue * rate).toFixed(2);

    result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    result.textContent = "Error fetching exchange rate!";
  }
}

// Load currency options on page load
loadCurrencies();
