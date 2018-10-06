(function() {
	var words = [
		"Beavis and Butthead",
		"Nirvana",
		"Soundgargen",
		"Titanic",
		"Ninja Turtles",
		"Duck Tales",
		"Chip N' Dale",
		"Ren and Stimpy",
		"Flannel",
		"Pogs",
		"Jnco",
		"Stussy",
		"Boy Bands",
		"Bill Clinton",
		"Ragstock",
		"Gateway 2000",
		"Game Boy",
	];

	var currentWord;
	var wins = 0;
	var guessesRemaining = 0;
	var lettersGuessed = [];
	var lettersRemaining = 0;

	function getCurrentWordHTML() {
		var wordHTML = [];
		var wordArray = currentWord.split("");
		for (var i = 0; i < wordArray.length; i++) {
			if (wordArray[i] === " ") {
				wordHTML.push("&nbsp;");
			} else if (lettersGuessed.indexOf(wordArray[i]) !== -1) {
				wordHTML.push("<span>" + wordArray[i] + "</span>");
			} else {
				wordHTML.push("<span>&nbsp;</span>");
			}
		}
		return wordHTML.join("&nbsp;");
	}

	document.addEventListener("keyup", function(event) {
		if (guessesRemaining == 0 || lettersRemaining == 0) {
			currentWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
			guessesRemaining = 10;
			lettersGuessed = [];
			console.log("Current Word: " + currentWord);

			document.getElementById("current-word").innerHTML = getCurrentWordHTML();

			lettersRemaining = currentWord.split("").filter(function(value, index, self) {
				if (value === " ") {
					return false;
				}
				return self.indexOf(value) === index;
			}).length;
			console.log("Letters remaining: " + lettersRemaining);

			document.getElementById('letters').innerHTML = "";
			document.getElementById('guesses').innerHTML = guessesRemaining;
			return; 
		}

		var letter = event.key.toLowerCase();
		console.log("Letter pressed: " + letter);

		// check to make sure this is something we can check against
		if (!/^[a-z0-9]$/.test(letter)) {
			return;
		}

		// check if they already guessed this letter
		if (lettersGuessed.indexOf(letter) !== -1) {
			return;
		}

		lettersGuessed.push(letter);
		document.getElementById('letters').innerHTML = lettersGuessed.join(', ');

		if (currentWord.indexOf(letter) !== -1) {
			document.getElementById("current-word").innerHTML = getCurrentWordHTML();
			lettersRemaining--;
			console.log("Letters remaining: " + lettersRemaining); 
			if (lettersRemaining === 0) {
				wins++;
				document.getElementById("wins").innerHTML = wins;
				setTimeout(function() {
					alert("OMG YOU'RE AMAAAAAZING");
				}, 250);
			}
			
			
		} else {
			guessesRemaining--;
			document.getElementById('guesses').innerHTML = guessesRemaining;
			if (guessesRemaining == 0) {
				setTimeout(function() {
					alert("YOU ARE A LOSER!!! Try again?");
				}, 250);
			}
		}
	})
})();