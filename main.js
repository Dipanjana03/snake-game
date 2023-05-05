const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoretext");
let reset= document.querySelector("#reset");
const width = gameBoard.width;
const height=gameBoard.height;
const boardBackground="darkgreen";
const snakeColor = "yellow";
const foodColor = "red";
const unitSize= 20;
let running= false;
let xposition = unitSize;
let yposition= 0;
let foodX ;
let foodY;
let score=0;
let snake=[
    {x:unitSize *3, y:0},
    {x:unitSize *2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}];
    window.addEventListener("keydown", changeDir);
    reset.addEventListener("click",resetGame);

    gameStart();
   
    function gameStart(){
        running=true;
        scoreText.textContent=score;
        creatFood();
        drawFood();
        nexttick();
    };
    function nexttick(){
        if(running){
            setTimeout(()=>{
                clearBoard();
                drawFood();
                moveSnake();
                drawSnake();
                checkGame();
                nexttick();

            },100)
        }else{displayGame();}
    };
    function clearBoard(){
        context.fillStyle =boardBackground;
        context.fillRect(0,0,width,height);
    };
    function creatFood(){
        function randomFood( min,max){
            const randNum= Math.round((Math.random()*(max-min)+ min)/unitSize)*unitSize
            return randNum;
        }
        foodX=randomFood(0,width-unitSize);
        foodY=randomFood(0,width-unitSize);
        
    };
    function drawFood(){
        context.fillStyle=foodColor;
        context.fillRect(foodX,foodY,unitSize,unitSize);
    };
    function moveSnake(){
        const head={x:snake[0].x+ xposition,
                    y:snake[0].y+ yposition};
                snake.unshift(head);
                if(snake[0].x==foodX && snake[0].y==foodY)
                {
                    score=score+1;
                    scoreText.textContent=score;
                    creatFood();

                }else{snake.pop();}



    };
    function drawSnake(){
        context.fillStyle=snakeColor;
        context.strokeStyle="black";
        snake.forEach(snakePart=> { 
            context.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
            context.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);
        })
    };
    function changeDir(){
        const keypressed=event.keyCode;
        const LEFT=37;
        const UP=38;
        const RIGHT=39;
        const DOWN=40;

        const goingUp =(yposition== -unitSize);
        const goingDown =(yposition== unitSize);
        const goingLeft =(xposition== unitSize);
        const goingRight =(xposition== -unitSize);

        switch(true){
            case(keypressed==LEFT && !goingRight):xposition=-unitSize;yposition=0;break;
            case(keypressed==UP && !goingDown):xposition=0;yposition=-unitSize;break;
            case(keypressed==RIGHT && !goingLeft):xposition=unitSize;yposition=0;break;
            case(keypressed==DOWN && !goingUp):xposition=0;yposition=unitSize;break;

        }
    };
    function checkGame(){
        switch(true){
            case(snake[0].x<0):running=false;
                                displayGame();
                                break;
            case(snake[0].y<0):running=false;
            displayGame();
                                break;
            case(snake[0].x>=width):running=false;
            displayGame();
                                break;
            case(snake[0].y>=height):running=false; displayGame();
                                break;
        }
        for(let i=1;i<snake.length; i++)
        {
            if(snake[i].x==snake[0].x && snake[i].y==snake[0].y )
            {
                running=false;
                displayGame();
            }
        }
    };
    function displayGame(){
        context.font =  "50px Franklin Gothic Medium" ;
        context.fillStyle='black';
        context.textAlign="center";
        context.fillText("GAME OVER",width/2,height/2);
        running=false;
    };
    function resetGame(){
        reset=0;
        xposition=unitSize;
        yposition=0;
        snake=[
            {x:unitSize *3, y:0},
            {x:unitSize *2, y:0},
            {x:unitSize, y:0},
            {x:0, y:0}];
            gameStart();
    };
