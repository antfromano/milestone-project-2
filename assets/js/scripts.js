// Select all match-card elements
const cards = document.querySelectorAll('.match-card');

// Match logic, freezes board and assigns firstBill and secondBill
let hasFlippedBill = false;
let freezeBoard = false;
let firstBill, secondBill;

// flipBill function runs on bill click with match logic and stops double click
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

// Accesses bill dataset, checks for match, plays audio and runs disableBills and unflipBills
function checkForMatch() {
    if(firstBill.dataset.framework === secondBill.dataset.framework) {
        var audio = new Audio('assets/ch-ching.wav');
        audio.play();
        disableBills();
        return;
    }
    unflipBills();
}

// Event listener to stop additional flipping
function disableBills() {
    firstBill.remoteEventListener('click', flipBill);
    secondBill.removeEventListener('click', flipBill);

    resetBoard();
}

// Flips bills back
function unflipBills(){
    freezeBoard = true;
    setTimeout(() => {
        firstBill.classList.remove('flip');
        secondBill.classList.remove('flip');
        freezeBoard = false;
        resetBoard();
    }, 1000);
}

// Resets firstBill and secondBill variables
function resetBoard() {
    [hasFlippedBill, freezeBoard] = [false, false];
    [firstBill, secondBill] = [null, null];
}

// Shuffles bills
(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
    })();

// EventListener for each time bill is clicked runs flipBill function
cards.forEach(card => card.addEventListener('click', flipBill));