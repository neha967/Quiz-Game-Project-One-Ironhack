class Game{
    constructor() {
        this.score = 0;
        this.level 
        this.levels();
        this.categories();
    }

    levels(){
        $(".level").click(function(){
            if($(this).hasClass("selected")) {
                $(this).removeClass("selected")        
            } else {
                $(".level").removeClass("selected") 
                $(this).addClass("selected") 
            }  
        })
    }

    categories(){
        let fixThis = this
        $("#category").change(function(e){
            
            if($(".selected")){
                fixThis.level = $(".selected").text()
                if(fixThis.level === "EASY"){
                    fixThis.easy();
                } else if(fixThis.level === "MEDIUM"){
                    fixThis.medium();
                } else if(fixThis.level === "DIFFICULT"){
                    fixThis.difficult();
                }
            }
        })
    }

    easy(){
        var selectedCategory = $("#category :selected").val();      
        var questions = easyQuestions[selectedCategory]
        debugger
        let fixThis = this;    
        $("#play-btn").click( ()=> {debugger; fixThis.genQues(questions)})
    }

    medium(){
        var selectedCategory = $("#category :selected").val();                   
        var questions = mediumQuestions[selectedCategory]
        let fixThis = this;
        $("#play-btn").click( ()=> fixThis.genQues(questions))
    }

    difficult(){
        var selectedCategory = $("#category :selected").val();                   
        var questions = difficultQuestions[selectedCategory]
        let fixThis = this;
        $("#play-btn").click( ()=> fixThis.genQues(questions))
    }

    genQues(questions){
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
        this.compareAnswer(questions, getARamdomQuestion);
    }

    compareAnswer(questions, getARamdomQuestion){

        let fixThis = this;
        $("li").click(function(e){
            var userAnswer = e.target;
            $(userAnswer).removeClass("text-secondary")
            
            var rightAnswer = getARamdomQuestion.rightAns;
                                  
            if(userAnswer.innerHTML === rightAnswer){
                fixThis.correctAns(userAnswer, questions);                
             } else { 
                fixThis.incorrectAns(userAnswer, questions, rightAnswer);
            }
        })    
    }

    correctAns(userAnswer, questions){
        let fixThis = this;

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
    }

    incorrectAns(userAnswer, questions, rightAnswer){
        let fixThis = this;

        $(userAnswer).css({backgroundColor: "red", color: "black"})              
        $("li").off("click")
        fixThis.nextquest(questions)

        var filteredArray = $(".text-secondary").filter(function(){
            return $(this).text() === rightAnswer
        })

        setTimeout(function(){
            filteredArray.css({backgroundColor: "green", color: "black"})
            filteredArray.removeClass("text-secondary")
        }, 300)
    }

    nextquest(questions){
        var nextQues = $("<button></button>");
        nextQues.addClass("next");
        nextQues.text("Next Question");
        $(".new-div").append(nextQues);

        let fixThis = this;

        $(".next").click(function(){
            fixThis.genQues(questions);
        })
    }
}

let game = new Game()