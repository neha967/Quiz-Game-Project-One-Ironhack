class Game{
    constructor() {
        this.score = 0;
        this.level;
        this.easyTotal = 30;
        this.mediumTotal = 50;
        this.difficultTotal = 100;
        this.trackQuestionsDisplayed = []; 
        this.levels();
        this.categories();
        this.backgroundMusic();
    }

    backgroundMusic(){
        $(window).click(function(){
            let themeSong = $("#myAudio")[0];
            themeSong.play();
            $(window).off("click")
        })
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
        let fixThis = this;    
        $("#play-btn").click( ()=> {fixThis.genQues(questions)})
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

        if(this.trackQuestionsDisplayed.includes(getARamdomQuestion.id) && this.trackQuestionsDisplayed.length < 10){
            this.genQues(questions)
            return this.trackQuestionsDisplayed            
        }       

        $("#main").html(div);   
        $("#update-score").css("visibility", "visible");
        this.compareAnswer(questions, getARamdomQuestion);
    }

    gameFinished(){
        if(this.trackQuestionsDisplayed.length === 10){

            $("#update-score").hide();

                var div = document.createElement("div")
                div.classList.add("game-over")

                div.innerHTML = `
                    <h1>GAME FINISHED!!!</h1>
                    <h3>You attempted all 10 questions</h3>
                    <p>You scored ${this.score}</p>
                    <p id="message">Congratulations!!!</p>
                    <img src="happy.gif" alt="happy" style="display:none;width:100px;height:100px" id="happy">
                    <img src="sad.gif" alt="sad" style="display:none;width:100px;height:100px" id="sad">
                `
                $("#main").html(div);  
                
                this.displayGif();
          }
    }

    displayGif(){
        if(this.level === "EASY"){
            if(this.score > 0.8 * this.easyTotal) {
                $("#happy").css({display: "block", margin: "0 auto"})
            } else {
                $("#sad").css({display: "block", margin: "0 auto"})
                $("#message").text("Try better next time!!")
            }
        }   

        if(this.level === "MEDIUM"){
            if(this.score > 0.7 * this.mediumTotal){
                $("#happy").css({display: "block", margin: "0 auto"})
            } else {
                $("#sad").css({display: "block", margin: "0 auto"})
                $("#message").text("Try better next time!!")
            }
        }

        if(this.level === "DIFFICULT"){
            if(this.score > 0.6 * this.difficultTotal) {
                $("#happy").css({display: "block", margin: "0 auto"})                
            } else {
                $("#sad").css({display: "block", margin: "0 auto"})
                $("#message").text("Try better next time!!")            
            }
        }
    }

    compareAnswer(questions, getARamdomQuestion){

        let fixThis = this;
        $("li").click(function(e){
            var userAnswer = e.target;
            $(userAnswer).removeClass("text-secondary")
            fixThis.trackQuestionsDisplayed.push(getARamdomQuestion.id);
            
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
        $("#correct").trigger("play");       
        fixThis.nextquest(questions)
        $("li").off("click")
    }

    incorrectAns(userAnswer, questions, rightAnswer){
        let fixThis = this;

        $(userAnswer).css({backgroundColor: "red", color: "black"})  
        $("#incorrect").trigger("play");            
        $("li").off("click")
        fixThis.nextquest(questions)

        var filteredArray = $(".text-secondary").filter(function(){
            return $(this).text() === rightAnswer
        })

        setTimeout(function(){
            filteredArray.css({backgroundColor: "green", color: "black"})
            filteredArray.removeClass("text-secondary")
        }, 1000)
    }

    nextquest(questions){
        var nextQues = $("<button></button>");
        nextQues.addClass("next");
        nextQues.text("Next Question");
        $(".new-div").append(nextQues);

        let fixThis = this;

        $(".next").click(function(){
            fixThis.genQues(questions);
            fixThis.gameFinished();
        })
    }
}

let game = new Game()