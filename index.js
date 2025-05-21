
let gameSeq = [];
let userSeq = [];
let btns = ['red', 'green', 'yellow', 'purple'];

let h2 = document.querySelector('h2');
let started = false;
let level = 0;

document.addEventListener('keypress', function () {
    if (!started) {
        console.log('Game started');
        started = true;
        level = 0;
        gameSeq = [];
        levelUp();
    }
});

function buttonFlash(btn) {
    if (!btn) return;
    btn.classList.add('flash');
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randomInd = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomInd];
    let randomBtn = document.querySelector(`.${randomColor}`);
    
    gameSeq.push(randomColor);
    buttonFlash(randomBtn);
}

function checkAnswer(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = `Game Over! You reached Level ${level}. Press any key to restart.`;
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);
        resetGame();
    }
}

function buttonpress() {
    let userColor = this.classList[1];
    userSeq.push(userColor);
    checkAnswer(userSeq.length - 1);
    let btn=this
    buttonFlash(btn)
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let allButtons = document.querySelectorAll('.btn');
for (let btn of allButtons) {
    btn.addEventListener('click', buttonpress);
}
