import "./styles/style.css";
import "./styles/mode-switcher.css";
import { handleTheme } from "./theme";

// handle color theme
handleTheme();

// Random question
import questions from "./dataset/questions.json";
const len = questions.length;
let randomPick = 0;

const pickButton = document.querySelector<HTMLDivElement>(".action button")!;
const actionButton =
  document.querySelector<HTMLButtonElement>("textarea+button");

actionButton?.addEventListener("click", () => {
  const textarea = document.querySelector<HTMLTextAreaElement>("textarea");
  if (actionButton.innerText === "Save") {
    const content = textarea?.value;
    const answers = JSON.parse(localStorage.getItem("bip-answers") || "[]");
    answers[randomPick] = content;
    localStorage.setItem("bip-answers", JSON.stringify(answers));
    alert("save!");
  } else {
    textarea && (textarea.style.display = "block");
    const answers = JSON.parse(localStorage.getItem("bip-answers") || "[]");
    textarea && (textarea.value = answers[randomPick]);
    actionButton && (actionButton.innerHTML = "Save");
  }
});

let counter: number = 0;
function randomQuestion() {
  const textarea = document.querySelector<HTMLTextAreaElement>("textarea");
  textarea && (textarea.value = "");
  if (counter < 50) {
    randomPick = Math.floor(Math.random() * len);
    const pickedQuestion = questions[randomPick];
    const question = document.querySelector<HTMLDivElement>(".question")!;
    question.innerHTML = pickedQuestion.question;
    counter++;
    window.requestAnimationFrame(randomQuestion);
  } else {
    counter = 0;
    // check if this question has answer associate to it
    const answers = JSON.parse(localStorage.getItem("bip-answers") || "[]");
    if (answers[randomPick]) {
      textarea && (textarea.style.display = "none");
      textarea && (textarea.value = answers[randomPick]);
      actionButton && (actionButton.innerHTML = "Show answer");
    } else {
      textarea && (textarea.style.display = "block");
      actionButton && (actionButton.innerHTML = "Save");
    }
  }
}
pickButton.addEventListener("click", () => {
  window.requestAnimationFrame(randomQuestion);
});
randomQuestion();
