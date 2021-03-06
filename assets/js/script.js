function getResult(){
    sessionStorage.removeItem("completedCategories");
    let score = parseInt(sessionStorage.getItem("score"));
    score = score*5;

    if (score >= 80){
        $("#results-3-head").append(`${score}%!`);
        $("#results-3").modal('show');
    } else if (score <= 30){
        $("#results-1-head").append(`${score}%...`);
        $("#results-1").modal('show');
    } else {
        $("#results-2-head").append(`${score}%`);
        $("#results-2").modal('show');
    }
    
    sessionStorage.removeItem("score");
    
}

// Srolls to the next unfinished section of the quiz 
function scrollToSection(categoryId){
    let completedCategories = sessionStorage.getItem("completedCategories");

    if (completedCategories == null){
        completedCategories = [];
        sessionStorage.setItem("completedCategories", completedCategories);
    } else {
        completedCategories = completedCategories.split(",");
    }

    completedCategories.push(categoryId);
    sessionStorage.setItem("completedCategories", completedCategories);

    if (completedCategories.length == 4){
        console.log("finished");
        getResult();
    } else {
        
        let avaliableCategories = ["a", "b", "c", "d"];
        completedCategories.sort();
        let difference = avaliableCategories.filter(x => !completedCategories.includes(x));
        let nextSectionId = difference[0];

        $(`#questionsCarousel-${nextSectionId}`).get(0).scrollIntoView(false);
    }
}

// Scrolls to the next question in the quiz
function nextQuestion(questionId){
    let categoryId = questionId.split("-")[0];
    let questionNumber = parseInt(questionId.split("-")[1]);
    if (questionNumber == 4){
        setTimeout(function(){
        $(`#${questionId}`).html(`
                        <h3 class="text-center" >Section Complete!</h3>
                        <hr>
                        <div class="question-image-wrapper mx-auto">
                            <img class="mx-auto" src="assets/images/complete-${categoryId}.png">
                        </div>
                        `);
        $(`#${questionId} img`).fadeIn(2000);
        setTimeout(scrollToSection, 2500, categoryId);
                }, 1000);
        
    } else {
            $(`#${questionId}`).append(`
                    <div class="btnNextQuestion text-center">                 
                    <button type="button" class="nextQuestionButton rounded-pill" data-bs-target="#questionsCarousel-${categoryId}" data-bs-slide-to="${questionNumber + 1}"
                    aria-current="true" aria-label="Slide 1"><img src="assets/images/ShamrockButtonBg.png" alt="Shamrock">Next</button>
                    </div>`);
    }
    let remainingAnswers = $(`#${questionId}`).children(".answer");
    for (i = 0; i < remainingAnswers.length; i++) {
    remainingAnswers[i].removeEventListener("click", onClick);
    remainingAnswers[i].classList.add("disabled");
    }
}

// Validations the answers
function validateAnswer(element, callBack){
    let score = sessionStorage.getItem("score");

    if (score == null){
        score = 0;
        sessionStorage.setItem("score", 0);
    }

    let answer = element.getAttribute("data-answer");
    let questionId = element.parentElement.id;

    if(answer == "true"){
        score = +score + 1;
        sessionStorage.setItem("score", score);
        console.log(sessionStorage.getItem("score"));
        element.classList.add("correct");
        element.innerHTML += " <i class='fas fa-check-circle iconCorrect'></i>";
    } else {
        element.classList.add("incorrect");
        element.innerHTML += " <i class='fas fa-times iconIncorrect'></i>";
        $(`#${questionId}`).children("[data-answer=true]").addClass("correct").append(" <i class='fas fa-check-circle iconCorrect'></i>");
    }

    if(callBack) callBack(questionId);
}

// Passes the answers to the validate answer function
function onClick(event){
    let element = event.target;
    validateAnswer(element, nextQuestion);
}

function validatePlayerName(){ 
    let player = $("#name-input").val();
    if (player.length < 3){ 
        $("#enter-name-btn").prop("disabled", true); 
        $("#error").removeClass("valid").html("<i class='fas fa-exclamation'></i> 3 charaters minimum"); 
    } else if (player.length > 8){
        $("#enter-name-btn").prop('disabled', true);
        $("#error").removeClass("valid").html("<i class='fas fa-exclamation'></i> name too long"); 
    } else {
        $("#enter-name-btn").prop("disabled", false);
        $("#error").addClass("valid").html("That's Grand"); 
    }
}

function startQuiz(){

    let player = $("#name-input").val();

    sessionStorage.clear();
    sessionStorage.setItem("score", 0);
    sessionStorage.setItem("player", player);

    $("#enter-name-container").html(`<h3 class="my-5">Good Luck <br> ${player}</h3>`);
    let quizSections = document.getElementsByTagName("section");
    for (i = 0; i < quizSections.length; i++) {
    quizSections[i].style.display = "block";
    }
    $("#questionsCarousel-a").get(0).scrollIntoView(false);

}

// Adds the onclick events
$(document).ready(function() {
    let answers = document.getElementsByClassName("answer");
    for (i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", onClick);
    }
    let nameInput = document.getElementById("name-input");
    nameInput.addEventListener("keyup", validatePlayerName);
    let startButton = document.getElementById("enter-name-btn");
    startButton.addEventListener("click", startQuiz);

});
