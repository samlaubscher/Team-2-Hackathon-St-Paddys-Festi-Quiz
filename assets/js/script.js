/*document.getElementById("enter-name-btn").addEventListener("click", hideNamePanel);

function hideNamePanel() {
    player = document.getElementById("name-input").value
    sessionStorage.setItem("playername", player);
    document.getElementById("name").innerHTML = sessionStorage.getItem("playername");
    document.getElementById("main-landing-container").classList.toggle("hidden");
    document.getElementById("enter-name-container").classList.toggle("hidden");
}*/

/* questions scripts */ 

// Moves to the next carousel slide and disables the buttons
function nextQuestion(number){
    let questionNumber = parseInt(number)
    let currentQuestionId = `q${number}`
    let nextQuestionId = `q${questionNumber + 1}`
    if (questionNumber == 4){
        // Code to move to next carousel location
    } else {
        $(`#${currentQuestionId}`).append(`            
                <button type="button" data-bs-target="#questionsCarousel" data-bs-slide-to="${questionNumber + 1}"
                aria-current="true" aria-label="Slide 1">Next</button>`)
    }
    let remainingAnswers = $(`#${currentQuestionId}`).children(".answer")
    for (i = 0; i < remainingAnswers.length; i++) {
    remainingAnswers[i].removeEventListener("click", onClick);
    remainingAnswers[i].classList.add("disabled");
    }

}

// Validations the answers
function validateAnswer(element, callBack){
    let score = sessionStorage.getItem("score")

    if (score == null){
        score = 0
        sessionStorage.setItem("score", 0)
    }

    let answer = element.getAttribute("data-answer")
    let questionId = element.parentElement.id
    let questionNumber = questionId.slice(1)

    if(answer == "true"){
        score = +score + 1
        sessionStorage.setItem("score", score)
        console.log(sessionStorage.getItem("score"))
        element.classList.add("correct")
        element.innerHTML += " <i class='fas fa-check-circle'></i>"
    } else {
        element.classList.add("incorrect")
        element.innerHTML += " <i class='fas fa-times-circle'></i>"
        $(`#${questionId}`).children("[data-answer=true]").addClass("correct").append(" <i class='fas fa-check-circle'></i>")
    };

    if(callBack) callBack(questionNumber)
}

// Passes the answers to the validate answer function
function onClick(event){
    let element = event.target
    validateAnswer(element, nextQuestion)
}

// Adds the onclick events
$(document).ready(function() {
    let answers = document.getElementsByClassName("answer")
    for (i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", onClick)
    }
});
