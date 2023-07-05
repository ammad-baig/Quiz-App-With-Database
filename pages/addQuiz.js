// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

import {
  getDatabase,
  set,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCGJYu-V-OYimnLdDrb6MUIkH1FrA1WRFA",

  authDomain: "table-of-students.firebaseapp.com",

  databaseURL: "https://table-of-students-default-rtdb.firebaseio.com",

  projectId: "table-of-students",

  storageBucket: "table-of-students.appspot.com",

  messagingSenderId: "18330696290",

  appId: "1:18330696290:web:f9c7216e29a7bddb7f6f3b",

  measurementId: "G-MW9J3B3235",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const database = getDatabase();

var question = document.getElementById("question");
var option = document.getElementById("option");
var optionParent = document.getElementById("optionParent");
var correctAnswerElem = document.getElementById("correctAnswer");

var options = [];

var correctAnswer;

function renderOptions() {
  optionParent.innerHTML = "";
  for (let i = 0; i < options.length; i++) {
    optionParent.innerHTML += `<li onclick = "setCorrectAnswer('${options[i]}')" class = 'p-2 px-4 bg-info-subtle fs-5 rounded-pill shadow my-2'>${options[i]}</li>`;
  }
}

window.addOption = function () {
  options.push(option.value);
  renderOptions();
};

window.setCorrectAnswer = function (a) {
  correctAnswer = a;
  correctAnswerElem.innerHTML = correctAnswer;
};

window.submitQuestion = function () {
  var obj = {
    question: question.value,
    options: options,
    correctAnswer: correctAnswer,
  };

  obj.id = push(ref(database, "questions/")).key;

  var reference = ref(database, `questions/${obj.id}`);
  set(reference, obj);

  //   console.log(obj);
};
