const cards = document.querySelectorAll('.match-card');

let hasFlippedBill = false;
let freezeBoard = false;
let firstBill, secondBill;

function flipBill() {
    if (freezeBoard) return;
    if (this === firstBill) return;
    this.classList.toggle('flip');
    this.classList.add('flip');

    if (!hasFlippedBill) {
    hasFlippedBill = true;
    firstBill = this;
    return;
    }
    secondBill = this;
    hasFlippedBill = false;
    
checkForMatch();
}

function checkForMatch() {
    if(firstBill.dataset.framework === secondBill.dataset.framework) {
        var audio = new Audio('assets/ch-ching.wav');
        audio.play();
        disableBills();
        return;
    }
    unflipBills();
}

function disableBills() {
    firstBill.remoteEventListener('click', flipBill);
    secondBill.removeEventListener('click', flipBill);

    resetBoard();
}

function unflipBills(){
    freezeBoard = true;
    setTimeout(() => {
        firstBill.classList.remove('flip');
        secondBill.classList.remove('flip');
        freezeBoard = false;
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedBill, freezeBoard] = [false, false];
    [firstBill, secondBill] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
    })();

cards.forEach(card => card.addEventListener('click', flipBill));