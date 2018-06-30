var startTimer;

var timer = 30;

var isGame = false;

var quizOne = $(".typeOne");
var start = $(".start");
var timeID = $("#timer");

quizOne.hide();

function countDownTimer(){
	timer--;

	timeID.text(timer);
}

$(".start-btn").on("click", function(){
	quizOne.show();
	start.hide();

	startTimer = setInterval(countDownTimer, 1000);
});
