var SkyrimTrivia = function () {
    var questions = [
        {
            question: "What were the Falmer known as in ancient times?",
            answer1: "Cave Dwellers",
            answer2: "Skyrim Elves",
            answer3: "People of Mereth",
            correct: "Snow Elves",
        },
        {
            question: "Who was the first human to arrive in Skyrim?",
            answer1: "Jeek of the River",
            answer2: "Kyne",
            answer3: "Yngol",
            correct: "Ysgramor",
        },
        {
            question: "Who is someone you can encounter on the roads of Skyrim, as well as in other Elder Scrolls games?",
            answer1: "Plautis and Salonia Carvain",
            answer2: "Balbus",
            answer3: "Sond and Bottar",
            correct: "M'aiq the Liar",
        },
        {
            question: "Who is the leader of the Stormcloak Rebellion?",
            answer1: "Hoag Stormcloak",
            answer2: "High King Torygg",
            answer3: "Galmar Stone-Fist",
            correct: "Ulfric Stormcloak",
        },
        {
            question: "When was the last time that the Greybeards spoke?",
            answer1: "When their founder, Jurgen Windcaller, was defeated at Red Mountain",
            answer2: "When they defeated the Dragon God of Time, Akatosh",
            answer3: "When they settled their seat of power, High Hrothgar",
            correct: "When they announced the greatness of Tiber Septim I",
        },
        {
            question: "Why does Anise, the sweet old Nord lady, attack you?",
            answer1: "Because you failed her quest, in which you send her purple mountain flowers for her birthday",
            answer2: "Because you killed her grandson, Hern",
            answer3: "Because you told her her sweet rolls weren't good",
            correct: "Because you stole from her or entered her cellar",
        },
        {
            question: "If you follow the road to Riverwood after escaping Helgen, what are the three Standing Stones you encounter?",
            answer1: "The Lord, The Lady, and The Steed",
            answer2: "The Shadow, The Warrior, and The Apprentice",
            answer3: "The Atronach, The Thief, and The Ritual",
            correct: "The Thief, The Warrior, and The Mage",
        },
        {
            question: "What are guards most famous for saying?",
            answer1: "My cousin's out fighting dragons, and what do I get? Guard duty.",
            answer2: "No lollygaggin'.",
            answer3: "I'd be a lot warmer and a lot happier with a bellyful of mead...",
            correct: "I used to be an adventurer like you, then I took an arrow to the knee.",
        },
    ];

    var time = 30;
    const questionsLimit = 8;
    var numberOfQuestionsAsked = 0;
    var timerId;
    var clockRunning = false;
    var currentQuestion;
    var askedQuestions = [];
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var timerText = $("#timer");

    return {

        startGame: function () {
            time = 30;
            numberOfQuestionsAsked = 0;
            clockRunning = false;
            currentQuestion = { blankObject: "" };
            askedQuestions = [];

            this.pickRandomQuestion();
        },

        // Picks a random question from the questions list. If the new question has already been asked,
        // it will pick a new question.
        pickRandomQuestion: function () {
            if (currentQuestion !== undefined) {
                askedQuestions.push(currentQuestion);
            }
            currentQuestion = questions[Math.floor(Math.random() * questions.length)];
            if (numberOfQuestionsAsked < questionsLimit) {
                while (askedQuestions.indexOf(currentQuestion) > -1) {
                    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
                }
                numberOfQuestionsAsked++;
                console.log(numberOfQuestionsAsked);
            } else {
                console.log("Game Done");
            }
        },

        // Start the timer of the game.
        startTimer: function () {
            if (!clockRunning) {
                timerId = setInterval(this.count, 1000);
                clockRunning = true;
            }
        },

        // Stop the timer of the game.
        stopTimer: function () {
            clearInterval(timerId);
            clockRunning = false;
            timerText.text("Time Remaining: " + time);
        },

        // Increment the time.
        count: function () {
            time--;
            timerText.text("Time Remaining: " + time);
        },

        incrementCorrectAnswers: function () {
            correctAnswers++;
        },

        incrementIncorrectAnswers: function () {
            incorrectAnswers++;
        },

        // Return the currentQuestion.
        getCurrentQuestion: function () {
            return currentQuestion;
        },

        // Return the current time.
        getCurrentTime: function () {
            return time;
        }

    }
};

$(document).ready(function () {
    var instructionsText = $("#instruction-text");
    var gameDiv = $("#game")
    var timerText = $("#timer");

    var buttonClasses = "btn btn-secondary btn-block btn-opacity mt-3";

    var game = new SkyrimTrivia();

    startScreen();

    // When the screen is loaded, print the instructions and post the Start button.
    function startScreen() {
        instructionsText.html("You will have 30 seconds to complete 8 questions<br><br>Press Start to begin the Trivia<br><br>");

        var startButton = $("<button>");
        startButton.addClass(buttonClasses);
        startButton.attr("id", "start-button");
        startButton.html("Start");
        startButton.click(function () {
            beginGame();
        });

        gameDiv.append(startButton);
    }

    // When the Start button is clicked (or the game is reset), start the game and post the first question.
    function beginGame() {
        instructionsText.empty();
        $("#start-button").remove();
        game.startGame();
        postQuestion();
    }

    // To post a question, get the current question and create a button for each of the answers.
    // Start the timer for the question.
    function postQuestion() {
        var theQuestion = game.getCurrentQuestion(); // Get the current question.
        instructionsText.html(theQuestion.question); // Set the instruction text to what the question is.

        // For each property in theQuestion object (excluding the question itself) add it to an array.
        var answers = [];
        for (property in theQuestion) {
            if (property !== "question") {
                answers.push(theQuestion[property]);
            }
        }

        // In random order, create buttons for the answers and add them to the gameDiv.
        for (var i = answers.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * answers.length);
            var questionButton = $("<button>");
            questionButton.addClass(buttonClasses);
            questionButton.html(answers[randomIndex]);
            questionButton.click(function () {
                checkAnswer(this);
            });
            gameDiv.append(questionButton);
            answers.splice(randomIndex, 1);
        }

        // Post the time remaining and start the timer.
        timerText.text("Time Remaining: " + game.getCurrentTime());
        game.startTimer();
    }

    // Check the answer that was chosen.
    function checkAnswer(theAnswerChosen) {
        game.stopTimer(); // Stop the timer.
        var theQuestion = game.getCurrentQuestion(); // Get the current question.
        $("button").remove(); // Remove all buttons from the html.

        // If the chosen answer was the correct one, tell the user it was correct.
        if (theAnswerChosen.innerHTML === theQuestion.correct) {
            instructionsText.html("That is correct!<br><br>" + theQuestion.correct);
            game.incrementCorrectAnswers();
        } else { // else tell them it was incorrect.
            instructionsText.html("That is incorrect! The correct answer was:<br><br>" + theQuestion.correct);
            game.incrementIncorrectAnswers();
        }

        // Wait 5 seconds before posting the next question.
        var anwerTimeout = setTimeout(function () {
            game.pickRandomQuestion();
            postQuestion();
        }, 5000);
    }
})