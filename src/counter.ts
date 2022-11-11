const generateRandomLower = (): string => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const generateRandomUpper = (): string => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const generateRandomNumber = (): string => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const generateRandomSymbol = (): string => {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generator = {
  lower: generateRandomLower,
  upper: generateRandomUpper,
  numbers: generateRandomNumber,
  symbols: generateRandomSymbol,
};

export { generator };
