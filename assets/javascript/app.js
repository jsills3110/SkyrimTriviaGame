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

    const timePerGame = 30000;

    var time = 0;
    // var timerId = setInterval(count, 0);
    var clockRunning = false;
    var currentQuestion;
    var askedQuestions = [];

    // function count() {
    //     time++;
    // }

    return {

        startGame: function () {
            time = 0;
            // clearInterval(timerId);
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
            while (askedQuestions.indexOf(currentQuestion) > -1) {
                currentQuestion = questions[Math.floor(Math.random() * questions.length)];
            }
        },

        // Start the timer of the game.
        startTimer: function () {
            if (!clockRunning) {
                timerId = setInterval(count, 1000);
                clockRunning = true;
            }
        },

        // Stop the timer of the game.
        stopTimer: function () {
            clearInterval(timerId);
            clockRunning = false;
        },

        // Return the currentQuestion.
        getCurrentQuestion: function () {
            return currentQuestion;
        },

    }
};

$(document).ready(function () {
    var timerText = $("#timer");
    var questionText = $("#question");
    var instructionsText = $("#instruction-text");
    var instructionsDiv = $("#instructions");
    var gameDiv = $("#game")

    var buttonClasses = "btn btn-secondary btn-block btn-opacity mt-3";

    var game = new SkyrimTrivia();

    startScreen();
    console.log("Game started");

    function startScreen() {
        instructionsText.html("You will have 30 seconds to complete 8 questions<br><br>Press Start to begin the Trivia<br><br>");

        var startButton = $("<button>");
        startButton.addClass(buttonClasses);
        startButton.attr("id", "start-button");
        startButton.html("Start");
        startButton.click(function() {
            beginGame();
        });

        instructionsDiv.append(startButton);
    }

    function beginGame() {
        console.log("Start button clicked.");
        instructionsText.empty();
        $("#start-button").remove();
        game.startGame();
        postQuestion();
    }

    function postQuestion() {
        var theQuestion = game.getCurrentQuestion();
        questionText.html(theQuestion.question);
        for (property in theQuestion) {
            if (property !== "question") {
                var questionButton = $("<button>");
                questionButton.addClass(buttonClasses);
                questionButton.html(theQuestion[property]);
                gameDiv.append(questionButton);
            }
        }
    }
})