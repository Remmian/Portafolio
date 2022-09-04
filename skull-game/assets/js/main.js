// const canvas = document.querySelector('#game');
// const game = canvas.getContext('2d');

// // Variables de movimiento del personaje
// const teclas = {
//     UP: 38,
//     LEFT: 37,
//     RIGHT: 39,
//     DOWN: 40,
// };

// const playerPosition = {
//     x: undefined,
//     y: undefined,
// }

// const giftPosition = {
//     x: undefined,
//     y: undefined,
// }

// // BUTTONS
// const btnUp = document.querySelector('#up');
// const btnLeft = document.querySelector('#left');
// const btnRight = document.querySelector('#right');
// const btnDown = document.querySelector('#down');

// // Canvas Elements
// let canvasSize;
// // Tamaño de cada emogy o elemento
// let sizePerElement = canvasSize / 10;

// // Niveles del juego
// let level = 0;

// // Posiciones de los enemigos
// let enemyPositions = [];

// // Para hacer que canvas se ejecute después de que HTML se ha renderizado
// window.addEventListener('load', setCanvasSize);
// window.addEventListener('resize', setCanvasSize);

// // Eventos para el movimiento del personaje
// btnUp.addEventListener('click', moveUp);
// btnLeft.addEventListener('click', moveLeft);
// btnRight.addEventListener('click', moveRight);
// btnDown.addEventListener('click', moveDown);
// window.addEventListener('keydown', moveWithKeys);

// function setCanvasSize() {
//     // Redimensionemos el tamaño del canvas para que sea un cuadrado
//     const screenWidth = window.innerWidth;
//     const screenHeight = window.innerHeight;

//     if (screenHeight > screenWidth) {
//         canvasSize = screenWidth * 0.85;
//     }
//     else {
//         canvasSize = screenHeight * 0.85;
//     }

//     canvas.setAttribute("width", canvasSize);
//     canvas.setAttribute("height", canvasSize);
//     sizePerElement = canvasSize / 10;

//     startGame();
// }

// function startGame() {
//     // Insertamos elementos en el canvas
//     game.textAlign = "end";
//     game.font = `${sizePerElement}px Helvetica`;

//     const currentLevel = maps[level];
//     const semiCleanedMap = currentLevel.trim().split("\n");
//     const cleanedMap = semiCleanedMap.map((row) => row.trim());
//     const map = cleanedMap.map((row) => row.split(""));

//     enemyPositions = [];
//     game.clearRect(0, 0, canvasSize, canvasSize);
//     map.forEach((row, rowIndex) => {
//         row.map((element, elementIndex) => {
//             const EMOJI = emojis[element];
//             const X_POSITION = sizePerElement * (elementIndex + 1);
//             const Y_POSITION = sizePerElement * (rowIndex + 1);
//             game.fillText(EMOJI, X_POSITION, Y_POSITION);

//             if (element === "O") {
//                 if (playerPosition.x === undefined) {
//                     playerPosition.x = X_POSITION;
//                     playerPosition.y = Y_POSITION;
//                 }
//             }

//             else if (element === "I") {
//                 giftPosition.x = X_POSITION;
//                 giftPosition.y = Y_POSITION;
//             }

//             else if (element === "X") {
//                 enemyPositions.push({
//                     x: X_POSITION,
//                     y: Y_POSITION,
//                 })
//             }
//             movePlayer();
//         })
//     });

//     // Crea un cuadrado negro
//     // game.fillRect(0, 0, 150, 150);

//     // Limpia parte de ese cuadrado negro
//     // game.clearRect(0, 0, 50, 50);
//     // game.clearRect(50, 50, 50, 50);
//     // game.clearRect(100, 100, 50, 50);

//     // Crea un texto
//     // game.fillText("Remmian", 50, 50);

//     // Estilos al texto
//     // game.textAlign = 'center';
//     // game.font = '20px Helvetica';
//     // game.fillStyle = 'blue';
// }

// function movePlayer() {
//     const collisionX = Math.floor(giftPosition.x) === Math.floor(playerPosition.x);
//     const collisionY = Math.floor(giftPosition.y) === Math.floor(playerPosition.y);
//     const thereIsAGiftCollision = collisionX && collisionY;

//     const thereIsEnemyCollision = enemyPositions.find(enemy => {
//         const collisionX = Math.floor(enemy.x) === Math.floor(playerPosition.x);
//         const collisionY = Math.floor(enemy.y) === Math.floor(playerPosition.y);
//         return collisionX && collisionY;
//     });

//     if (thereIsAGiftCollision) {
//         levelWin();
//     }

//     else if (thereIsEnemyCollision) {
//         console.log("Hubo contacto con el enemigo");
//         // level += 1;
//     }


//     const PLAYER_EMOJI = emojis["PLAYER"];
//     game.fillText(PLAYER_EMOJI, playerPosition.x, playerPosition.y);
// }

// function levelWin() {
//     console.log("Ganaste loco");
// }

// function moveWithKeys(event) {
//     const keyPressed = event.keyCode;
//     switch (keyPressed) {
//         case teclas.UP:
//             moveUp();
//             break;

//         case teclas.LEFT:
//             moveLeft();
//             break;

//         case teclas.RIGHT:
//             moveRight();
//             break;

//         case teclas.DOWN:
//             moveDown();
//             break;
//     }
// }

// function moveUp() {
//     const limit = playerPosition.y - sizePerElement;
//     if (limit < 0) {
//         console.log("Te pasaste del límite");
//     }
//     else {
//         playerPosition.y -= sizePerElement;
//         startGame();
//     }
// }

// function moveLeft() {
//     const limit = playerPosition.x - sizePerElement;
//     if (limit <= 0) {
//         console.log("Te pasaste del límite");
//     }
//     else {
//         playerPosition.x -= sizePerElement;
//         startGame();
//     }
// }

// function moveRight() {
//     const limit = playerPosition.x + sizePerElement;
//     if (limit > canvasSize) {
//         console.log("Te pasaste del límite");
//     }
//     else {
//         playerPosition.x += sizePerElement;
//         startGame();
//     }
// }

// function moveDown() {
//     const limit = playerPosition.y + sizePerElement;
//     if (limit > canvasSize) {
//         console.log("Te pasaste del límite");
//     }
//     else {
//         playerPosition.y += sizePerElement;
//         startGame();
//     }

// }



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
// localStorage.setItem('player', undefined);

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
            result.innerHTML = "NO SUPERASTE EL RECORD, ¡VUELVE A INTENTARLO!";
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
