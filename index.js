const billInput = document.querySelector("#bill");

const buttonTip = document.querySelectorAll("#button-tip");

const inputTip = document.querySelector("#input-tip");

const numberOfPeopleEl = document.querySelector("#number-of-people");

const tipAmountEl = document.querySelector(".tip-amount");

const totalAmountEl = document.querySelector(".total-amount");

const invalidEl = document.querySelectorAll(`#invalid`);

const inputEl = document.querySelectorAll(".input");

const buttonReset = document.querySelector("#button-reset");

const countTipAmount = function (bill, tipPercentage, numberOfPeople) {
  return (bill * tipPercentage) / numberOfPeople;
};

const countTotalAmount = function (bill, tip, numberOfPeople) {
  return bill + tip;
};

const displayToggle = function () {
  billInput.addEventListener("input", function () {
    if (billInput.value) {
      invalidEl[0].classList.add("hidden");
      inputEl[0].classList.remove("invalid-border");
      buttonReset.classList.add("active");
      inputTip.value = "";
    } else if (!inputTip.value && !numberOfPeopleEl.value && !billInput.value) {
      buttonReset.classList.remove("active");
      t;
    } else if (!billInput.value) {
      tipAmountEl.textContent = `$0.00`;
      totalAmountEl.textContent = `$0.00`;
    }
  });
  numberOfPeopleEl.addEventListener("input", function () {
    if (numberOfPeopleEl.value) {
      invalidEl[1].classList.add("hidden");
      inputEl[1].classList.remove("invalid-border");
      buttonReset.classList.add("active");
      inputTip.value = "";
    } else if (!inputTip.value && !numberOfPeopleEl.value && !billInput.value) {
      buttonReset.classList.remove("active");
    }
  });

  inputTip.addEventListener("input", function () {
    if (inputTip.value) {
      buttonReset.classList.add("active");
    } else if (!inputTip.value && !numberOfPeopleEl.value && !billInput.value) {
      buttonReset.classList.remove("active");
    }
  });
};

displayToggle();

const invalidation = function (type, index) {
  if (!type) {
    invalidEl[index].classList.remove("hidden");
    inputEl[index].classList.add("invalid-border");
  } else {
    invalidEl[index].classList.add("hidden");
    inputEl[index].classList.remove("invalid-border");
  }
};

const reset = function () {
  tipAmountEl.textContent = `$0.00`;
  totalAmountEl.textContent = `$0.00`;
  billInput.value = ``;
  numberOfPeopleEl.value = ``;
  inputTip.value = ``;
  buttonReset.classList.remove("active");
  invalidEl.forEach((el) => {
    el.classList.add("hidden");
  });
  inputEl.forEach((el) => {
    el.classList.remove("invalid-border");
  });
};

const displayUI = function (value) {
  const bill = +billInput.value;
  const tipPercentage = value;
  const numberOfPeople = +numberOfPeopleEl.value;
  invalidation(bill, 0);
  invalidation(numberOfPeople, 1);
  if (billInput && numberOfPeople) {
    const tipAmount = countTipAmount(bill, tipPercentage, numberOfPeople);
    const totalAmount = countTotalAmount(bill, tipAmount, numberOfPeople);
    tipAmountEl.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountEl.textContent = `$${totalAmount.toFixed(2)}`;
  }
};

buttonTip.forEach((btn) => {
  btn.addEventListener("click", function () {
    const tipPercentage = +this.dataset.number;
    inputTip.value = "";
    displayUI(tipPercentage);
  });
});

inputTip.addEventListener("input", function () {
  const tipPercentage = +this.value / 100;
  displayUI(tipPercentage);
});

buttonReset.addEventListener("click", function () {
  reset();
});
