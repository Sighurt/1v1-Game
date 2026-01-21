    document.addEventListener('DOMContentLoaded', function() {
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

    gameCanvas.width = innerWidth;
    gameCanvas.height = innerHeight;

    let bulletX = 50;
    let bulletY = 50;
    let bullet;
    let bulletSpeed;
    let shoot = false;

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
  
        if (rectY2 >= floor) {
            jump2 = true
            startTime2 = performance.now();
        }
    }) 

    document.addEventListener('keydown', event => {
        if (event.code === 'KeyD' && !moveRight) {
            moveRight = true;
        } else if (event.code === 'KeyA' && !moveLeft) {
            moveLeft = true;      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
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
  
        if (rectY >= floor) {
            jump = true
            startTime = performance.now();
        }
    }) 

    document.addEventListener('keydown', event => {
        if (event.code === 'KeyV') {
            shoot = true;
        }
    })

    document.addEventListener('keyup', event => {
        if (event.code === 'KeyV') {
            shoot = false;
        }
    })

    //bullet logic

    function bulletFunc() {

        if (shoot === true) {
            bulletX = rectX2 + 100;
            bulletY = rectY2;

            ctx.fillStyle = "black";
            bulletX += speed * 2;
            ctx.fillRect(bulletX, bulletY, 15, 15); // find way to find bulletX and bulletY correctly
        }
    }

    function gameLoop() {

        ctx.fillStyle = "green";
        ctx.fillRect(rectX2, rectY2, 100, 100);

        ctx.fillStyle = "red";
        ctx.fillRect(rectX, rectY, 100, 100);

        //movement/hitboxes logic green

        if (rectX2 + 100 <= rectX) {
            if (rectX2 <= 700 && moveRight2 == true && rectX2 + 100 <= rectX) {
                rectX2 += speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX2 - 100, rectY2, 100, 100);
            }
        } else {
            if (rectX2 <= 700 && moveRight2 == true && rectX2 >= rectX + 96) {
                rectX2 += speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX2 - 100, rectY2, 100, 100);
            }
        } if (rectX2 >= rectX + 100){
            if (rectX2 >= 0 && moveLeft2 == true && rectX2 >= rectX + 100) {
                rectX2 -= speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX2 + 100, rectY2, 100, 100);
            } 
        } else {
            if (rectX2 >= 0 && moveLeft2 == true && rectX2 <= rectX) {
                rectX2 -= speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX2 + 100, rectY2, 100, 100);
            } 
        }
        
        //jump logic green

        if (jump2 === true) { 
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

        //movement/hitboxes logic red

        if (rectX + 100 <= rectX2) {
            if (rectX <= 700 && moveRight == true && rectX + 100 <= rectX2) {
                rectX += speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX - 100, rectY, 100, 100); 
            }
        } else {
            if (rectX <= 700 && moveRight == true && rectX >= rectX2 + 100) {
                rectX += speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX - 100, rectY, 100, 100); 
            }
        } if (rectX >= rectX2 + 100) {
            if (rectX >= 0 && moveLeft == true) { //finish hitboxes
                rectX -= speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX + 100, rectY, 100, 100); 
            }
        } 
        
        //jump logic red
        
        if (jump === true) { 
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

        bulletFunc()
        
        animationId = requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}); 



