const msgEl = document.getElementById("msg");

const randomNumber = getRandomNumber();

console.log(randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function onSpeak(e) {
  let message = e.results[0][0].transcript;
  writeMessage(message);
  checkNumber(message);
}

function writeMessage(message) {
  msgEl.innerHTML = `
        <div>You Said</div>
        <span class="box">${message}</span>
    `;
}

function checkNumber(message) {
  let num = +message;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>This is not a valid Number</div>`;
    return false;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must between 1 - 100</div>`;
    return false;
  }

  if (num === randomNumber) {
    document.body.innerHTML = `
        <h2>
            Congrats! You have guessed the number! <br><br>
            It was ${num}
        </h2> <br>
        <button class="play-again" id="play-again">Play Again</button>
    `;
    recognition.stop();
  } else if (num > randomNumber) {
    msgEl.innerHTML += `<div>Go Lower</div>`;
  } else {
    msgEl.innerHTML += `<div>Go Higher</div>`;
  }
}

recognition.addEventListener("result", onSpeak);

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
