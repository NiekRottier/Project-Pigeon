/// <reference path="player.ts"/>
/// <reference path="pigeon.ts"/>

let gameElement = document.getElementsByTagName("game")[0]


/**
 * @return number between 25 and 575
 */
function randomPosition(){
    return Math.floor(Math.random() * 540 + 30)
}

class Game {

    pigeons : Pigeon[] = []
    bulletsPigeon : Bullet[] = []
    bulletsPlayer : Bullet[] = []
    player : Player

    constructor() 
    {
        console.log(`Game was created!`)
        
        this.player = new Player(290, this)

        for (let i = 0; i < 3; i++) {
            this.pigeons.push(new Pigeon(this, this.player))
        }

        this.gameLoop()
    }

    gameLoop = () =>
    {
        if (this.player)    {this.player.update()}
        if (this.pigeons)   {this.pigeons.forEach(pigeon => { pigeon.update() })}

        this.bulletsPigeon.forEach(bulletPigeon => { 
            // Check for collisions between bullets from pigeons and the player
            if (this.checkCollision(bulletPigeon.getRectangle(), this.player.getRectangle())) {

                // Remove bullet element
                let bulletPigeonDiv = bulletPigeon.getDiv()
                bulletPigeonDiv.parentElement?.removeChild(bulletPigeonDiv)

                this.player.setHealth(-bulletPigeon.getDamage())

                if (this.player.getHealth() === 0) {
                    console.log("Player dies")

                    // Remove player element
                    let playerDiv = this.player.getDiv()
                    playerDiv.parentElement?.removeChild(playerDiv)
                }
            }
            bulletPigeon.update()
        })

        this.bulletsPlayer.forEach(bulletPlayer => {
            this.pigeons.forEach(pigeon => {
                // Check for collisions between bullets from player and the pigeons
                if (this.checkCollision(bulletPlayer.getRectangle(), pigeon.getRectangle())) {
                    
                    // Remove bullet element
                    let bulletPlayerDiv = bulletPlayer.getDiv()
                    bulletPlayerDiv.parentElement?.removeChild(bulletPlayerDiv)

                    pigeon.setHealth(-bulletPlayer.getDamage())

                    if (pigeon.getHealth() === 0) {
                        console.log("Pigeon dies")

                        // Remove pigeon element
                        let pigeonDiv = pigeon.getDiv()
                        pigeonDiv.parentElement?.removeChild(pigeonDiv)
                    }
                }
            })
            if (this.player) {bulletPlayer.update()}
        })

        requestAnimationFrame(() => this.gameLoop())
    }
    
    /**
     * Checks for collisions between two rectangles
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
