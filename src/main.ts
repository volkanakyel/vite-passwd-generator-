import { generator } from "./counter";

const slider: Element | null = document.querySelector(".custom-range");
const lowerEl: Element | null = document.querySelector("#hasLowercase");
const upperEl: Element | null = document.querySelector("#hasUppercase");
const numbersEl: Element | null = document.querySelector("#hasNumber");
const symbolsEl: Element | null = document.querySelector("#hasSymbol");
const resultEl: Element | null = document.querySelector(".passwd-result");
const copyEl: Element | null = document.querySelector("#copy-icon");

const generateBtn = document.querySelector(".passwd-cta");

const strengthLevels = [
  {
    1: "TOO WEAK!",
    color: "#f64a4a",
  },
  { 2: "WEAK", color: "#fb7c58" },
  { 3: "MEDIUM", color: "#f8cd65" },
  { 4: "STRONG", color: "#a4ffaf" },
];

const strength = (types: any) => {
  strengthLevels.forEach((lvl: any) => {
    if (Object.keys(lvl)[0] == types.length) {
      const p = document.querySelector("#strength-level-text");
      (p as HTMLElement).innerText = lvl[types.length];
    }
  });

  const bars: NodeListOf<Element> = document.querySelectorAll(".strength-bar");

  bars.forEach((bar: Element, index: number) => {
    if (index <= types.length - 1) {
      (bar as HTMLInputElement).style.backgroundColor =
        strengthLevels[types.length - 1].color;
      return;
    }

    (bar as HTMLInputElement).style.backgroundColor = "transparent";
  });
};

const app = () => {
  const displayLength: Element | null =
    document.querySelector(".passwd-number");
  const length = (slider as HTMLInputElement).defaultValue;

  if (displayLength) displayLength.innerHTML = length;
};

const handleCopy = () => {
  const textarea = document.createElement("textarea");
  const copyText = resultEl ? resultEl.innerHTML : null;

  if (!copyText) return;

  textarea.value = copyText;
  document.body.appendChild(textarea);
  textarea.select();
  if (!navigator.clipboard) {
    document.execCommand("copy");
  } else {
    navigator.clipboard
      .writeText(copyText)
      .then(function () {
        const span = document.createElement("span");
        span.innerText = "copied";
        (copyEl as HTMLInputElement).insertAdjacentElement("afterbegin", span);

        setTimeout(() => {
          copyEl?.removeChild(span);
        }, 2000);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  textarea.remove();
};

copyEl?.addEventListener("click", handleCopy);

const handleCharLengthChange = () => {
  const displayLength: Element | null =
    document.querySelector(".passwd-number");
  const length = (slider as HTMLInputElement).value;

  if (displayLength) displayLength.innerHTML = length;
};

slider?.addEventListener("change", handleCharLengthChange);

generateBtn?.addEventListener("click", () => {
  const length = (slider as HTMLInputElement).value;
  const hasLower = (lowerEl as HTMLInputElement).checked;
  const hasUpper = (upperEl as HTMLInputElement).checked;
  const hasNumber = (numbersEl as HTMLInputElement).checked;
  const hasSymbols = (symbolsEl as HTMLInputElement).checked;

  (resultEl as HTMLInputElement).innerHTML = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbols,
    length
  );
});

const generatePassword = (
  lower: boolean,
  upper: boolean,
  numbers: boolean,
  symbols: boolean,
  length: string | number
) => {
  let generatedPassword = "";

  const types = [{ lower }, { upper }, { numbers }, { symbols }].filter(
    (item) => Object.values(item)[0]
  );

  let typesCount = types.length;

  if (typesCount <= 0) {
    return "";
  }

  for (let i = 0; i < length; i++) {
    generatedPassword += (generator as any)[
      Object.keys(types[Math.floor(Math.random() * typesCount)])[0]
    ]();
  }

  strength(types);

  return generatedPassword;
};

app();
