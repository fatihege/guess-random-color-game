function $(elem) {
	return document.querySelector(elem);
}

function $all(elems) {
	return document.querySelectorAll(elems);
}

function randRgb() {
	return Math.floor(Math.random() * 255).toString();
}

var options = $all(".option");
var alertBox = $("#alert-box");
var curtain = $("#curtain");
var scoreBox = $("#score");

window.score = 0;
function mainGame() {
	scoreBox.innerText = score;
	window.trueRgb = "rgb(" + randRgb() + "," + randRgb() + "," + randRgb() + ")";
	window.trueOption = Math.floor(Math.random() * 6);
	var textRgb = $("#text-rgb");

	textRgb.innerHTML = window.trueRgb;

	options[trueOption].style.background = window.trueRgb;
	options[trueOption].classList += " true";

	options.forEach(function (option) {
		if (option.classList.contains("true")) {
			option.style.background = trueRgb;
		} else {
			option.style.background =
				"rgb(" + randRgb() + "," + randRgb() + "," + randRgb() + ")";
		}
	});
}

function giveAlert() {
	options.forEach(function (option) {
		option.addEventListener("click", function () {
			curtain.style.zIndex = 5;
			curtain.style.opacity = 1;
			alertBox.style.transform = "scale(1)";
			if (option.classList.contains("true")) {
				alertBox.innerHTML = "TRUE";
				alertBox.style.background = "#10dd3c";
				alertBox.style.boxShadow = "0 0 100px #10dd3c";
				score++;
				scoreBox.innerText = score;

				setTimeout(function () {
					alertBox.style.transform = "scale(0)";
					curtain.style.opacity = 0;
					curtain.style.zIndex = -5;
					option.classList.remove("true");
					mainGame();
				}, 600);
			} else {
				alertBox.innerHTML = "WRONG";
				alertBox.style.background = "#f71722";
				alertBox.style.boxShadow = "0 0 100px #f71722";
				if (score > 0) {
					score--;
				} else {
					score = 0;
				}
				scoreBox.innerText = score;

				setTimeout(function () {
					alertBox.style.transform = "scale(0)";
					curtain.style.opacity = 0;
					curtain.style.zIndex = -5;
					option.classList.remove("true");
				}, 600);
			}
		});
	});
}

function selectTime() {
	curtain.style.opacity = 1;
	curtain.style.zIndex = 5;
	alertBox.style.transform = "scale(1)";
	alertBox.style.background = "#192730";
	alertBox.style.boxShadow = "0 0 50px rgba(0, 0, 0, 0.7)";
	alertBox.innerHTML = `
		<select id="selectTime">
			<option value="2" selected="selected">2 Minutes</option>
			<option value="5">5 Minutes</option>
			<option value="7">7 Minutes</option>
			<option value="10">10 Minutes</option>
		</select>
		<button id="playButton" onclick="javascript:play();">Play!</button>
	`;
	window.selectTime = $("#selectTime");
}

function play() {
	window.time = window.selectTime.options[window.selectTime.selectedIndex].value*60000;
	
	curtain.style.opacity = 0;
	curtain.style.zIndex = -5;
	alertBox.style.transform = "scale(0)";
	setTimeout(function () {
		curtain.style.zIndex = 5;
		curtain.style.opacity = 1;
		alertBox.style.transform = "scale(1)";
		alertBox.innerHTML = "FINISHED!<br/><small>Your Score: " + window.score + "</small><br/><small>Selected Time: " + window.selectTime.options[window.selectTime.selectedIndex].text + "</small><br/><button id='replayButton'>Replay</button>";
		alertBox.style.background = "#19223b";
		alertBox.style.boxShadow = "0 0 100px #19223b";
		$("button#replayButton").addEventListener("click", function () {
			curtain.style.opacity = 1;
			curtain.style.zIndex = 5;
			alertBox.style.transform = "scale(1)";
			alertBox.style.background = "#192730";
			alertBox.style.boxShadow = "0 0 50px rgba(0, 0, 0, 0.7)";
			alertBox.innerHTML = `
				<select id="selectTime">
					<option value="2" selected="selected">2 Minutes</option>
					<option value="5">5 Minutes</option>
					<option value="7">7 Minutes</option>
					<option value="10">10 Minutes</option>
				</select>
				<button id="playButton" onclick="javascript:play();">Play!</button>
			`;
			window.score = 0;
		});
	}, window.time);
	
}

window.addEventListener("load", function () {
	$("#game-container").style.opacity = 0;
	setTimeout(function () {
		$("#game-container").style.opacity = 1;
	}, 500);
	mainGame();
	giveAlert();
	selectTime();
});
