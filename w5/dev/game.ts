/// <reference path="player.ts"/>
/// <reference path="pigeon.ts"/>

let gameElement = document.getElementsByTagName("game")[0]


/**
 * @return number between 25 and 575
 */
function randomPosition(){
    return Math.floor(Math.random() * 550 + 25)
}

class Game {

    pigeons : Pigeon[] = []
    bullets : Bullet[] = []
    player : Player

    constructor() 
    {
        console.log(`Game was created!`)
        for (let i = 0; i < 4; i++) {
            this.pigeons.push(new Pigeon())
        }
        
        for (let i = 0; i < this.pigeons.length; i++) 
        {
            // On click create a bullet at the pigeons position
            this.pigeons[i].getDiv().addEventListener("click", () => { 
                this.bullets.push(new Bullet(this.pigeons[i].getX(), this.pigeons[i].getY(), this.player.getX(), this.player.getY(), 
                this.pigeons[i].getRange(), this.pigeons[i].getBulletSpeed())); this.pigeons[i].addBullet()
            })
        }

        this.player = new Player()

        this.gameLoop()
    }

    gameLoop = () =>
    {
        for (let i = 0; i < this.pigeons.length; i++) {
            for (let index = 0; index < this.bullets.length; index++) {
                if (this.pigeons[i].getNumOfBullets() > 0) 
                {
                    //console.log(this.pigeons[i].getNumOfBullets());
                    
                    if (this.checkCollision(this.bullets[index].getRectangle(), 
                    this.player.getRectangle()) === false) 
                    {
                        this.bullets[index].update()
                    }
                }
            }
            
        }
        
        requestAnimationFrame(()=>this.gameLoop())
    }
    
    /**
     * Checks for collisions between two rectangles and doesn't work and I don't get it (yet, hopefully)
     * 
     * @param a 
     * @param b 
     */
    checkCollision = (a: ClientRect, b: ClientRect) =>
    {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}

// Create a new game when the page is loaded
window.addEventListener("load", () => new Game())
