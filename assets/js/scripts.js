const cards = document.querySelectorAll('.match-card');

let hasFlippedCard = false;
let freezeBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (freezeBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');
    this.classList.add('flip');

    if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
    }

    secondCard = this;
    hasFlippedCard = false;
    
checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.remoteEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    freezeBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        freezeBoard = false;
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, freezeBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));