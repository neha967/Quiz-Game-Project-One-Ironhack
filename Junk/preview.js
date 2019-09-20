var score = 0;

$(".level").click(function(){
    
    $(this).addClass("selected")        
          
    if($(this).text() === "EASY"){    
        easy();
    } else if($(this).text() === "MEDIUM"){
        medium();
    } else if($(this).text() === "DIFFICULT"){
        difficult();
    }
})

$("#category").change(function(e){
    if($(".selected")){
        var level = $(".selected").text()
        if(level === "EASY"){
            easy();
        } else if(level === "MEDIUM"){
            medium();
        } else if(level === "DIFFICULT"){
            difficult();
        }
    }
})

function easy(){       
    
var selectedCategory = $("#category :selected").val();
  
var questions = easyQuestions[selectedCategory]
  
  $("#play-btn").click( ()=> genQues(questions))
    
}

function medium () {
var selectedCategory = $("#category :selected").val();
               
var questions = mediumQuestions[selectedCategory]

$("#play-btn").click( ()=> genQues(questions))
}

function difficult () {
var selectedCategory = $("#category :selected").val();
               
var questions = difficultQuestions[selectedCategory]

$("#play-btn").click( ()=> genQues(questions))
}

function nextquest(questions){
var nextQues = $("<button></button>");
    nextQues.addClass("next");
    nextQues.text("Next Question");
    $(".new-div").append(nextQues);

    $(".next").click(function(){
        genQues(questions);
    })
}

function genQues (questions) {
var generateRandomQuestionIndex = Math.floor(Math.random() * questions.length)
var getARamdomQuestion = questions[generateRandomQuestionIndex];


    var div = document.createElement("div")
    div.classList.add("new-div")

    div.innerHTML = `
    <p><span id="question">Q</span> ${getARamdomQuestion.question}</p>
    <ul>
        <li class="text-secondary">${getARamdomQuestion.options[0]}</li>
        <li class="text-secondary">${getARamdomQuestion.options[1]}</li>
        <li class="text-secondary">${getARamdomQuestion.options[2]}</li>
        <li class="text-secondary">${getARamdomQuestion.options[3]}</li>
    </ul>`

    $("#main").html(div);   
    $("#update-score").css("display", "block");
    
        
        $("li").click(function(e){
            var userAnswer = e.target;
            $("userAnswer").css("color", "black");
            console.log(userAnswer.innerHTML);

            var rightAnswer = getARamdomQuestion.rightAns;
            console.log(rightAnswer);

            var level = $(".selected").text()
            debugger
            if(userAnswer.innerHTML === rightAnswer){

                if(level === "EASY"){
                    score += 3;
                } else if (level === "MEDIUM") {
                    score += 5;
                } else if (level === "DIFFICULT"){
                    score += 10;
                }

                $("#score").html(Number(score))
                userAnswer.style.backgroundColor = "green"
                nextquest(questions)
                $("li").off("click")
             } else {
                userAnswer.style.backgroundColor = "red"
                $("li").off("click")
                nextquest(questions)
            }
        })    
}

//fix score after refactor