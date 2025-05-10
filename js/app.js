
// config Timer
const minutesPomodoro =0.1;
const minutesBreak = 0.1;
let time = minutesPomodoro *60;
let intervalID;

// audio
const endSFX = new Audio("sfx/end.mp3");


// global variable which tracks if a new timer should start
let newIntervalReady = true;

// global variable which tracks first time the counter goes to 0
let firstCounter = true;

// global variabel that tracks if it has need already asekd for permission
let permissionWasAsked = false;

// check if permission is "granted"
if (Notification.permission === "granted"){
  permissionWasAsked = true;
}

console.log("Permission is " + Notification.permission)

const countdownEl = document.getElementById('countdown')
countdownEl.innerText="25:00"

const controlButton = document.getElementById('controlButton');
const heading =document.getElementById('heading')

//initialize tomato
document.getElementById('tomatoBreak').style.visibility = 'hidden'

function startTimer() {
  if (heading.innerText === 'Focus') {
    time = minutesPomodoro * 60;
  } else {
    time = minutesBreak * 60;
  }
  updateCountdown();
  intervalID = setInterval(updateCountdown, 1000);
}

function updateCountdown(){
  if (heading.innerText === 'Focus'){
    let time = minutesPomodoro *60;
  } else {
    let time = minutesBreak *60;
  }
  const minutes = Math.floor(time/60);
  let seconds = time % 60;
  seconds = seconds <10 ? '0'+seconds :seconds;
  countdownEl.innerText = `${minutes}:${seconds}`
  console.log(time)

  // Notification when time is up
  if (time === -1) {
    clearInterval(intervalID)
    firstCounter = false;

    if (heading.innerText === 'Focus') {
      notify("break")
      changeStyleToBreak()
    } else {
      changeStyleToFocus()
      notify("focus")
    }
    console.log("Timer up")
    newIntervalReady = true;
    return;
  }
  newIntervalReady = false;
  time--;
}



 // Start Stop Button
document.getElementById('controlButton').onclick = function (){
  // If timer is up the first time, ask for Notification
  if (firstCounter === false && permissionWasAsked === false){
      requestPermission()
    }

  // play sounds once silent

  endSFX.play().then(() =>{
    endSFX.pause();
    endSFX.currentTime =0;

  })

  if (controlButton.innerText === 'Start'){
    if (newIntervalReady === true){
      // new Timer
      startTimer()
    } else {
      updateCountdown();
      intervalID = setInterval(updateCountdown, 1000)
    }
    controlButton.innerText = 'Stop';
  }
  else {
    clearInterval(intervalID);
    document.getElementById('controlButton').innerText = 'Start';
  }
}

// Next Button
document.getElementById('nextButton').onclick = function (){
  clearInterval(intervalID)
  controlButton.innerText ="Start"
  // if state is "Focus"
  if (heading.innerText === 'Focus'){
    countdownEl.innerText='5:00'
    time = minutesBreak * 60;
    changeStyleToBreak()
  } else {     // if state is "break"
    countdownEl.innerText='25:00'
    time = minutesPomodoro * 60;
    //change Style
    changeStyleToFocus();

  }
}

function requestPermission(){
  console.log("request Permission")
  Notification.requestPermission().then(() => {
    console.log("Permission is " + Notification.permission )
  });
  permissionWasAsked = true;
}

function notify(string) {
  if (Notification.permission === "granted") {
      if (string === "break") {
        endSFX.play()
        new Notification("Time for a break!", {
          body: "You deserve 5 min of rest.",
        });
      } else {
        endSFX.play()
        new Notification("Time to focus!", {
          body: "Let's get to work",
        });
      }
  }
}


function changeStyleToFocus(){
  // Reset Countdown
  countdownEl.innerText="25:00"
  controlButton.innerText ="Start"


  // Change heading
  heading.innerText ='Focus'

  //change Style
  document.documentElement.style.setProperty('--main-bg-color', 'rgb(173 80 77)');
  document.documentElement.style.setProperty('--container-bg-color', 'rgb(181 98 95)');
  document.documentElement.style.setProperty('--button-hover', '#df4436');

  // change picture
  document.getElementById('tomatoBreak').style.visibility = 'hidden'
  document.getElementById('tomatoWork').style.visibility = 'visible'
}

function changeStyleToBreak(){
  // Reset Countdown
  countdownEl.innerText="5:00"
  controlButton.innerText ="Start"

  // Change heading
  heading.innerText ='Break'

  //change Style
  document.documentElement.style.setProperty('--main-bg-color', 'rgb(77 130 136)');
  document.documentElement.style.setProperty('--container-bg-color', 'rgb(95 144 149)');
  document.documentElement.style.setProperty('--button-hover', 'rgb(35, 96, 103)');

  // Change picture

  document.getElementById('tomatoBreak').style.visibility = 'visible'
  document.getElementById('tomatoWork').style.visibility = 'hidden'
}




