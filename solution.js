const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field
    }
    get field() {
        return this._field;
    }
    print() {
        for (let i = 0; i < this._field.length; i++) {
            console.log(this._field[i].join(' '));
        }

    }
    static generateField(width, height, percentage = 10) {
        console.log('Width: ', width, "Height: ", height);
        let numberOfAvailableHoles = Math.floor(width*height*(percentage/100))
        console.log(percentage);
        let numberOfHoles = 0;
        var field = new Array(height);
        for (let index = 0; index < field.length; index++) {
            field[index] = new Array(width);
        }
        let randomHatPositionX = Math.floor(Math.random() * (width - 1)) + 1;
        let randomHatPositionY = Math.floor(Math.random() * (height - 1)) + 1;
        for (let i = height - 1; i >= 0; i--) {
            for (let j = 0; j < width; j++) {
                if (Math.floor(Math.random()*2) && numberOfAvailableHoles) {
                    field[i][j] = 'O'
                    numberOfHoles++;
                    numberOfAvailableHoles--;
                } else {
                    field[i][j] = '░'
                }
            }
        }
        field[0][0] = '*';
        field[randomHatPositionY][randomHatPositionX] = '^';

        return field;
    }

}

function gameStart(field) {
    let gameIsRunning = true;
    let currentPositionX = 0;
    let currentPositionY = 0;
    do {
        field.print();
        console.log(currentPositionX, ' ', currentPositionY)
        // console.log(field.field);
        // console.log(field.field.length);
        // console.log(field.field[0].length);
        let nextMove = prompt("Which way? ")
        switch (nextMove) {
            case 'u':
                if (currentPositionY - 1 < 0) {
                    console.log("You lose (out of bounds)")
                    gameIsRunning = false;
                } else if (field.field[currentPositionY - 1][currentPositionX] === '^') {
                    console.log('YOU WIN!')
                    gameIsRunning = false;
                } else if (field.field[currentPositionY - 1][currentPositionX] === 'O') {
                    console.log("You lose (jumped in the hole)")
                    gameIsRunning = false;
                } else {
                    currentPositionY--;
                }
                break;
            case 'r':
                if (currentPositionX === field.field[0].length - 1) {
                    console.log("You lose (out of bounds)")
                    gameIsRunning = false;
                } else if (field.field[currentPositionY][currentPositionX + 1] === '^') {
                    console.log('YOU WIN!')
                    gameIsRunning = false;
                } else if (field.field[currentPositionY][currentPositionX + 1] === 'O') {
                    console.log("You lose (jumped in the hole)")
                    gameIsRunning = false;
                } else {
                    currentPositionX++;
                }
                break;
            case 'l':
                if (currentPositionX === 0) {
                    console.log("You lose (out of bounds)")
                    gameIsRunning = false;
                } else if (field.field[currentPositionY][currentPositionX - 1] === '^') {
                    console.log('YOU WIN!')
                    gameIsRunning = false;
                } else if (field.field[currentPositionY][currentPositionX - 1] === 'O') {
                    console.log("You lose (jumped in the hole)")
                    gameIsRunning = false;
                } else {
                    currentPositionX--;
                }
                break;
            case 'd':
                if (currentPositionY + 1 === field.field.length) {
                    console.log("You lose (out of bounds)")
                    gameIsRunning = false;
                } else if (field.field[currentPositionY + 1][currentPositionX] === '^') {
                    console.log('YOU WIN!')
                    gameIsRunning = false;
                } else if (field.field[currentPositionY + 1][currentPositionX] === 'O') {
                    console.log("You lose (jumped in the hole)")
                    gameIsRunning = false;
                } else {
                    currentPositionY++;
                }
                break;

            default:
                break;
        }
        field.field[currentPositionY][currentPositionX] = '*';

    } while (gameIsRunning);

}

const randomWidth = Math.floor(Math.random()*10 + 3)
const randomHeight = Math.floor(Math.random()*10 + 3)    

const myField = new Field(Field.generateField(randomWidth,randomHeight, 30));


gameStart(myField);


//u r l d