let startBtn = document.querySelector('#start');
let timer = document.querySelector('#timer');
let tds = document.querySelectorAll('#table td');
let timerS;
let count = 60;
let status = 'over';
let luckyCell = [];

let startTimer = function() {
  timerS = setInterval(function() {
    timer.textContent = count--;
    status = 'play';
    if (count == 0) {
      youLose();
    }
  }, 1000);
};

let getRandom = function(min, max) {
  return Math.round(Math.random() * (max - min) + min, 2)
};

let getLucky = function() {
  while (luckyCell.length != 10) {
    let rand = getRandom(1, 100);
    if (!luckyCell.includes(tds[rand])) {
      luckyCell.push(tds[rand]);
    }
  }
};

let youWin = function() {
  if (luckyCell.length == 0) {
    clearInterval(timerS);
    alert('You WIN!');
    status = 'over';
  }
};

let youLose = function() {
  clearInterval(timerS);
  alert('You LOSE!');
  status = 'over';
};

let start = function () {
  startTimer();
  getLucky();
    for (let td of tds) {
      td.addEventListener('click', function cl() {
        if (luckyCell.indexOf(this) !== -1 && luckyCell.length !== 0 && status === 'play') {
          this.style.backgroundColor = 'green';
          luckyCell.splice(luckyCell.indexOf(this), 1);
          youWin();
          this.removeEventListener('click', cl);
        } else if (luckyCell.indexOf(this) === -1 && luckyCell.length !== 0 && status === 'play'){
          this.style.backgroundColor = 'red';
          this.removeEventListener('click', cl);
        }
      });
    }
  startBtn.removeEventListener('click', start);
};

startBtn.addEventListener('click', start);

