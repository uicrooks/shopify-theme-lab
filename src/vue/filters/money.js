const money = (val, currency, toFixedVal = 2) => {
  if (!val) return "N/A";
  const money = (val / 100).toFixed(toFixedVal);
  return currency ? `${currency}${money}` : money;
};

export {
  money
};