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

        new Player()

        this.gameLoop()
    }

    gameLoop = () =>
    {
            
        for (let i = 0; i < this.pigeons.length; i++) {
            if (this.pigeons[i].numOfBullets > 0) {
                console.log("check");
                
                this.pigeons[i].bulletUpdate()
            }
        }
        

        requestAnimationFrame(()=>this.gameLoop())
    }
}

// Create a new game when the page is loaded
window.addEventListener("load", () => new Game())
