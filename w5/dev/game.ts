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
    bullets : Bullet[] = []
    player : Player

    constructor() 
    {
        console.log(`Game was created!`)
        for (let i = 0; i < 3; i++) {
            this.pigeons.push(new Pigeon())
        }
        
        for (let i = 0; i < this.pigeons.length; i++) 
        {
            // On click create a bullet at every pigeons position
            window.addEventListener("click", () => { 
                this.bullets.push(new Bullet(this.pigeons[i].getX(), this.pigeons[i].getY(), this.player.getX(), this.player.getY(), 
                this.pigeons[i].getRange(), this.pigeons[i].getBulletSpeed())); this.pigeons[i].addBullet()
            })
        }

        this.player = new Player(290, 87, 83, 65, 68)

        this.gameLoop()
    }

    gameLoop = () =>
    {
        for (let i = 0; i < this.pigeons.length; i++) {

            this.pigeons[i].update()

            for (let index = 0; index < this.bullets.length; index++) {
                // If there are bullets from this bird
                if (this.pigeons[i].getNumOfBullets() > 0) 
                {
                    //console.log(this.pigeons[i].getNumOfBullets());
                    
                    // If there isn't a colision between bullets and player
                    if (this.checkCollision(this.bullets[index].getRectangle(), 
                    this.player.getRectangle()) === false) 
                    {
                        this.bullets[index].update()
                    } else
                    {
                        // Delete bullet
                        let bulletDiv = this.bullets[index].getDiv()
                        bulletDiv.parentNode?.removeChild(bulletDiv)

                        // Reduce number of bullets of the pigeon
                        this.pigeons[i].removeBullet()

                        // If the player had 1 health
                        if (this.player.getHealth() === 1) {
                            // Delete the player
                            let playerDiv = this.player.getDiv()
                            playerDiv.parentNode?.removeChild(playerDiv)
                            console.log(`PLAYER KILLED!`);
                            
                        } else
                        {
                            // Remove 1 health from the palyer
                            this.player.setHealth(this.pigeons[i].getDamage() * -1)
                            console.log(`PLAYER TOOK ${this.pigeons[i].getDamage()} DAMAGE!`);
                        }

                    }
                }
            }
        }

        this.player.update()

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
