const cardNames = ['1', '2', '3', '4', '5', '6', '7'];
let cards = [];
let flippedCards = 0;
let canFlip = true;
let firstCard = null;
let secondCard = null;
let score = 0;
const scoreElement = document.getElementById('score');
const scoreDisplay = document.getElementById('score-display');

for (let i = 0; i < cardNames.length; i++) {
    for (let j = 0; j < 2; j++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.card = cardNames[i];
        cards.push(card);
    }
}

cards = shuffle(cards);

const gameBoard = document.getElementById('game-board');
cards.forEach(card => {
    gameBoard.appendChild(card);

    card.addEventListener('click', () => {
        if (!canFlip || card.classList.contains('matched') || card === firstCard || secondCard) {
            return;
        }

        card.style.background = `url(${card.dataset.card}.jpg) center center no-repeat`;
        card.style.backgroundSize = 'cover';

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            canFlip = false;

            if (firstCard.dataset.card === secondCard.dataset.card) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                flippedCards += 2;
                score += 2;
                if (card.dataset.card === '7') {
                    alert('Chúc mừng bạn đã lật cặp thẻ đặc biệt!');
                    canFlip = false;
                    score += 3;
                    scoreElement.textContent = score;
                    return;
                }
                else if (flippedCards === cards.length) {
                    alert('Chúc mừng bạn!');
                }
                scoreElement.textContent = score;
                firstCard = null;
                secondCard = null;
                canFlip = true;
            } else {
                setTimeout(() => {
                    firstCard.style.background = 'url(main.jpg) center center no-repeat';
                    firstCard.style.backgroundSize = 'cover';
                    secondCard.style.background = 'url(main.jpg) center center no-repeat';
                    secondCard.style.backgroundSize = 'cover';
                    firstCard = null;
                    secondCard = null;
                    canFlip = true;
                }, 500);
                score -= 1;
                scoreElement.textContent = score;
            }
        }
    });
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}