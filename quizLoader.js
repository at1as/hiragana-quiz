const hiragana = {
  "あ": "a",
  "い": "i",
  "う": "u",
  "え": "e",
  "お": "o",
  "か": "ka",
  "き": "ki",
  "く": "ku",
  "け": "ke",
  "こ": "ko",
  "きゃ": "kya",
  "きゅ": "kyu",
  "きょ": "kyo",
  "さ": "sa",
  "し": "shi",
  "す": "su",
  "せ": "se",
  "そ": "so",
  "しゃ": "sha",
  "しゅ": "shu",
  "しょ": "sho",
  "た": "ta",
  "ち": "chi",
  "つ": "tsu",
  "て": "te",
  "と": "to",
  "ちゃ": "cha",
  "ちゅ": "chu",
  "ちょ": "cho",
  "な": "na",
  "に": "ni",
  "ぬ": "nu",
  "ね": "ne",
  "の": "no",
  "にゃ": "nya",
  "にゅ": "nyu",
  "にょ": "nyo",
  "は": "ha",
  "ひ": "hi",
  "ふ": "fu",
  "へ": "he",
  "ほ": "ho",
  "ひゃ": "hya",
  "ひゅ": "hyu",
  "ひょ": "hyo",
  "ま": "ma",
  "み": "mi",
  "む": "mu",
  "め": "me",
  "も": "mo",
  "みゃ": "mya",
  "みゅ": "myu",
  "みょ": "myo",
  "や": "ya",
  "ゆ": "yu",
  "よ": "yo",
  "ら": "ra",
  "り": "ri",
  "る": "ru",
  "れ": "re",
  "ろ": "ro",
  "りゃ": "rya",
  "りゅ": "ryu",
  "りょ": "ryo",
  "わ": "wa",
  "ゐ": "wi",
  "ゑ": "we",
  "を": "wo",
  "ん": "n",
  "が": "ga",
  "ぎ": "gi",
  "ぐ": "gu",
  "げ": "ge",
  "ご": "go",
  "ぎゃ": "gya",
  "ぎゅ": "gyu",
  "ぎょ": "gyo",
  "ざ": "za",
  "じ": "ji",
  "ず": "zu",
  "ぜ": "ze",
  "ぞ": "zo",
  "じゃ": "ja",
  "じゅ": "ju",
  "じょ": "jo",
  "だ": "da",
  "ぢ": "ji, dji, jyi",
  "づ": "dzu, zu",
  "で": "de",
  "ど": "do",
  "ぢゃ": "ja",
  "ぢゅ": "ju",
  "ぢょ": "jo",
  "ば": "ba",
  "び": "bi",
  "ぶ": "bu",
  "べ": "be",
  "ぼ": "bo",
  "びゃ": "bya",
  "びゅ": "byu",
  "びょ": "byo",
  "ぱ": "pa",
  "ぴ": "pi",
  "ぷ": "pu",
  "ぺ": "pe",
  "ぽ": "po",
  "ぴゃ": "pya",
  "ぴゅ": "pyu",
  "ぴょ": "pyo"
}

function randomIndexInRange(limit, alreadyUsedElements) {
  while (true) {
    const index = Math.floor(Math.random() * limit);

    if (!alreadyUsedElements.includes(index)) {
      return index;
    }
  }
}

function shuffle(arr) {
	const newArr = [...arr];
	for (let i = newArr.length - 1 ; i > 0 ; i--) {
		const rand = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
	}

	return newArr;
}

function nextQuestion() {
  const multipleChoices = 4;
  const hiraganaSymbols = Object.keys(hiragana);
  const hiraganaSetSize = Object.keys(hiragana).length;

  const katakanaSymbols = Object.keys(hiragana);
  const katakanaSetSize = Object.keys(hiragana).length;

  const symbolIndexes = [];
  for (let i = 0 ; i < multipleChoices ; i++) {
    const newSymbol = randomIndexInRange(hiraganaSetSize, symbolIndexes);
    symbolIndexes.push(newSymbol)
  }

  updatePageForNextQuestion(symbolIndexes, hiraganaSymbols);
}

function updatePageForNextQuestion(symbolIndexes, hiraganaSymbols) {
  const quizValues    = symbolIndexes.map((x) => hiraganaSymbols[x]);
  const quizAnswers   = quizValues.map((x) => hiragana[x]);
  const targetValue   = quizValues[0];
  const targetAns     = hiragana[targetValue];
  const answerOptions = document.getElementById('answer-options');

  document.getElementById('answer-grader').innerHTML = '';
  document.getElementById('show-symbol').innerHTML 	 = targetValue;

  while (answerOptions.hasChildNodes()) {
    answerOptions.removeChild(answerOptions.lastChild);
  }

  ([""].concat(shuffle(quizAnswers))).forEach((el) => {
    const opt     = document.createElement('option');
    opt.value     = el;
    opt.innerHTML = el;

    answerOptions.appendChild(opt);
  });
}

function grader() {
  const question     = document.getElementById('show-symbol').innerHTML.trim();
  const targetAns    = hiragana[question];
  const selectedAns  = document.getElementById('answer-options').value;
  const answerGrader = document.getElementById('answer-grader');

	if (selectedAns === "") {
		return;
	}

  if (selectedAns !== targetAns) {
    answerGrader.innerHTML = `<span style="color:red">"${selectedAns}" was Incorrect</span>`;
  } else {
    answerGrader.innerHTML = `<span style="color:green">"${targetAns}" was Correct</span>`;
  }
}

window.onload = function() {
  nextQuestion();

  document.getElementById('answer-submit').addEventListener("click", nextQuestion);
  document.getElementById('answer-options').addEventListener("click", grader);
  
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 39:
        nextQuestion();
        break;
    }
  }
}
