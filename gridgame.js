const gridDisplay = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const resultDisplay = document.getElementById('result')
const bestscoreDisplay = document.getElementById('bestscore')
const width = 4
let score = 0
let bestscore = 0
var squares = []

//number generate
function generate() { 
    let randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber] == 0) {
        squares[randomNumber] = 2 
        checkForGameLose()
    }
       else generate()
       display();
}
//create board
function createBoard() { 
    for(let i = 0; i < width*width; i++) {
        square = document.createElement('div')
        square.className = 'tile'
        square.innerHTML = 0
        gridDisplay.appendChild(square)
        squares.push(parseInt(square.innerHTML))
    }
    generate()
    generate()
    
}

function moveRight() { 
    for (let i = 0; i < 16; i ++) {
        if (i % 4 === 0) {
            let totalOne = squares[i] 
            let totalTwo = squares[i+1] 
            let totalThree = squares[i+2] 
            let totalFour = squares[i+3] 
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredRow = row.filter(num => num)
            let missing = 4 - filteredRow.length
            let zeros = Array(missing).fill(0)
            let newRow = zeros.concat(filteredRow)

            squares[i] = newRow[0] 
            squares[i+1] = newRow[1] 
            squares[i+2] = newRow[2] 
            squares[i+3] = newRow[3] 
            }
}
} 

//swipe left 
function moveLeft() { 
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            let totalOne = squares[i] 
            let totalTwo = squares[i+1] 
            let totalThree = squares[i+2] 
            let totalFour = squares[i+3] 
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredRow = row.filter(num => num)
            let missing = 4 - filteredRow.length
            let zeros = Array(missing).fill(0)
            let newRow = filteredRow.concat(zeros)
            
            squares[i] = newRow[0] 
            squares[i+1] = newRow[1] 
            squares[i+2] = newRow[2] 
            squares[i+3] = newRow[3] 
            }
}
}

//swipe down 
function moveDown() {
    for(let i = 0; i < 4; i++) {
        let totalOne = squares[i] 
        let totalTwo = squares[i+width] 
        let totalThree = squares[i+(width*2)] 
        let totalFour = squares[i+(width*3)] 
        let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
        
        let filteredColumn = column.filter(num =>num)
        let missing = 4 - filteredColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = zeros.concat(filteredColumn)

        squares[i] = newColumn[0] 
        squares[i+width] = newColumn[1] 
        squares[i+width*2] = newColumn[2] 
        squares[i+width*3] = newColumn[3] 

    }
}

//swipe up 
function moveUp() {
    for(let i = 0; i < 4; i++) {
        let totalOne = squares[i] 
        let totalTwo = squares[i+width] 
        let totalThree = squares[i+(width*2)] 
        let totalFour = squares[i+(width*3)]
        let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
        
        let filteredColumn = column.filter(num =>num)
        let missing = 4 - filteredColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = filteredColumn.concat(zeros)

        squares[i] = newColumn[0] 
        squares[i+width] = newColumn[1] 
        squares[i+width*2] = newColumn[2]
        squares[i+width*3] = newColumn[3] 
    }
}

function combineRow() {
    for (let i = 0; i < 15; i++) {
        if (squares[i] === squares[i+1]) { 
            let combinedTotal = parseInt(squares[i]) + parseInt(squares[i+1]) 
            squares[i] = combinedTotal 
            squares[i+1] = 0 
            score += combinedTotal
            scoreDisplay.innerHTML = score
        }
    }
    checkForWin()
} 

function combineColumn() {
    for (let i = 0; i < 12; i++) {
        if (squares[i] === squares[i+width]) { 
            let combinedTotal = parseInt(squares[i]) + parseInt(squares[i+width]) 
            squares[i] = combinedTotal 
            squares[i+width] = 0 
            score += combinedTotal
            scoreDisplay.innerHTML = score 
        }
    }
    checkForWin()
}

//keycodes
function control(e) {
    if(e.keyCode === 39) {
        keyRight()
    }
    else if (e.keyCode === 37) {
    keyLeft() 
    }  
    else if (e.keyCode === 38) {
        keyUp() 
    }
    else if (e.keyCode === 40) {
        keyDown()
    }
}

function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
}
function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
}
function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
}
function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
} 

//check for win
function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] == 2048) {
            resultDisplay.innerHTML = 'You Won!'
            if (score > bestscore) {
                bestscore = score;
                bestscoreDisplay.innerHTML = bestscore
            }
            document.removeEventListener('keyup', control)
        }
    }
}

//check if no zeros lose
function checkForGameLose() {
    let zeros = 0
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] == 0) {
            zeros++
        }
    }
    let gameStatus = "You Lose!"
    if (zeros === 0) {
        for(let i=0;i<16;i+=4){
            let totalOne = squares[i] 
            let totalTwo = squares[i+1] 
            let totalThree = squares[i+2] 
            let totalFour = squares[i+3] 
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            for(let j=0;j<row.length-1;j++){
                if(row[j]==row[j+1]){
                   gameStatus = "still playing"
                }
            }
            let colToNum={0:0,4:1,8:2,12:3};
                totalOne = squares[colToNum[i]] 
                totalTwo = squares[colToNum[i]+width]
                totalThree = squares[colToNum[i]+(width*2)] 
                totalFour = squares[colToNum[i]+(width*3)] 
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            for(let j=0;j<column.length-1;j++){
                if(column[j]==column[j+1]){
                   gameStatus = "still playing"   
                }
            }
        }
    }
    if (gameStatus != "still playing" && zeros == 0) {
        resultDisplay.innerHTML = 'You Lose!'
    if (score > bestscore) {
        bestscore = score;
        bestscoreDisplay.innerHTML = bestscore
    }
    document.removeEventListener('keyup', control)
    }
}

function display() {
    for(let i = 0; i <16; i++) {
        if (squares[i] == 0) {
            document.getElementsByClassName('tile')[i].innerHTML = " "

        }
        else{
            document.getElementsByClassName('tile')[i].innerHTML = squares[i]
        }
    } 
    let numToColor = {
        " ":"#ffffffcc",
        2:"#e9e1cf",
        4:"#eedbba",
        8:"#faaa63",
        16:"#fc8e4f",
        32:"#fc7252",
        64:"#fc7252",
        128:"#fc8e4f",
        256:"#fc7252",
        512:"#fc7252",
        1024:"#fc7252",
        2048:"#e7ac27",
    }
    var tiles = document.getElementsByClassName('tile')
    for(let i = 0; i < 16; i++) {
    tiles[i].style.backgroundColor = numToColor[tiles[i].innerHTML]
    }     
}

function reload() {
    for(let i = 0; i < 16; i++) {
        squares[i] = 0
    }
    score = 0;
    scoreDisplay.innerHTML = score
    resultDisplay.innerHTML = ''
    generate()
    generate()
    document.addEventListener('keyup', control)
}
document.addEventListener('DOMContentLoaded',() => {
   createBoard() 
   document.addEventListener('keyup', control)
}) 
