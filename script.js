"use strict";

/////////// Data ////////////

const account1 = {
  owner: "Bakiye Sema Sarıçam",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  username: "bss",
  pin: 1111,

  movementsDates: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-07-26T17:01:17.194Z",
    "2023-01-01T23:36:17.929Z",
    "2023-01-06T10:51:36.790Z",
  ],
  currency: "TRY",
  locale: "tr-TR",
};

const account2 = {
  owner: "Hakan Sarıçam",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  username: "hs",
  pin: 2222,

  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "TRY",
  locale: "tr-TR",
};

const account3 = {
  owner: "Umut Berkan Sarıçam",
  movements: [3000, 3400, -150, -790, -3210, -1000, 18500, -30],
  username: "ubs",
  pin: 3333,

  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "TRY",
  locale: "tr-TR",
};

const account4 = {
  owner: "İrem Pınar Sarıçam",
  movements: [5000, 3400, -150, -790, -3210, -1000, 13500, -350],
  username: "ips",
  pin: 4444,

  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "TRY",
  locale: "tr-TR",
};

const account5 = {
  owner: "Emir Kaan Sarıçam",
  movements: [5000, 3400, -150, -790, -3210, 11000, -8500, -30],
  username: "eks",
  pin: 5555,

  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "TRY",
  locale: "tr-TR",
};

const account6 = {
  owner: "Yüksel Şule Cantekin",
  movements: [5000, -3400, -150, -790, -3210, -1000, 13600, -30],
  username: "yşc",
  pin: 6666,

  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "TRY",
  locale: "tr-TR",
};

const accounts = [account1, account2, account3, account4, account5, account6];

/////// Elements ////////////////
const body = document.querySelector(".body");
const accountsInfo = document.querySelector(".accounts-info");

const labelBalance = document.querySelector(".balance");
const labelWelcome = document.getElementById("welcome-msg");

const containerApp = document.querySelector(".app");
const accMovements = document.querySelector(".account-movements");

const btnLogin = document.getElementById("login-btn");
const btnTransfer = document.querySelector(".transfer-btn");
const btnDeposit = document.getElementById("deposit-btn");

const inputLoginUsername = document.querySelector(".login_input--user");
const inputLoginPin = document.querySelector(".login_input--pin");
const inputDepositAmount = document.getElementById("deposit-amount");
const inputTransferTo = document.querySelector("#transfer-user");
const inputTransferAmount = document.querySelector("#transfer-amount");

/// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  accMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "Gelen" : "Giden";

    const amountType = mov > 0 ? "amount-deposit" : "amount-withdrawal";

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <li>
      <span class="description">${type}</span>
      <span class="date">${displayDate}</span>
      <span class="amount ${amountType}">${formattedMov}</span>
  </li>
    `;

    accMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const updateUI = function (acc) {
  // Remove Accounts Info
  accountsInfo.remove();
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);
};

///////////////////////////
// EVENT HANDLERS

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Hoşgeldin, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnDeposit.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputDepositAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update Date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputDepositAmount.value = "";
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add Transfer Date

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});
