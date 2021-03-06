const square = document.querySelectorAll('.square');
const newGameModalButton = document.querySelector('#newGameModal');
const newGameButton = document.querySelector('#newGame');
const modal = document.querySelector('.modal-overlay');
const closeModal = document.querySelector('.modal__cross');
const currentPlayer = document.querySelector('.current');
const scoreX = document.querySelector('.scoreX');
const score0 = document.querySelector('.score0');

let gameState = ['', '', '', '', '', '', '', '', ''];
let counter = 0;
let winCountX = 0;
let winCount0 = 0;

function setWinCount(winX, win0) {
    scoreX.textContent = `Игрок Х побед - ${winX}`;
    score0.textContent = `Игрок 0 побед - ${win0}`;
}

function handleCurrentPlayer(counter) {
    if (counter === 0) currentPlayer.textContent = `Сейчас ходит Х`;
    if (counter !== 0) currentPlayer.textContent = `Сейчас ходит 0`;
}

function showModal(elem) {
    elem.classList.remove('hide');
    elem.classList.add('show');
    document.body.classList.add('scroll-hidden');
}

function hideModal(elem) {
    elem.classList.remove('show');
    elem.classList.add('hide');
    document.body.classList.remove('scroll-hidden');
}

function placeItem(target, i) {
    if (counter === 0 && target.textContent === '') {
        target.textContent = 'x';
        counter = counter + 1;
        gameState[i] = 'x';
    } else if (target.textContent === '') {
        target.textContent = '0';
        counter = counter - 1;
        gameState[i] = '0';
    }
    handleCurrentPlayer(counter);
    checkWinner(gameState);
}

function checkWinner(gameState) {
    const winCondition = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [6, 4, 2]
    ];

    let gameWinnner = '';
    for (let i = 0; i < winCondition.length; i++) {
        let winCheck = winCondition[i];
        let a = gameState[winCheck[0]];
        let b = gameState[winCheck[1]];
        let c = gameState[winCheck[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            gameWinnner = a;
            console.log(gameWinnner);
            if (gameWinnner === 'x') winCountX = winCountX + 1;
            if (gameWinnner === '0') winCount0 = winCount0 + 1;
            console.log(winCountX, winCount0);
            break;
        }
    }

    if (gameWinnner !== '') {
        setWinCount(winCountX, winCount0);
        showModal(modal);
        document.querySelector('.modal__title').textContent = `Победил игрок ${gameWinnner.toUpperCase()}!`;
    } else if (gameState.indexOf('') === -1) {
        showModal(modal);
        document.querySelector('.modal__title').textContent = `Ничья!`;       
    }
}

function startNewGame() {
    square.forEach(item => {
        item.textContent = '';
    });
    // const score = document.querySelectorAll('.winner p');
    // score.forEach(item => {
    //     item.classList.contains('scoreX') ? item.textContent = 'X победили - 0 раз' : null;
    //     item.classList.contains('score0') ? item.textContent = '0 победили - 0 раз' : null;
    // });
    counter = 0;
    gameState = ['', '', '', '', '', '', '', '', ''];
    handleCurrentPlayer(counter);
    console.log(gameState);
}

square.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        placeItem(e.target, i);
    });
});

closeModal.addEventListener('click', () => hideModal(modal));

newGameModalButton.addEventListener('click', () => {
    hideModal(modal);
    startNewGame();
});

newGameButton.addEventListener('click', startNewGame);