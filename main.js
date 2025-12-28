document.addEventListener('DOMContentLoaded', function() {
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

    gameCanvas.width = innerWidth;
    gameCanvas.height = innerHeight;

    let floor = 500;
    let jump = false;
    let rectY = 500;

    let rectX = 100;
    let speed = 4;
    let moveRight = false;
    let moveLeft = false;

    let animationId;
    let elapsed = null;

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
            const startTime = performance.now();
            elapsed = performance.now() - startTime;

            if (elapsed <= 1000) {
                rectY--;

                ctx.fillStyle = "blue";
                ctx.fillRect(rectX, rectY + 100, 100, 100,);
            } else {
                rectY++;

                ctx.fillStyle = "blue";
                ctx.fillRect(rectX, rectY - 100, 100, 100);
            }
        }
        
        animationId = requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}); 