const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const displayDays = document.querySelector("#days");
const displayMonths = document.querySelector("#months");
const displayYears = document.querySelector("#years");
const submitButton = document.querySelector("#calculate-button");
const inputNodes = document.querySelectorAll("input");
const labelNodes = document.querySelectorAll("label");
const errorText = document.querySelector("#error-text");
let inputError = false;

const getDateString = (day, month, year) => {
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000) {
    inputError = true;
    return;
  }
  return `${year}-${month}-${day}`;
};

const convertMillisecondsToTime = (duration) => {
  const sec = Math.floor(duration / 1000);
  const min = Math.floor(sec / 60);
  const hrs = Math.floor(min / 60);
  let days = Math.floor(hrs / 24);
  let months = Math.floor(days / 30);
  days = days % 30;
  let years = Math.floor(months / 12);
  months = months % 12;
  return [days, months, years];
};

const addError = () => {
  inputNodes.forEach((element) => {
    element.classList.add("border-[#ff5757]");
  });
  labelNodes.forEach((element) => {
    element.classList.remove("text-[#716f6f]");
    element.classList.add("text-[#ff5757]");
  });
  errorText.classList.remove("hidden");
};

const removeError = () => {
  inputNodes.forEach((element) => {
    element.classList.remove("border-[#ff5757]");
  });
  labelNodes.forEach((element) => {
    element.classList.add("text-[#716f6f]");
    element.classList.remove("text-[#ff5757]");
  });
  errorText.classList.add("hidden");
};

const calculateTime = () => {
  inputError = false;
  const currentTime = new Date();
  const givenDateStr = getDateString(day.value, month.value, year.value);
  if (inputError) {
    return;
  }
  const givenTime = new Date(givenDateStr);
  const diff = currentTime - givenTime;
  if (diff < 0) {
    inputError = true;
    return;
  }
  const [days, months, years] = convertMillisecondsToTime(diff);
  displayDays.innerText = days;
  displayMonths.innerText = months;
  displayYears.innerText = years;
  inputError = false;
};

submitButton.addEventListener("click", () => {
  calculateTime();
  if (inputError) {
    addError();
  } else {
    removeError();
  }
});
btn.addEventListener("click", addError);
