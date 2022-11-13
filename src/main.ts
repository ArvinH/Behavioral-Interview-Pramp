import "./styles/style.css";
import "./styles/mode-switcher.css";
import { handleLoginStatus, auth } from './auth';
import { db } from './firebase';
import { doc, setDoc, collection, query, where  } from "firebase/firestore"; 
import { handleTheme } from "./theme";

// handle color theme
handleTheme();

// Random question
import questions from "./dataset/questions.json";
const len = questions.length;
let randomPick = 0;

// Dom
const pickButton = document.querySelector<HTMLDivElement>(".action button")!;
const actionButton = document.querySelector<HTMLButtonElement>(".actionBtn");
const tipsButton = document.querySelector<HTMLButtonElement>(".tipsButton");
const loginButton = document.querySelector<HTMLButtonElement>(".loginBtn");
const logoutButton = document.querySelector<HTMLButtonElement>(".logout-btn");
//@ts-ignore
const tipsDialog = document.getElementById<HTMLDialogElement>("tips");
//@ts-ignore
if (tipsDialog && typeof tipsDialog?.showModal !== "function") {
  tipsDialog.hidden = true;
}


handleLoginStatus({ loginButton, logoutButton });

tipsButton?.addEventListener("click", () => {
  //@ts-ignore
  tipsDialog && tipsDialog.showModal();
});

actionButton?.addEventListener("click", async () => {
  const textarea = document.querySelector<HTMLTextAreaElement>("textarea");
  if (actionButton.innerText === "Save") {
    const content = textarea?.value;
    const answers = JSON.parse(localStorage.getItem("bip-answers") || "[]");
    answers[randomPick] = content;
    localStorage.setItem("bip-answers", JSON.stringify(answers));
    const pickedQuestion = questions[randomPick];
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      try {
        await setDoc(doc(db, "users", uid, "questions", `${randomPick}`), {
          question: pickedQuestion.question,
          answer: JSON.stringify(answers[randomPick]),
        });
        alert("save!");
      } catch(e) {
        console.error(e);
      }
    } else {
      alert("save!");
    }
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
    // if (auth.currentUser) {
    //   const uid = auth.currentUser.uid;
    //   const questionsRef = collection(db, "users", uid, "questions");
    //   const q = query(questionsRef, where("questions", "==", true));

    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // }
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
