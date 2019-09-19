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

compareAnswer(questions, getARamdomQuestion){

    let fixThis = this;
    $("li").click(function(e){
        var userAnswer = e.target;
        $(userAnswer).removeClass("text-secondary")
        
        var rightAnswer = getARamdomQuestion.rightAns;
                              
        if(userAnswer.innerHTML === rightAnswer){

            if(fixThis.level === "EASY"){
                fixThis.score += 3;
            } else if (fixThis.level === "MEDIUM") {
                fixThis.score += 5;
            } else if (fixThis.level === "DIFFICULT"){
                fixThis.score += 10;
            }

            $("#score").html(Number(fixThis.score))                                
            $(userAnswer).css({backgroundColor: "green", color: "black"})                
            fixThis.nextquest(questions)
            $("li").off("click")
         } else { 

            $(userAnswer).css({backgroundColor: "red", color: "black"})              
            $("li").off("click")
            fixThis.nextquest(questions)

            var filteredArray = $(".text-secondary").filter(function(){
                return $(this).text() === rightAnswer
            })

            filteredArray.css({backgroundColor: "green", color: "black"})
            filteredArray.removeClass("text-secondary")

        }
    })    
}