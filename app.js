// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

import {
  getDatabase,
  ref,
  onChildAdded,
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

var loader = document.getElementById("loader");
var showQuestion = document.getElementById("showQuestion");

function getDataFromDatabase() {
  loader.style.display = "block";
  showQuestion.style.display = "none";

  var reference = ref(database, "questions/");
  onChildAdded(reference, function (data) {
    // console.log(data.val());
    questions.push(data.val());

    loader.style.display = "none";
    showQuestion.style.display = "block";

    renderQuestion();
  });
}
getDataFromDatabase();

var questions = [];

var currentQuestion = document.getElementById("currentQuestion");
var totalQuestions = document.getElementById("totalQuestions");
var question = document.getElementById("question");
var optionParent = document.getElementById("optionParent");

var indexNum = 0;
var score = 0;

window.nextQuestion = function () {
  if (indexNum + 1 == questions.length) {
    alert("Congrants you Scored " + score);
    window.location.assign("index.html")
  } else {
    indexNum++;
    renderQuestion();
  }
};

window.checkAnswer = function (a, b) {
  if (a == b) {
    score++;
  }
  nextQuestion();
};

function renderQuestion() {
  currentQuestion.innerHTML = indexNum + 1;
  totalQuestions.innerHTML = questions.length;

  var obj = questions[indexNum];

  question.innerHTML = obj?.question;

  optionParent.innerHTML = "";

  for (let i = 0; i < obj?.options?.length; i++) {
    optionParent.innerHTML += ` <div class="col-md-6 p-3">
    <div>
    <button onclick="checkAnswer('${obj?.options[i]}','${obj?.correctAnswer}')" class="btn btn-outline-light rounded-pill w-100 fs-4">
        ${obj?.options[i]}
      </button>
    </div>
  </div>`;
  }
}
renderQuestion();
