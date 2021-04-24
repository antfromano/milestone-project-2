const cards = document.querySelectorAll('.match-card');

function flipCard() {
    this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));