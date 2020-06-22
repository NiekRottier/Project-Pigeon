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
    player : Player[] = []

    doors : Door[] = []
    doorsLocked : boolean = true

    constructor(doorN : boolean, doorE : boolean, doorS : boolean, doorW : boolean, amountOfPigeons : number, playerX : number, playerY : number) 
    {
        console.log(`Game was created!`)

        // Create doors
        this.doors.push(new Door("North", doorN))
        
        this.doors.push(new Door("East", doorE))
       
        this.doors.push(new Door("South", doorS))        
       
        this.doors.push(new Door("West", doorW))
        
        // Create player
        this.player.push( new Player(this, playerX, playerY) )
        
        

        // Create X new pigeons
        for (let i = 0; i < amountOfPigeons; i++) {
            this.pigeons.push(new Pigeon(this, this.player[0]))
        }

        // Create a bullet every reloadspeed
        for (let i = 0; i < this.pigeons.length; i++) {
            setInterval(this.pigeons[i].createBullet, this.pigeons[i].getReload())
        }

        this.gameLoop()
    }

    gameLoop = () =>
    {   
        if (this.player[0]) { this.player[0].update() }
        if (this.pigeons) { this.pigeons.forEach(pigeon => { pigeon.update() }) }

        this.bulletsPigeon.forEach(bulletPigeon => { 
            // Check for collisions between bullets from pigeons and the player
            if (this.checkCollision(bulletPigeon.getRectangle(), this.player[0].getRectangle())) {

                // Remove bullet element
                let bulletPigeonDiv = bulletPigeon.getDiv()
                bulletPigeonDiv.parentElement?.removeChild(bulletPigeonDiv)

                this.player[0].setHealth(-bulletPigeon.getDamage())

                // Remove heart from display 
                let healthdisplay = <HTMLElement>document.getElementsByTagName("health")[0]
                let removeOneHeart = healthdisplay.clientWidth-27
                // If removeOneHeart is less than 0, set it to 0. The width can't be less than 0
                if (removeOneHeart < 0) { removeOneHeart = 0 }
                healthdisplay.style.width = `${removeOneHeart}px`

                if (this.player[0].getHealth() === 0) {
                    console.log("Player dies")

                    // Remove player element
                    let playerDiv = this.player[0].getDiv()
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
            if (this.player[0]) {bulletPlayer.update()}
        })


        // Door check
        if (this.pigeons.length === 0 && this.doorsLocked === true) {
            // Open doors
            console.log(`Opening doors`)
            this.doorsLocked = false
        }

        // Check if doors are unlocked
        if (this.doorsLocked === false) {

            let background = <HTMLElement>document.getElementsByTagName("background")[0]

            // Spawnroom doors
            if (background.classList.contains("spawn")) 
            {    
                this.enterNewRoom("N", "spawn", "room4", false, true, true, true)
                
                this.enterNewRoom("S", "spawn", "room8", true, true, false, false)

                this.enterNewRoom("W", "spawn", "room1", true, true, false, true)
            }

            // Room 1 doors
            else if (background.classList.contains("room1")) 
            {
                this.enterNewRoom("N", "room1", "room3", true, true, false, false)

                this.enterNewRoom("E", "room1", "spawn", true, false, true, true)

                this.enterNewRoom("W", "room1", "room2", false, true, false, false)
            }

            // Room 2 doors
            else if (background.classList.contains("room2")) 
            {
                this.enterNewRoom("E", "room2", "room1", true, true, false, true)
            }

            // Room 3 doors
            else if (background.classList.contains("room3")) 
            {
                this.enterNewRoom("N", "room3", "shop", false, false, true, false)

                this.enterNewRoom("E", "room3", "room4", false, true, true, true)

                this.enterNewRoom("S", "room3", "room1", true, true, false, true)
            }

            // Room 4 doors
            else if (background.classList.contains("room4")) 
            {
                this.enterNewRoom("E", "room4", "room5", false, true, false, true)

                this.enterNewRoom("S", "room4", "spawn", true, false, true, true)

                this.enterNewRoom("W", "room4", "room3", true, true, true, false)
            }

            // Room 5 doors
            else if (background.classList.contains("room5")) 
            {
                this.enterNewRoom("E", "room5", "room6", false, false, true, true)

                this.enterNewRoom("W", "room5", "room4", false, true, true, true)
            }

            // Room 6 doors
            else if (background.classList.contains("room6")) 
            {
                this.enterNewRoom("S", "room6", "room7", true, false, true, false)

                this.enterNewRoom("W", "room6", "room5", false, true, false, true)
            }

            // Room 7 doors
            else if (background.classList.contains("room7")) 
            {
                this.enterNewRoom("N", "room7", "room6", false, false, true, true)

                this.enterNewRoom("S", "room7", "room10", true, false, true, true)
            }

            // Room 8 doors
            else if (background.classList.contains("room8")) 
            {
                this.enterNewRoom("N", "room8", "spawn", true, false, true, true)

                this.enterNewRoom("E", "room8", "room9", false, true, true, true)
            }

            // Room 9 doors
            else if (background.classList.contains("room9")) 
            {
                this.enterNewRoom("E", "room9", "room10", true, false, true, true)

                this.enterNewRoom("S", "room9", "room11", true, true, true, false)
            }

            // Room 10 doors
            else if (background.classList.contains("room10")) 
            {
                this.enterNewRoom("N", "room10", "room7", true, false, true, false)

                this.enterNewRoom("S", "room10", "room12", true, false, false, true)

                this.enterNewRoom("W", "room10", "room9", false, true, true, true)
            }

            // Room 11 doors
            else if (background.classList.contains("room11")) 
            {
                this.enterNewRoom("N", "room11", "room9", false, true, true, true)

                this.enterNewRoom("E", "room11", "room12", true, false, false, true)

                this.enterNewRoom("S", "room11", "bossroom", true, false, false, false)
            }

            // Room 12 doors
            else if (background.classList.contains("room12")) 
            {
                this.enterNewRoom("N", "room12", "room10", true, false, true, true)

                this.enterNewRoom("W", "room12", "room11", true, true, true, false)
            }

            // Shop doors
            else if (background.classList.contains("shop")) 
            {
                this.enterNewRoom("S", "shop", "room3", true, true, true, false)
            }

            // Bossroom doors
            else if (background.classList.contains("bossroom")) 
            {
                this.enterNewRoom("N", "bossroom", "room11", true, true, true, false)
            }
        }

        requestAnimationFrame(() => this.gameLoop())
    }

    enterNewRoom = (direction : string, currentRoom : string, newRoom : string, 
        newRoomDoorN : boolean, newRoomDoorE : boolean, newRoomDoorS : boolean, newRoomDoorW : boolean) =>
    {

        let background = <HTMLElement>document.getElementsByTagName("background")[0]
        let doorN = <HTMLElement>document.getElementsByTagName("doorN")[0]
        let doorE = <HTMLElement>document.getElementsByTagName("doorE")[0]
        let doorS = <HTMLElement>document.getElementsByTagName("doorS")[0]
        let doorW = <HTMLElement>document.getElementsByTagName("doorW")[0]

        let amountOfPigeons = 1
        if (newRoom === "spawn" || newRoom === "shop" || newRoom === "bossroom") { amountOfPigeons = 2 }

        // North door
        if (direction === "N") { 
            // If doorN exists
            if (doorN) {
                // Check for collision between player and door
                if (this.checkCollision(this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                    console.log(`North door to ${newRoom}`);
                    
                    this.removeDoorBulletPlayerGame()
            
                    // Load new background
                    background.classList.remove(currentRoom)
                    background.classList.add(newRoom)

                    // Create a new Game
                    new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, 287, 527)
                }
            }
        }

        // East door
        if (direction === "E") { 
            // If doorE exists
            if (doorE) {
                // Check for collision between player and door
                if (this.checkCollision(this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                    console.log(`East door to ${newRoom}`);
                    
                    this.removeDoorBulletPlayerGame()
            
                    // Load new background
                    background.classList.remove(currentRoom)
                    background.classList.add(newRoom)

                    // Create a new Game
                    new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, 33, 280)
                }
            }
        }
        
        // South door
        if (direction === "S") { 
            // If doorS exists
            if (doorS) {
                // Check for collision between player and door
                if (this.checkCollision(this.player[0].getRectangle(), doorS.getBoundingClientRect())) {
                    console.log(`South door to ${newRoom}`);
                    
                    this.removeDoorBulletPlayerGame()
            
                    // Load new background
                    background.classList.remove(currentRoom)
                    background.classList.add(newRoom)

                    // Create a new Game
                    new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, 287, 33)
                }
            }
        }
        
        // West door
        if (direction === "W") { 
            // If doorW exists
            if (doorW) {
                // Check for collision between player and door
                if (this.checkCollision(this.player[0].getRectangle(), doorW.getBoundingClientRect())) {
                    console.log(`East door to ${newRoom}`);

                    this.removeDoorBulletPlayerGame()
            
                    // Load new background
                    background.classList.remove(currentRoom)
                    background.classList.add(newRoom)

                    // Create a new Game
                    new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, 540, 280)
                }
            }
        }
    }

    removeDoorBulletPlayerGame = () =>
    {
        // Remove current doors
        this.doors.forEach(door => {
            if (door.div) {
                door.div.remove()
            }
        })
        
        // Remove all pigeonBullets
        this.bulletsPigeon.forEach(bulletsPigeon => {
            let bulletElement = bulletsPigeon.getDiv()
            if (bulletElement) {
                bulletElement.parentElement?.removeChild(bulletElement)
            }
        })
        
        // Remove all playerBullets
        this.bulletsPlayer.forEach(bulletsPlayer => {
            let bulletElement = bulletsPlayer.getDiv()
            if (bulletElement) {
                bulletElement.parentElement?.removeChild(bulletElement)
            }
        })
                    
        // Remove player element
        let playerDiv = this.player[0].getDiv()
        playerDiv.parentElement?.removeChild(playerDiv)
                    
        delete(this.player[0].div)
                    
        // Remove player for this.player
        this.player.splice(0, 1)
                    
        // Remove game from games
        games.splice(0, 1)
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

let games : Game[] = []

// Create a new game when the page is loaded
window.addEventListener("load", () => games.push( new Game(true, false, true, true, 0, 300, 300) ))
