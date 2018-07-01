var startTimer;

var selectChoice = false;

var timer = 30;
var nextQuizTimer = 25;
var correct = 0, wrong = 0, unanswer = 0;
var quizLoc = 0;

var quizArea = $(".quizArea")
var questionArea = $(".question");
var answerArea = $(".answerArea");
var timeArea = $(".timeCounter");
var resultsArea = $(".resultsArea");
var correctText = $("#correct");
var wrongText = $("#wrong");
var unanswerText = $("#unanswer");

var start = $(".start");
var timeID = $("#timer");
var newQuestion, newAnswer;

timeID.html(timer);
quizArea.hide();

var quiz = [
			{	question : "1. When were Moogles first introduced in Final Fantasy?",
				choices : [
							"Final Fantasy III",
							"Final Fantasy IV",
							"Final Fantasy V",
							"Final Fantasy II"
						],
				correct : "Final Fantasy III",
				image : "assets/images/01.jpg"
			},
			{	question : "2. Who is the main character of Final Fantasy VII?",
				choices : [
							"Claude Strife",
							"Zack Fair",
							"Cloud Strife",
							"Squall Leonhart"
						],
				correct : "Cloud Strife",
				image : "assets/images/02.png"
			},
			{	question : "3. What is the yellow bird that the characters in the game ride on called?",
				choices : [
							"Moogle", 
							"Cactuar",
							"Chocobo",
							"Big Bird"
						],
				correct : "Chocobo",
				image : "assets/images/03.png"
			},
			{	question : "4. Who's grave can you find in Final Fantasy I?(hint: a non-final fantasy related character)",
				choices : [
							"Sephiroth", 
							"Link",
							"Vivi",
							"Zelda"
						],
				correct : "Link",
				image: "assets/images/04.jpg"
			},
			{	question : "5. Which character has a monkey tail?",
				choices : [
							"Zidane",
							"Tidus", 
							"Wakka",
							"Cait Sith"
						],
				correct : "Zidane",
				image: "assets/images/05.png"
			},
			{	question : "6. Who are the four main characters in Final Fantasy 15?",
				choices : [
							"Noctis, Prompto, Gladiolus, Ignis",
							"Cloud, Vincent, Barret, Rufus",
							"Tidus, Rikku, Wakka, Cid", 
							"Noctis, Tidus, Zidane, Cloud"
						],
				correct : "Noctis, Prompto, Gladiolus, Ignis",
				image: "assets/images/06.jpg"
			},
			{	question : "7. Which game is Final Fantasy: Advent Children based on?",
				choices : [
							"Final Fantasy X", 
							"Final Fantasy IX",
							"Final Fantasy XV",
							"Final Fantasy VII"
						],
				correct : "Final Fantasy VII",
				image: "assets/images/07.jpg"
			},
			{	question : "8. What is the ultimate attack Cloud gets?",
				choices : [
							"Cross Slash",  
							"Finishing Touch",
							"Blade Beam",
							"Omni Slash"
						],
				correct : "Omni Slash",
				image: "assets/images/08.gif"
			},
			{	question : "9. Who sang the song Eyes On Me in Final Fantasy 8?",
				choices : [
							"Utada Hikaru",  
							"Faye Wong", 
							"2Pac",
							"MayBee"
						],
				correct : "Faye Wong",
				image: "assets/images/09.jpg"
			},
			{	question : "10. Which female character died in Final Fantasy 7?",
				choices : [
							"Yuffie",  
							"Tifa", 
							"Yuna",
							"Aeris"
						],
				correct : "Aeris",
				image: "assets/images/10.gif"
			},
			];

function gameTimeCounter(){
	timeID.text(timer); //updates timer text

	//when timer is less than one and when where are still questions
	if(timer < 1 && quizLoc < quiz.length){
		timeArea.hide();
		answerArea.empty();
		selectChoice = true;

		questionArea.text("Times Up! The answer is: ");
		answerArea.text(quiz[quizLoc].correct).append(`<br><img src="${quiz[quizLoc].image}">`);

		unanswer++;
		updateQuestionAndTimer();

	}else if(timer < nextQuizTimer && selectChoice && quizLoc < quiz.length){ //generate next question after answer is revealed
		timer = 30;
		quizGenerator(quizLoc);
	}else if(timer <= nextQuizTimer && quizLoc >= quiz.length){ //shows how many questions you got right, wrong or didn't answer
		quizArea.hide();
		correctText.text(`You got ${correct} questions correct`);
		wrongText.text(`You got ${wrong} questions wrong`);
		unanswerText.text(`You got ${unanswer} questions unanswered`);

		restart();
	}

	timer--; //subtracts time by 1
}

function quizGenerator(num){
	selectChoice = false;
	answerArea.empty();
	timeID.html(timer);
	timeArea.show();

	questionArea.text(quiz[num].question);

	for(var j = 0; j < quiz[num].choices.length; j++){
		newAnswer = $("<div>").attr("class", "answers").html(quiz[num].choices[j]);
		answerArea.append(newAnswer);
	}
}

function restart(){
	$("p").text("Click the button below to restart game");
	$(".start-btn").text("Restart");
	start.show();
	timer = 30;
	correct = 0;
	wrong = 0;
	unanswer = 0;
}

function updateQuestionAndTimer(){
	quizLoc++;
	timer = 30;
}

$(".start-btn").on("click", function(){
	if(quizLoc < quiz.length){
		timer = 30;
		startTimer = setInterval(gameTimeCounter, 1000);
	}else if(quizLoc >= quiz.length){
		quizLoc = 0;
		resultsArea.hide();
	}

	start.hide();
	quizArea.show();
	quizGenerator(quizLoc);
});

$(document).on("click", ".answers", function(){
	selectChoice = true;
	timeArea.hide();
	answerArea.empty();
	answerArea.html("The answer was " + quiz[quizLoc].correct).append(`<br><img src="${quiz[quizLoc].image}">`);

	if($(this).text() == quiz[quizLoc].correct){
		questionArea.text("Correct!");
		correct++;
	}else {
		questionArea.text("Bzzzzt! Wrong Answer");
		wrong++;
	}

	updateQuestionAndTimer();
});