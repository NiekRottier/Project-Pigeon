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

    doors : Door[] = []
    doorsLocked : boolean = true

    constructor(doorN : boolean, doorE : boolean, doorS : boolean, doorW : boolean, amountOfPigeons : number) 
    {
        console.log(`Game was created!`)

        // Create doors
        if (doorN === true){
            this.doors.push(new Door("North"))
        }

        if (doorE === true){
            this.doors.push(new Door("East"))
        }

        if (doorS === true){
            this.doors.push(new Door("South"))        
        }

        if (doorW === true){
            this.doors.push(new Door("West"))
        }
        
        this.player = new Player(290, this)

        // Create X new pigeons
        for (let i = 0; i < amountOfPigeons; i++) {
            this.pigeons.push(new Pigeon(this, this.player))
        }

        // Create a bullet every reloadspeed
        for (let i = 0; i < this.pigeons.length; i++) {
            setInterval(this.pigeons[i].createBullet, this.pigeons[i].getReload())
        }

        this.gameLoop()
    }

    gameLoop = () =>
    {
        if (this.player) { this.player.update() }
        if (this.pigeons) { this.pigeons.forEach(pigeon => { pigeon.update() }) }

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
            for (let index = 0; index < this.pigeons.length; index++) {

                // Check for collisions between bullets from player and the pigeons
                if (this.checkCollision(bulletPlayer.getRectangle(), this.pigeons[index].getRectangle())) {
                    
                    // Remove bullet element
                    let bulletPlayerDiv = bulletPlayer.getDiv()
                    bulletPlayerDiv.parentElement?.removeChild(bulletPlayerDiv)

                    this.pigeons[index].setHealth(-bulletPlayer.getDamage())

                    if (this.pigeons[index].getHealth() === 0) {
                        console.log("Pigeon dies")

                        // Remove pigeon element
                        let pigeonDiv = this.pigeons[index].getDiv()
                        pigeonDiv.parentElement?.removeChild(pigeonDiv)

                        // Remove pigeon from array pigeons[]
                        this.pigeons.splice(index, 1)
                    }
                }
            }
            if (this.player) {bulletPlayer.update()}
        })


        // Door check
        if (this.pigeons.length === 0 && this.doorsLocked === true) {
            // Open doors
            console.log(`Opening doors`)
            this.doorsLocked = false
        }

        // Check if doors are unlocked
        if (this.doorsLocked === false) {

            for (let i = 0; i < this.doors.length; i++) {
                // Check for collision between player and door
                if (this.checkCollision(this.player.getRectangle(), this.doors[i].getRectangle())) {
                    console.log("Player just teleported")

                    // North door
                    if (i === 0) {
                        console.log(`North door`);
                        
                        this.player.setX(287)
                        this.player.setY(529)
                    }

                    // East door
                    if (i === 1) {
                        console.log(`East door`);
                        
                        this.player.setX(31)
                        this.player.setY(280)
                    }

                    // South door
                    if (i === 2) {
                        console.log(`South door`);
                        
                        this.player.setX(287)
                        this.player.setY(31)
                    }

                    // West door
                    if (i === 3) {
                        console.log(`West door`);
                        
                        this.player.setX(542)
                        this.player.setY(280)
                    }
                }
            }
        }

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
window.addEventListener("load", () => new Game(true, true, true, true, 3))
