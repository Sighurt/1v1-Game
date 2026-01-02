document.addEventListener('DOMContentLoaded', function() {
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

    gameCanvas.width = innerWidth;
    gameCanvas.height = innerHeight;

    let floor = 500;
    let jump = false;
    let jump2 = false;
    let rectY2 = 500;
    let rectY = 500;

    let rectX = 100;
    let rectX2 = 300;
    let speed = 8;
    let moveRight = false;
    let moveLeft = false;
    let moveRight2 = false;
    let moveLeft2 = false;

    let animationId;
    let elapsed = null;
    let elapsed2 = null;
    let startTime;
    let startTime2;

    document.addEventListener('keydown', event => {
        if (event.code === 'ArrowRight' && !moveRight2) {
            moveRight2 = true;
        } else if (event.code === 'ArrowLeft' && !moveLeft2) {
            moveLeft2 = true;
        }
    })

    document.addEventListener('keyup', event => {
        if (event.code === 'ArrowRight') {
            moveRight2 = false;
        } else if (event.code === 'ArrowLeft'){
            moveLeft2 = false;
        }
    }) 
    
    document.addEventListener('keydown', event => {
        if (event.code !== 'ArrowUp') {return;}
  
        jump2 = true
        startTime2 = performance.now();
    }) 

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
        if (event.code !== 'Space') {return;}
  
        jump = true
        startTime = performance.now();
    }) 

    function gameLoop() {

        ctx.fillStyle = "green";
        ctx.fillRect(rectX2, rectY2, 100, 100);

        ctx.fillStyle = "red";
        ctx.fillRect(rectX, rectY, 100, 100);

        if (rectX2 <= 700 && moveRight2 == true) {
            rectX2 += speed;
            ctx.fillStyle = "blue";
            ctx.fillRect(rectX2 - 100, rectY2, 100, 100); 
        } if (rectX2 >= 0 && moveLeft2 == true) {
            rectX2 -= speed;
            ctx.fillStyle = "blue";
            ctx.fillRect(rectX2 + 100, rectY2, 100, 100); 
        } if (jump2 === true) { 
            elapsed2 = performance.now() - startTime2;

            if (elapsed2 <= 150 && rectY2 >= 280) {
                rectY2 -= 25;

                ctx.fillStyle = "blue";
                ctx.fillRect(rectX2, rectY2 + 100, 100, 100,);

                
            } else {
                if (rectY2 <= floor) {
                    rectY2 += 13;

                    ctx.fillStyle = "blue";
                    ctx.fillRect(rectX2, rectY2 - 100, 100, 100);
                }
            }
        }

        if (rectX <= 700 && moveRight == true) {
            rectX += speed;
            ctx.fillStyle = "blue";
            ctx.fillRect(rectX - 100, rectY, 100, 100); 
        } if (rectX >= 0 && moveLeft == true) {
            rectX -= speed;
            ctx.fillStyle = "blue";
            ctx.fillRect(rectX + 100, rectY, 100, 100); 
        } if (jump === true) { 
            elapsed = performance.now() - startTime;

            if (elapsed <= 150 && rectY >= 280) {
                rectY -= 25;

                ctx.fillStyle = "blue";
                ctx.fillRect(rectX, rectY + 100, 100, 100,);

                
            } else {
                if (rectY <= floor) {
                    rectY += 13;

                    ctx.fillStyle = "blue";
                    ctx.fillRect(rectX, rectY - 100, 100, 100);
                }
            }
        }
        
        animationId = requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}); 



