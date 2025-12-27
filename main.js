document.addEventListener('DOMContentLoaded', function() {
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

    gameCanvas.width = innerWidth;
    gameCanvas.height = innerHeight;

    let floor = 500;
    let rectX = 100;
    let rectY = 500;
    let speed = 4;
    let animationId;
    let moveRight = false;
    let moveLeft = false;
    let jump = false;

    document.addEventListener('keydown', event => {
        if (event.code === 'KeyD' && !moveRight) {
            moveRight = true;
        } else if (event.code === 'KeyA' && !moveLeft) {
            moveLeft = true;
        }
    })

    document.addEventListener('keyup', event => {
        if (event.code === 'KeyD') {
            moveRight = false;
        } else if (event.code === 'KeyA'){
            moveLeft = false;
        }
    }) 

    document.addEventListener('keydown', event => {
        if (event.code === 'Space') {jump = true}
    })

    function gameLoop() {
        ctx.fillStyle = "red";
        ctx.fillRect(rectX, rectY, 100, 100);

        if (rectX <= 700 && moveRight == true) {
            rectX += speed;
            ctx.fillStyle = "blue";
            ctx.fillRect(rectX - 100, rectY, 100, 100); 
        } if (rectX >= 0 && moveLeft == true) {
            rectX -= speed;
            ctx.fillStyle = "blue";
            ctx.fillRect(rectX + 100, rectY, 100, 100); 
        } if (jump === true) {
            rectY -= speed; //somehow stop this
            ctx.fillStyle = "blue";
            ctx.fillRect(rectX, rectY + 100, 100, 100);
            if (rectY <= floor - 100) {
                rectY += speed * 2; //fix this
            }
        }
        
        animationId = requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}); 