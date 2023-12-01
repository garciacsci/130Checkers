class Timer{
    constructor(){
        this.seconds = 0;
        this.minutes = 0;
        this.timerInterval
    }

    updateTimer() {
        document.getElementById('timer').innerHTML = `${this.minutes}:${(this.seconds < 10) ? '0' : ''}${this.seconds}`;
    }

    incrementTimer = ()=> {
        this.seconds++;
        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
        }
        this.updateTimer();
    }
    startTimer(){
        this.timerInterval = setInterval(this.incrementTimer, 1000)
    }
    stopTimer(){
        clearInterval(this.timerInterval);
    }
    resetTimer(){
        this.seconds = 0;
        this.minutes = 0;
    }

}