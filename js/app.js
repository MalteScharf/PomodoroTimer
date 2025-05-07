const minutesPomodoro =25;
const minutesBreak = 5;
let time = minutesPomodoro *60;
let intervalID = null;

const countdownEl = document.getElementById('countdown')
countdownEl.innerText="25:00"

const controlButton = document.getElementById('controlButton');
const heading =document.getElementById('heading')

function updateCountdown(){
  if (heading.innerText === 'Focus'){
    let time = minutesPomodoro *60
  } else {
    let time = minutesBreak *60
  }
  const minutes = Math.floor(time/60);
  let seconds = time % 60;
  seconds = seconds <10 ? '0'+seconds :seconds;
  countdownEl.innerText = `${minutes}:${seconds}`
  time--;
}


 // Start Stop Button
document.getElementById('controlButton').onclick = function (){
  if (controlButton.innerText === 'Start'){
    intervalID = setInterval(updateCountdown, 1000)
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

  if (heading.innerText === 'Focus'){
    countdownEl.innerText='5:00'
    heading.innerText ='Break'
    time = minutesBreak * 60;

    //change Style
    document.documentElement.style.setProperty('--main-bg-color', 'rgb(77 130 136)');
    document.documentElement.style.setProperty('--container-bg-color', 'rgb(95 144 149)');
    document.documentElement.style.setProperty('--button-hover', 'rgb(35, 96, 103)');


  } else {
    countdownEl.innerText='25:00'
    heading.innerText ='Focus'
    time = minutesPomodoro * 60;

    //change Style
    document.documentElement.style.setProperty('--main-bg-color', 'rgb(173 80 77)');
    document.documentElement.style.setProperty('--container-bg-color', 'rgb(181 98 95)');
    document.documentElement.style.setProperty('--button-hover', '#df4436');

  }


}
