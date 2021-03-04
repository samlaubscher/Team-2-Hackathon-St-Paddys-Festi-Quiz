function nextQuestion(number){
    let questionNumber = parseInt(number)
    let currentQuestionId = `q${number}`
    let nextQuestionId = `q${questionNumber + 1}`
    if (questionNumber == 4){
        window.location.replace("http://www.google.co.uk")
    } else {
        $(`#${currentQuestionId}`).append(`            
                <button type="button" data-bs-target="#questionsCarousel" data-bs-slide-to="${questionNumber + 1}"
                aria-current="true" aria-label="Slide 1">Next</button>`)
    }
}

