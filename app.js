const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");

//speech recoginition setup

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
//start
recognition.onstart = function () {
  console.log("vr active");
};

// result
recognition.onresult = function (event) {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();

  if (transcript.includes("hello jarvis")) {
    readout("hello sir");
  }
  /* hi- hello sir
    open google- opening google "google.com"*/
};

//end
recognition.onend = function () {
  console.log("vr deactive");
};

//continue listen

//recognition.continuous = true;

//clickbtns
startBtn.addEventListener("click", () => {
  recognition.start();
});

stopBtn.addEventListener("click", () => {
  recognition.stop();
});

//jarvis speech

function readout(message) {
  const speech = new SpeechSynthesisUtterance();
  //different voices

  //const allVoices = speechSynthesis.getVoices();

  speech.text = message;
  // speech.voice = allVoices[6];
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
  console.log("speaking");
}

//

speakBtn.addEventListener("click", () => {
  readout("hello, sir, how are you?");
});

//window.onload = function () {
// readout("");
//};
