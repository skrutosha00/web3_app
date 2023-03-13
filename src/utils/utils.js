function getAmountString(amount, currency) {
  let accuracy = currency == "wax" ? 8 : 4;

  return Number(amount).toFixed(accuracy) + " " + currency.toUpperCase();
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, ms);
  });
}

export { getAmountString, sleep };
