document.addEventListener('DOMContentLoaded',function(){
    const gameArena = document.getElementById("game-arena")
    const arenaSize=600
    const cellSize = 20
    let score = 0
    let gameStarted = false
    //total pixels per cell = cell size x cell number
    let food = {x:300,y:200}
    let snake = [{x:160,y:200},{x:140,y:200},{x:120,y:200}]
    let dx = cellSize
    let dy = 0
    function changeDirection(e){
        console.log(e)
        if(e.key === "ArrowUp")
    }
    function createDiv(x,y,className){
        const element = document.createElement('div')
        element.classList.add(className)
        element.style.top = `${y}px`
        element.style.left = `${x}px`
        return element;
    }
    function drawFoodAndSnake(){
        gameArena.innerHTML= ""
        snake.forEach(box => {
            const snakeCell = createDiv(box.x,box.y,"snake")
            gameArena.appendChild(snakeCell)
        });
        const foodCell = createDiv(food.x,food.y,"food") 
        gameArena.appendChild(foodCell)
    }
    function runGame(){
        if(!gameStarted){
            gameStarted=true
        }
        drawFoodAndSnake()
        document.addEventListener('keydown',changeDirection)
    }
    function initiateGame(){
        const scoreBoard = document.createElement("div")
        scoreBoard.id = "scoreBoard"
        document.body.insertBefore(scoreBoard,gameArena)
        const startButton = document.createElement("button")
        startButton.textContent = "Start game"
        startButton.classList.add("start-button")
        startButton.addEventListener("click",()=>{
            startButton.style.display="none"
            runGame()
        })
        document.body.appendChild(startButton)
    }
    initiateGame()
});