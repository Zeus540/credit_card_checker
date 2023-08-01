export function cleanCardNumber(cardNumber) {

  const cleanedNumber = String(cardNumber).replace(/[^\d]/g, '');

  return cleanedNumber;
}

export function formatCardNumberVisible(cardNumber) {


  const formattedNumber = cleanCardNumber(cardNumber).replace(/(\d{4})(?=\d)/g, '$1 ');

  return formattedNumber;
}

export function formatCardNumberHidden(cardNumber) {

  const formattedNumber = cleanCardNumber(cardNumber).replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 XXXX XXXX $4');

  return formattedNumber;
}

export function formatCvvNumberVisible(cardNumber) {

  const formattedNumber = cleanCardNumber(cardNumber).replace(/(\d{3})/, '$1');

  return formattedNumber;
}

export function formatCvvNumberHidden(cardNumber) {

  const formattedNumber = cleanCardNumber(cardNumber).replace(/\d+/g, (match) => 'X'.repeat(match.length));

  return formattedNumber;
}
