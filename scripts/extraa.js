if(userAnswer.innerHTML === rightAnswer){
    score += 3;
    $("#score").html(Number(score))
    userAnswer.style.backgroundColor = "green"
    $("li").off("click")
    nextquest(questions)
} else {
    userAnswer.style.backgroundColor = "red"
    $("li").off("click")
    nextquest(questions)
}