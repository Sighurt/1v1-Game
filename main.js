document.addEventListener('DOMContentLoaded', function() {
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

    //declaring variables 
    
    gameCanvas.width = innerWidth;
    gameCanvas.height = innerHeight;

    const belleLeftFrame1 = new Image();
        belleLeftFrame1.src = "belleLeftFrame1.png";

    const belleLeftFrame2 = new Image();
        belleLeftFrame2.src = "belleLeftFrame2.png";

    const belleLeftFrame3 = new Image();
        belleLeftFrame3.src = "belleLeftFrame3.png";

    let belleLeftFrames = [belleLeftFrame1, belleLeftFrame2, belleLeftFrame3];

    
/*    for(let i = 0; i < 3; i++) {
        belleLeftFrames[i].onload = () => {
            ctx.drawImage(belleLeftFrames[1], 0, 0, 130, 130);
        };
    } */

    let bulletSpeed = 25;
    let shoot2 = false;
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

    let bulletX;
    let bulletY;

    let bulletX2;
    let bulletY2

    let facingRight1;
    let facingRight2 = true;

    //movement keybindings

    //player2 movement detection

    document.addEventListener('keydown', event => {
        if (event.code === 'ArrowRight' && !moveRight2) {
            moveRight2 = true;
            facingRight2 = true;
        } else if (event.code === 'ArrowLeft' && !moveLeft2) {
            moveLeft2 = true;
            facingRight2 = false;
        }
    })

    document.addEventListener('keyup', event => {
        if (event.code === 'ArrowRight') {
            moveRight2 = false;
        } else if (event.code === 'ArrowLeft'){
            moveLeft2 = false;
        }
    }) 

    //jump2 detection
    
    document.addEventListener('keydown', event => {
        if (event.code !== 'ArrowUp') {return;}
  
        if (rectY2 >= floor) {
            jump2 = true
            startTime2 = performance.now();
        }
    }) 

    //player1 movement detection

    document.addEventListener('keydown', event => {
        if (event.code === 'KeyD' && !moveRight) {
            moveRight = true;
        } else if (event.code === 'KeyA' && !moveLeft) {
            moveLeft = true;      
            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        }
    })

    document.addEventListener('keyup', event => {
        if (event.code === 'KeyD') {
            moveRight = false;
        } else if (event.code === 'KeyA'){
            moveLeft = false;
        }
    }) 

    //jump1 detection

    document.addEventListener('keydown', event => {
        if (event.code !== 'Space') {return;}
  
        if (rectY >= floor) {
            jump = true
            startTime = performance.now();
        }
    }) 

    //player2 shoot detection

    document.addEventListener('keydown', event => {
        if (event.code === 'KeyM') {
            shoot2 = true;

            if (facingRight2) {
                bulletX2 = rectX2 + 100;
                bulletY2 = rectY2;
            } else {
                bulletX2 = rectX2 - 10;
                bulletY2 = rectY2;
            }
        }
    })

    document.addEventListener('keydown', event => {
        if (event.code === 'KeyV') {
            shoot = true;

            if (facingRight1) {
                bulletX = rectX + 100;
                bulletY = rectY;
            } else {
                bulletX = rectX - 10;
                bulletY = rectY;
            }
        }
    })    

    //bullet logic

    function bullet() {

        //bullet1 ->

        if (shoot === true && facingRight1 === true) { 
            bulletX += bulletSpeed;

            ctx.fillStyle = "black";
            ctx.fillRect(bulletX, bulletY, 15, 15); 

            ctx.fillStyle = "blue";
            ctx.fillRect(bulletX - 125, bulletY, 15, 15);
        } else if (shoot === true && facingRight1 === false) {
            bulletX -= bulletSpeed;

            ctx.fillStyle = "black";
            ctx.fillRect(bulletX, bulletY, 15, 15); 

            ctx.fillStyle = "blue";
            ctx.fillRect(bulletX + 125, bulletY, 15, 15);
        }

        //bullet2 ->

        if (shoot2 === true && facingRight2 === true) { 
            bulletX2 += bulletSpeed;

            ctx.fillStyle = "blue";
            ctx.fillRect(bulletX2 - 125, bulletY2, 15, 15);

            ctx.fillStyle = "black";
            ctx.fillRect(bulletX2, bulletY2, 15, 15); 
        } else if (shoot2 === true && facingRight2 === false) {
            bulletX2 -= bulletSpeed;

            ctx.fillStyle = "black";
            ctx.fillRect(bulletX2, bulletY2, 15, 15); 

            ctx.fillStyle = "blue";
            ctx.fillRect(bulletX2 + 125, bulletY2, 15, 15);
        }


        if (bulletX2 >= 1400) {
            shoot2 = false;
            bulletX2 = rectX2 + 100;
        } else if (bulletX2 <= -110) {
            shoot2 = false;
        }

        if (bulletX >= 1400) {
            shoot = false;
            bulletX = rectX + 100;
        } else if (bulletX <= -110) {
            shoot = false;
        }
    }

    //gameloop, main function

    function gameLoop() {

        bullet()

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
            if (rectX2 <= 700 && moveRight2 == true && rectX2 >= rectX + 96 && rectY2 - 20 <= rectY ) {
                rectX2 += speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX2 - 100, rectY2, 100, 100);
            }
        } if (rectX2 >= rectX + 100){
            if (rectX2 >= 0 && moveLeft2 == true && rectX2 >= rectX + 100 && rectY2 - 20 <= rectY) {
                rectX2 -= speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX2 + 100, rectY2, 100, 100);
            } 
        } else {
            if (rectX2 >= 0 && moveLeft2 == true && rectX2 <= rectX && rectY2 - 20 <= rectY) {
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

        if (rectX + 100 <= rectX2) { //if red box left of green box
            if (rectX <= 700 && moveRight == true && rectX + 100 <= rectX2 && rectY - 20 <= rectY2) { //moving right
                rectX += speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX - 100, rectY, 100, 100);
            }
        } else {
            if (rectX <= 700 && moveRight == true && rectX >= rectX2 + 96 && rectY - 20 <= rectY2) {
                rectX += speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX - 100, rectY, 100, 100);
            }
        } if (rectX >= rectX2 + 100){
            if (rectX >= 0 && moveLeft == true && rectX >= rectX2 + 100 && rectY - 20 <= rectY2) {
                rectX -= speed;
                ctx.fillStyle = "blue";
                ctx.fillRect(rectX + 100, rectY, 100, 100);
            } 
        } else {
            if (rectX >= 0 && moveLeft == true && rectX <= rectX2 && rectY - 20 <= rectY2) {
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
        
        animationId = requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}); 



