const btn = document.querySelector("button");
const clockHolder = document.querySelector("span");

btn.addEventListener("click", stopOrResumeClock);

let myIntervalId;

startClock();

function startClock() {
    myIntervalId = setInterval(printCurrentTime, 1000);
}

function printCurrentTime() {
    const now = new Date();
    clockHolder.innerText = now.toLocaleTimeString();
}

function stopOrResumeClock() {
    if (myIntervalId) {
        clearInterval(myIntervalId);
        myIntervalId = undefined;
    } else startClock();
}