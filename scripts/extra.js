function easy(){
    var selectedCategory = $("#category :selected").val();
                   
            var questions = easyQuestions[selectedCategory]
            var generateRandomQuestionIndex = Math.floor(Math.random() * questions.length)
            var getARamdomQuestion = questions[generateRandomQuestionIndex];

            $("#play-btn").click(function(){ 

                var div = document.createElement("div")
                div.classList.add("new-div")

                div.innerHTML = `
                <p><span id="question">Q</span> ${getARamdomQuestion.question}</p>
                <ul>
                    <li>${getARamdomQuestion.options[0]}</li>
                    <li>${getARamdomQuestion.options[1]}</li>
                    <li>${getARamdomQuestion.options[2]}</li>
                    <li>${getARamdomQuestion.options[3]}</li>
                </ul>`

                $("#main").html(div);   
                $("#update-score").css("display", "block");
                
                
                $("li").click(function(e){
                    var userAnswer = e.target;
                    console.log(userAnswer.innerHTML);

                    var rightAnswer = getARamdomQuestion.rightAns;
                    console.log(rightAnswer);

                    var nextQues = $("<button></button>");
                    nextQues.addClass("next");
                    nextQues.text("Next Question");
                    $(".new-div").append(nextQues);

                    $(".next").click(function(){

                    })

                    if(userAnswer.innerHTML === rightAnswer){
                        score += 3;
                        $("#score").html(Number(score))
                        userAnswer.style.backgroundColor = "green"
                        $("li").off("click")
                    } else {
                        userAnswer.style.backgroundColor = "red"
                        $("li").off("click")
                    }
                })

            })       
}   