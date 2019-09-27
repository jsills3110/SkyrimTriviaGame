var SkyrimTrivia = function () {
    var questions = [
        {
            question: "What were the Falmer known as in ancient times?",
            answer1: "Cave Dwellers",
            answer2: "Skyrim Elves",
            answer3: "People of Mereth",
            correct: "Snow Elves",
            gif: "assets/images/falmer.gif",
        },
        {
            question: "Who was the first human to arrive in Skyrim?",
            answer1: "Jeek of the River",
            answer2: "Kyne",
            answer3: "Yngol",
            correct: "Ysgramor",
            gif: "assets/images/ysgramor.gif",
        },
        {
            question: "Who is someone you can encounter on the roads of Skyrim, as well as in other Elder Scrolls games?",
            answer1: "Plautis and Salonia Carvain",
            answer2: "Balbus",
            answer3: "Sond and Bottar",
            correct: "M'aiq the Liar",
            gif: "assets/images/maiqtheliar.gif",
        },
        {
            question: "Who is the leader of the Stormcloak Rebellion?",
            answer1: "Hoag Stormcloak",
            answer2: "High King Torygg",
            answer3: "Galmar Stone-Fist",
            correct: "Ulfric Stormcloak",
            gif: "assets/images/ulfric.gif",
        },
        {
            question: "When was the last time that the Greybeards spoke?",
            answer1: "When their founder, Jurgen Windcaller, was defeated at Red Mountain",
            answer2: "When they defeated the Dragon God of Time, Akatosh",
            answer3: "When they settled their seat of power, High Hrothgar",
            correct: "When they announced the greatness of Tiber Septim I",
            gif: "assets/images/greybeards.gif",
        },
        {
            question: "Why does Anise, the sweet old Nord lady, attack you?",
            answer1: "Because you failed her quest, in which you send her purple mountain flowers for her birthday",
            answer2: "Because you killed her grandson, Hern",
            answer3: "Because you told her her sweet rolls weren't good",
            correct: "Because you stole from her or entered her cellar",
            gif: "assets/images/sweetroll.gif",
        },
        {
            question: "If you follow the road to Riverwood after escaping Helgen, what are the three Standing Stones you encounter?",
            answer1: "The Lord, The Lady, and The Steed",
            answer2: "The Shadow, The Warrior, and The Apprentice",
            answer3: "The Atronach, The Thief, and The Ritual",
            correct: "The Thief, The Warrior, and The Mage",
            gif: "assets/images/riverwood.gif",
        },
        {
            question: "What are guards most famous for saying?",
            answer1: "My cousin's out fighting dragons, and what do I get? Guard duty.",
            answer2: "No lollygaggin'.",
            answer3: "I'd be a lot warmer and a lot happier with a bellyful of mead...",
            correct: "I used to be an adventurer like you, then I took an arrow to the knee.",
            gif: "assets/images/guard.gif",
        },
        {
            question: "What is the name of the horse that once belonged to Lucien Lachance?",
            answer1: "Shadowmoon",
            answer2: "Black Beauty",
            answer3: "Dark Night",
            correct: "Shadowmere",
            gif: "assets/images/shadowmere.gif",
        },
        {
            question: "Who is your Housecarl when you become Thane of Whiterun?",
            answer1: "Argis the Bulwark",
            answer2: "Iona",
            answer3: "Valdimar",
            correct: "Lydia",
            gif: "assets/images/lydia.gif",
        },
        {
            question: "What is Calcelmo's favorite subject of study?",
            answer1: "Giant Spiders",
            answer2: "The Falmer",
            answer3: "Nirnroot",
            correct: "The Dwemer",
            gif: "assets/images/dwemer.gif",
        },
        {
            question: "In what city can the Thieves Guild be found?",
            answer1: "Dawnstar",
            answer2: "Markarth",
            answer3: "Solitude",
            correct: "Riften",
            gif: "assets/images/thievesguild.gif",
        },
        {
            question: "Who ascended the throne after High King Torygg died?",
            answer1: "Balgruuf the Greater",
            answer2: "Bolgeir Bearclaw",
            answer3: "Falk Firebeard",
            correct: "Elisif the Fair",
            gif: "assets/images/elisif.gif",
        },
    ];

    var numberOfQuestionsAsked = 0;
    var currentQuestion;
    var askedQuestions = [];
    var correctAnswers = 0;
    var incorrectAnswers = 0;

    return {

        questionsLimit: 8,

        startGame: function () {
            numberOfQuestionsAsked = 0;
            currentQuestion = { blankObject: "" };
            askedQuestions = [];
            correctAnswers = 0;
            incorrectAnswers = 0;

            this.pickRandomQuestion();
        },

        // Picks a random question from the questions list. If the new question has already been asked,
        // it will pick a new question.
        pickRandomQuestion: function () {
            if (currentQuestion !== undefined) {
                askedQuestions.push(currentQuestion);
            }
            if (numberOfQuestionsAsked < this.questionsLimit) {
                while (askedQuestions.indexOf(currentQuestion) > -1) {
                    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
                }
                numberOfQuestionsAsked++;
            }
        },

        // Check if the number of questions asked is equal to or exceeds the question limit.
        checkEndCondition: function () {
            if (numberOfQuestionsAsked >= this.questionsLimit) {
                return true;
            } else {
                return false;
            }
        },

        // Increment the correct answers.
        incrementCorrectAnswers: function () {
            correctAnswers++;
        },

        // Increment the incorrect answers.
        incrementIncorrectAnswers: function () {
            incorrectAnswers++;
        },

        // Return the currentQuestion.
        getCurrentQuestion: function () {
            return currentQuestion;
        },

        // Return the number of correct answers.
        getCorrectAnswers: function () {
            return correctAnswers;
        },

        // Return the number of incorrect answers.
        getIncorrectAnswers: function () {
            return incorrectAnswers;
        },
    }
};

$(document).ready(function () {
    var instructionsText = $("#instruction-text");
    var gameDiv = $("#game")
    var timerText = $("#timer");
    var songs = ["assets/music/dragonbornsong.mp3", "assets/music/thejerallmountains.mp3", "assets/music/thebanneredmare.mp3"];
    var currentSong;
    var myAudio;

    const totalTime = 45;
    var currentTime = 0;
    var timerId;
    var clockRunning = false;

    var buttonClasses = "btn btn-secondary btn-block btn-opacity mt-3";
    var buttonStyle = "font-size: 1.5rem;";

    var game = new SkyrimTrivia();

    startScreen();

    // When the screen is loaded, print the instructions and post the Start button.
    function startScreen() {
        currentTime = totalTime;
        $("button").remove(); // Remove all buttons from the html.
        $(".gif").remove();
        instructionsText.html("You will have " + currentTime + " seconds to complete " + game.questionsLimit +
            " random questions.<br><br>Press Start to begin the Trivia<br><br>");

        var startButton = $("<button>");
        startButton.addClass(buttonClasses);
        startButton.attr("id", "start-button");
        startButton.attr("style", buttonStyle);
        startButton.html("Start");
        startButton.click(function () {
            beginGame();
        });

        currentSong = songs[Math.floor(Math.random() * songs.length)];
        myAudio = new Audio(currentSong);

        gameDiv.append(startButton);
    }

    // When the Start button is clicked (or the game is reset), start the game and post the first question.
    function beginGame() {
        instructionsText.empty();
        $("#start-button").remove();
        myAudio.play();
        game.startGame();
        postQuestion();
    }

    // Start the timer of the game.
    function startTimer() {
        if (!clockRunning) {
            timerId = setInterval(count, 1000);
            clockRunning = true;
        }
    }

    // Stop the timer of the game.
    function stopTimer() {
        clearInterval(timerId);
        clockRunning = false;
        if (currentTime < 0) {
            timerText.text("Time Remaining: 0");
        } else {
            timerText.text("Time Remaining: " + currentTime);
        }
    }

    // Increment the time.
    function count() {
        currentTime--;
        timerText.text("Time Remaining: " + currentTime);
        if (currentTime <= 0) {
            gameWon = false;
            endGame();
        }
    }

    // To post a question, get the current question and create a button for each of the answers.
    // Start the timer for the question.
    function postQuestion() {
        $(".gif").remove();
        var theQuestion = game.getCurrentQuestion(); // Get the current question.
        instructionsText.html(theQuestion.question + "<br><br>"); // Set the instruction text to what the question is.

        // For each property in theQuestion object (excluding the question itself) add it to an array.
        var answers = [];
        for (property in theQuestion) {
            if (property !== "question" && property !== "gif") {
                answers.push(theQuestion[property]);
            }
        }

        // In random order, create buttons for the answers and add them to the gameDiv.
        for (var i = answers.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * answers.length);
            var questionButton = $("<button>");
            questionButton.addClass(buttonClasses);
            questionButton.attr("style", buttonStyle);
            questionButton.html(answers[randomIndex]);
            questionButton.click(function () {
                checkAnswer(this);
            });
            gameDiv.append(questionButton);
            answers.splice(randomIndex, 1);
        }

        // Post the time remaining and start the timer.
        timerText.text("Time Remaining: " + currentTime);
        startTimer();
    }

    // Check the answer that was chosen.
    function checkAnswer(theAnswerChosen) {
        stopTimer(); // Stop the timer.
        var theQuestion = game.getCurrentQuestion(); // Get the current question.
        $("button").remove(); // Remove all buttons from the html.

        // If the chosen answer was the correct one, tell the user it was correct.
        if (theAnswerChosen.innerHTML === theQuestion.correct) {
            instructionsText.html("That is correct!<br><br>" + theQuestion.correct + "<br><br>");
            game.incrementCorrectAnswers();
        } else { // else tell them it was incorrect.
            instructionsText.html("That is incorrect! The correct answer was:<br><br>" + theQuestion.correct + "<br><br>");
            game.incrementIncorrectAnswers();
        }

        var image = $("<img>");
        image.attr("src", theQuestion.gif);
        image.addClass("gif");
        gameDiv.append(image);

        // Wait 5 seconds before posting the next question.
        var anwerTimeout = setTimeout(function () {
           
            if (game.checkEndCondition()) {
                endGame();
            } else {
                game.pickRandomQuestion();
                postQuestion();
            }
        }, 5000);
    }

    // Stop the timer, show the results, and add a retry button to the screen.
    function endGame() {
        stopTimer();
        timerText.empty(); // Remove the timer text.
        $("button").remove(); // Remove all buttons from the html.
        $(".gif").remove();

        // Calculate the number of unanswered questions.
        var unanswered = game.questionsLimit - (game.getCorrectAnswers() + game.getIncorrectAnswers());

        // Post the number of correct, incorrect, and unanswered questions. 
        instructionsText.html("Game Over!<br><br>Correct Answers: " + game.getCorrectAnswers() +
            "<br>Incorrect Answers: " + game.getIncorrectAnswers() + "<br>Unanswered: " + unanswered +
            "<br><br>Click below to try again!<br><br>");

        // Create a button for resetting the game and append it to the gameDiv.
        var retryButton = $("<button>");
        retryButton.addClass(buttonClasses);
        retryButton.attr("id", "retry-button");
        retryButton.attr("style", buttonStyle);
        retryButton.html("Retry");
        retryButton.click(function () {
            myAudio.pause();
            startScreen();
        });
        gameDiv.append(retryButton);
    }
})