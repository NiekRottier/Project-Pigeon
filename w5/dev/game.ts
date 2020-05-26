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
    player : Player

    constructor() 
    {
        console.log(`Game was created!`)
        for (let i = 0; i < 4; i++) {
            this.pigeons.push(new Pigeon())
        }

        this.player = new Player()

        this.gameLoop()
    }

    gameLoop = () =>
    {
        for (let i = 0; i < this.pigeons.length; i++) {
            if (this.pigeons[i].numOfBullets > 0 && this.checkCollision(this.pigeons[i].getRectangleBullet(), this.player.getRectangle()) === false) 
            {
                this.pigeons[i].bulletUpdate()
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
