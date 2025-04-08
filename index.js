document.addEventListener('DOMContentLoaded',function(){
    const gameArena = document.getElementById("game-arena")
    const arenaSize=600
    const cellSize = 20
    let score = 0
    let gameStarted = false
    let snakeSpeed = 200
    //total pixels per cell = cell size x cell number
    let food = {x:300,y:200}
    let snake = [{x:160,y:200},{x:140,y:200},{x:120,y:200}]
    let dx = cellSize
    let intervalId;
    let dy = 0
    function changeDirection(e){
        const isGoingDown = dy === cellSize
        const isGoingUp = dy === -cellSize
        const isGoingRight = dx === cellSize
        const isGoingLeft = dx === -cellSize
        if(e.key === "ArrowUp" && !isGoingDown){
            dx = 0;
            dy =- cellSize;
        }else if(e.key ==="ArrowDown" && !isGoingUp){
            dx = 0;
            dy = cellSize
        }else if(e.key ==="ArrowLeft" && !isGoingRight){
            dx = -cellSize;
            dy = 0
        }else if(e.key ==="ArrowRight" && !isGoingLeft){
            dx = cellSize;
            dy = 0;
        }

    }
    function updateSnake(){
        const newHead = {x:snake[0].x+dx,y:snake[0].y+dy};
        snake.unshift(newHead)
        if(newHead.x=== food.x && newHead.y === food.y){
            score += 10
            updateFood()
            if (snakeSpeed > 50){
                clearInterval(intervalId);
                snakeSpeed -+ 10;
                gameLoop()
            }
        }else{
            snake.pop()
        }
    }
    function isGameOver(){
        for(let i = 1; i<snake.length; i++){
            if (snake[0].x=== snake[i].x && snake[0].y === snake[i].y){
                return true
            }
        }
        const hitleft = snake[0].x < 0
        const hitRight = snake[0].x > arenaSize - cellSize
        const hitTop = snake[0].y > arenaSize - cellSize
        const hitBottom = snake[0].y < 0
        if (hitleft || hitRight || hitTop || hitBottom){
            return true
        }
        return false;
    }
    function createDiv(x,y,className){
        const element = document.createElement('div')
        element.classList.add(className)
        element.style.top = `${y}px`
        element.style.left = `${x}px`
        return element;
    }
    function randomCell(){
        const pos = (Math.floor(Math.random() * 30))* cellSize
        return pos;
    }
    function updateFood(){
        console.log("Updated food")
        let newX;
        let newY;
        do{
            newX = randomCell()
            newY = randomCell()

        }while(snake.some(cell=>cell.x === newX && cell.y === newY))
        food={x:newX,y:newY}
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
    function gameLoop(){
        intervalId = setInterval(()=>{
            drawFoodAndSnake()
            updateSnake()
            createScoreBoard()
            if(isGameOver()){
                clearInterval(intervalId)
                alert(`Game over, Your Score:${score}`)
            }
        },snakeSpeed)
    }
    function runGame(){
        if(!gameStarted){
            gameStarted=true
        }
        document.addEventListener('keydown',changeDirection)
        gameLoop()
    }
    function createScoreBoard(){
        const scoreBoard = document.getElementById("score-board")
        scoreBoard.textContent = `Score:${score}`
    }
    function initiateGame(){
        const scoreBoard = document.createElement("div")
        scoreBoard.id = "score-board"
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