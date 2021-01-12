function $(elem) {
	return document.querySelector(elem);
}

function $all(elems) {
	return document.querySelectorAll(elems);
}

function $id(elemId) {
	return document.getElementById(elemId);
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
				alertBox.style.boxShadow = "0px 0px 100px #10dd3c";
				score++;
				scoreBox.innerText = score;

				setTimeout(function () {
					alertBox.style.transform = "scale(0)";
					curtain.style.opacity = 0;
					curtain.style.zIndex = -5;
					option.classList.remove("true");
					mainGame();
				}, 1000);
			} else {
				alertBox.innerHTML = "WRONG";
				alertBox.style.background = "#f71722";
				alertBox.style.boxShadow = "0px 0px 100px #f71722";
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
				}, 1000);
			}
		});
	});
}
window.addEventListener("load", function () {
	$("#game-container").style.opacity = 0;
	setTimeout(function () {
		$("#game-container").style.opacity = 1;
	}, 500);
	mainGame();
	giveAlert();
});
