class Game{
    constructor() {
        this.score = 0;
        this.level 
        this.levels();
        this.categories();
    }

    levels(){
        let fixThis = this
        $(".level").click(function(){
            $(this).removeClass("text-secondary")
            $(this).addClass("selected")        
                  
            if($(this).text() === "EASY"){ 
                fixThis.easy();
            } else if($(this).text() === "MEDIUM"){
                fixThis.medium();
            } else if($(this).text() === "DIFFICULT"){
                fixThis.difficult();
            }
        })
    }

    categories(){
        let fixThis = this
        $("#category").change(function(e){
            if($(".selected")){
                var level = $(".selected").text()
                if(level === "EASY"){
                    fixThis.easy();
                } else if(level === "MEDIUM"){
                    fixThis.medium();
                } else if(level === "DIFFICULT"){
                    fixThis.difficult();
                }
            }
        })
    }

    easy(){
        var selectedCategory = $("#category :selected").val();      
        var questions = easyQuestions[selectedCategory]  //array of questions with objects for easy level with the selected category
        let fixThis = this;    
        $("#play-btn").click( ()=> fixThis.genQues(questions))
    }

    medium(){
        var selectedCategory = $("#category :selected").val();                   
        var questions = mediumQuestions[selectedCategory] //array of questions with objects for medium level with the selected category
        let fixThis = this;
        $("#play-btn").click( ()=> fixThis.genQues(questions))
    }

    difficult(){
        var selectedCategory = $("#category :selected").val();                   
        var questions = difficultQuestions[selectedCategory] //array of questions with objects for difficult level with the selected category
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
        
        let fixThis = this;

            $("li").click(function(e){                
                var userAnswer = e.target;
                $(userAnswer).removeClass("text-secondary");
                $(userAnswer).css("color", "black");
               
                console.log(userAnswer.innerHTML);

                var rightAnswer = getARamdomQuestion.rightAns;
                console.log(rightAnswer);

                var level = $(".selected").text()
               
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
                    fixThis.nextquest(questions)
                    $("li").off("click")
                 } else {
                    userAnswer.style.backgroundColor = "red"
                    $("li").off("click")
                    fixThis.nextquest(questions)
                }
            })    
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


//fix score after refactor


let game = new Game()