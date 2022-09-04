const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const result = document.querySelector('#result');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let currentRecord;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};
let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);

        const isThereRecord = localStorage.getItem("lastRecord");

        if (isThereRecord === null) {
            spanRecord.innerHTML = "0";
            result.innerHTML = 'Bienvenido, ¡crea tu primer record en el juego! :)';
        }
        else {
            spanRecord.innerHTML = `${isThereRecord}`;
        }
    }

    showLives();

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    enemyPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail() {
    lives--;
    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('¡Terminaste el juego!');
    clearInterval(timeInterval);

    const isThereRecord = localStorage.getItem("lastRecord");

    if (isThereRecord !== null) {
        const lastRecord = localStorage.getItem("lastRecord");

        if (currentRecord < lastRecord) {
            localStorage.setItem("lastRecord", currentRecord);
            result.innerHTML = "SUPERASTE EL RECORD, ¡FELICIDADES!:)";
        }
        else {
            result.innerHTML = "NO SUPERASTE EL RECORD,¡VUELVE A INTENTARLO!";
        }
    }
    else {
        localStorage.setItem("lastRecord", currentRecord);
        result.innerHTML = "HICISTE UN GRAN INICIO, ¡INTENTA SUPERARLO!:)";
    }
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis["HEART"]);
    // [ "❤️", "❤️", "❤️" ]
    const hearts = heartsArray.join("");
    // "❤️❤️❤️"
    spanLives.innerHTML = hearts;
}

function showTime() {
    currentRecord = Date.now() - timeStart;
    // let seconds = (Date.now() - timeStart) / 1000;
    spanTime.innerHTML = currentRecord;
}

// function showRecord() {
//     const newRecord = localStorage.getItem("player");
//     spanRecord.innerHTML = newRecord;
// }

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {
    const limit = playerPosition.y - elementsSize;
    if (limit < 0) {
        console.log("Te pasaste del límite");
    }
    else {
        playerPosition.y -= elementsSize;
        startGame();
    }

    // if ((playerPosition.y - elementsSize) < elementsSize) {
    //     console.log('OUT');
    // } else {
    //     playerPosition.y -= elementsSize;
    //     startGame();
    // }
    // playerPosition.y -= elementsSize;
    // startGame();
}
function moveLeft() {
    const limit = playerPosition.x - elementsSize;
    if (limit <= 0) {
        console.log("Te pasaste del límite");
    }
    else {
        playerPosition.x -= elementsSize;
        startGame();
    }

    // if ((playerPosition.x - elementsSize) < elementsSize) {
    //     console.log('OUT');
    // } else {
    //     playerPosition.x -= elementsSize;
    //     startGame();
    // }
    // playerPosition.x -= elementsSize;
    // startGame();
}
function moveRight() {
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown() {
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}
