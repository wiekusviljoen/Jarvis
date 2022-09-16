const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");

//weather

function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6860c1da83e8c5136cf4e8c6dd709741`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location :${data.name} `;
      weatherCont[1].textContent = `Country :${data.sys.country} `;
      weatherCont[2].textContent = `Weather type :${data.weather[0].main} `;
      weatherCont[3].textContent = `Weather description :${data.weather[0].description} `;
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png `;
      weatherCont[5].textContent = `Original Temperature :${
        ktc[data.main.temp]
      } `;
      weatherCont[6].textContent = `feels like :${ktc[data.main.feels_like]} `;
      weatherCont[7].textContent = `Min temperature :${
        ktc[data.main.temp_min]
      } `;
      weatherCont[8].textContent = `Max temperature :${
        ktc[data.main.temp_max]
      } `;
      weatherStatement = `sir the weather in ${data.name}is ${
        data.weather[0].description
      } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };
  xhr.send();
}

//convert to celsius

function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

//calling weather

weather("visakhapatnam");

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
  console.log(`my words :${transcript} `);

  if (transcript.includes("hello jarvis")) {
    readout("hello sir");
    //https://www.youtube.com/
  }

  if (transcript.includes("open youtube")) {
    readout("opening youtube sir");
    window.open("https://www.youtube.com/");
  }
  // youtube search
  if (transcript.includes("youtube for")) {
    readout("opening youtube sir");
    let input = transcript.split("");
    input.splice(0, 11);
    input.pop();
    input = input.join("").split("").join("+");
    window.open(`https://www.youtube.com/results?search_query=${input}`);
  }

  //google open
  if (transcript.includes("open google")) {
    readout("opening google sir");
    window.open("https://www.google.com/");
  }

  //google search

  if (transcript.includes("search for")) {
    readout("here's the results, sir");
    let input = transcript.split("");
    input.splice(0, 11);
    input.pop();
    input = input.join("").split("").join("+");
    window.open(`https://www.google.com/search?q=${input}`);
  }
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

  const allVoices = speechSynthesis.getVoices();

  speech.text = message;
  speech.voice = allVoices[6];
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
