const timer = document.querySelector('.timer__stopwatch'),
    startBtn = document.querySelector('.button__start'),
    stopBtn = document.querySelector('.button__stop'),
    resetBtn = document.querySelector('.button__reset');

let startTime = 0,
    currentTime = 0,
    elapsedTime = 0,
    paused = true,
    intervalId,
    hrs = 0,
    mins = 0,
    secs = 0;

window.addEventListener('load', () => {
    elapsedTime = parseInt(localStorage.getItem('elapsedTime')) || 0;
    paused = localStorage.getItem('paused') === 'true' || true;
    startTime = parseInt(localStorage.getItem('startTime')) || 0;
    updateTimerDisplay();
});

startBtn.addEventListener('click', () => {
    if(paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
    }
});



stopBtn.addEventListener('click', () => {
    if(!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
        saveValuesToLocalStorage();
    }
});

resetBtn.addEventListener('click', () => {
    paused = true;
    clearInterval(intervalId);
    hrs = 0,
    mins = 0,
    secs = 0;
    startTime = 0;
    currentTime = 0;
    elapsedTime = 0;

    updateTimerDisplay();
    saveValuesToLocalStorage();
});

const updateTime = () => {
    elapsedTime = Date.now() - startTime;
    updateTimerDisplay();
}

const updateTimerDisplay = () => {
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    secs = Math.floor(elapsedTime / 1000 % 60);

    hrs = numReader(hrs);
    mins = numReader(mins);
    secs = numReader(secs);

    timer.innerHTML = `${hrs}:${mins}:${secs}`;

    saveValuesToLocalStorage();
}


const numReader = (el) => {
    return (('0') + el).slice(-2);
}



const saveValuesToLocalStorage = () => {
    localStorage.setItem('elapsedTime', elapsedTime);
    localStorage.setItem('paused', paused);
    localStorage.setItem('startTime', startTime);
}
