function getResult(){
    sessionStorage.removeItem("completedCategories");
    let score = parseInt(sessionStorage.getItem("score"))
    score = score*5

    if (score >= 80){
        $("#results-3-head").append(`${score}%!`)
        $("#results-3").modal('show')
    } else if (score <= 30){
        $("#results-1-head").append(`${score}%...`)
        $("#results-1").modal('show') 
    } else {
        $("#results-2-head").append(`${score}%`)
        $("#results-2").modal('show')
    }
    
    sessionStorage.removeItem("score")
    
}

// Srolls to the next unfinished section of the quiz 
function scrollToSection(categoryId){
    let completedCategories = sessionStorage.getItem("completedCategories")

    if (completedCategories == null){
        completedCategories = []
        sessionStorage.setItem("completedCategories", completedCategories)
    } else {
        completedCategories = completedCategories.split(",")
    }

    completedCategories.push(categoryId)
    sessionStorage.setItem("completedCategories", completedCategories)

    if (completedCategories.length == 4){
        console.log("finished")
        getResult()
    } else {
        
        let avaliableCategories = ["a", "b", "c", "d"]
        completedCategories.sort()
        let difference = avaliableCategories.filter(x => !completedCategories.includes(x));
        let nextSectionId = difference[0]

        $(`#questionsCarousel-${nextSectionId}`).get(0).scrollIntoView(false)
    }
}

// Scrolls to the next question in the quiz
function nextQuestion(questionId){
    let categoryId = questionId.split("-")[0]
    let questionNumber = parseInt(questionId.split("-")[1])
    if (questionNumber == 4){
        $(`#${questionId}`).html(`
                        <h3 class="text-center" >Section Complete!</h3>
                        <hr>
                        <div class="question-image-wrapper mx-auto">
                            <img class="mx-auto d-block" src="assets/images/complete-${categoryId}.png">
                        </div>
                        `)
        $(`#${questionId} img`).fadeIn(1000)
        setTimeout(2000)
        scrollToSection(categoryId)
    } else {
        $(`#${questionId}`).append(`
                <div class="btnNextQuestion text-center">                 
                <button type="button" class="nextQuestionButton" data-bs-target="#questionsCarousel-${categoryId}" data-bs-slide-to="${questionNumber + 1}"
                aria-current="true" aria-label="Slide 1"><img src="assets/images/ShamrockButtonBg.png" alt="Shamrock">Next</button>
                </div>`)
    }
    let remainingAnswers = $(`#${questionId}`).children(".answer")
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

    if(callBack) callBack(questionId)
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