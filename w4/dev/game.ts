/// <reference path="player.ts"/>
/// <reference path="pigeon.ts"/>
/// <reference path="godFeather.ts"/>

let gameElement = document.getElementsByTagName("game")[0]


/**
 * @return number between 25 and 575
 */
function randomPosition(){
    return Math.floor(Math.random() * 490 + 40)
}

class Game {

    pigeons : Pigeon[] = []
    bulletsPigeon : Bullet[] = []
    godFeathers : GodFeather[] = []
    bulletsGodFeather : Bullet[] = []
    bulletsPlayer : Bullet[] = []
    player : Player[] = []

    doors : Door[] = []
    doorsLocked : boolean = true

    constructor(doorN : boolean, doorE : boolean, doorS : boolean, doorW : boolean, amountOfPigeons : number, amountOfGodFeathers : number, playerX : number, playerY : number, playerhealth : number) 
    {
        console.log(`Game was created!`)

        // Create doors
        this.doors.push(new Door("North", doorN))
        
        this.doors.push(new Door("East", doorE))
       
        this.doors.push(new Door("South", doorS))        
       
        this.doors.push(new Door("West", doorW))
        
        // Create player
        this.player.push( new Player(this, playerX, playerY, playerhealth) )
        
        

        // Create X new pigeons
        for (let i = 0; i < amountOfPigeons; i++) {
            this.pigeons.push(new Pigeon(this, this.player[0]))
        }

        for (let i = 0; i < amountOfGodFeathers; i++) {
            this.godFeathers.push(new GodFeather(this, this.player[0]))
        }

        // Create a bullet every reloadspeed
        for (let i = 0; i < this.pigeons.length; i++) {
            setInterval(this.pigeons[i].createBullet, this.pigeons[i].getReload())
        }

        for (let i = 0; i < this.godFeathers.length; i++) {
            setInterval(this.godFeathers[i].createBullet, this.godFeathers[i].getReload())
        }

        this.gameLoop()
    }

    gameLoop = () =>
    {   
        if (this.player[0]) { this.player[0].update() }
        if (this.pigeons) { this.pigeons.forEach(pigeon => { pigeon.update() }) }
        if (this.godFeathers) { this.godFeathers.forEach(godFeather => { godFeather.update() }) }

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

                    // Return to menuscreen
                    
                }
            }
            bulletPigeon.update()
        })
        this.bulletsGodFeather.forEach(bulletGodFeather => { 
            // Check for collisions between bullets from godFeathers and the player
            if (this.checkCollision(bulletGodFeather.getRectangle(), this.player[0].getRectangle())) {

                // Remove bullet element
                let bulletGodFeatherDiv = bulletGodFeather.getDiv()
                bulletGodFeatherDiv.parentElement?.removeChild(bulletGodFeatherDiv)

                this.player[0].setHealth(-bulletGodFeather.getDamage())

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

                    // Return to menuscreen
                    
                }
            }
            bulletGodFeather.update()
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
        this.bulletsPlayer.forEach(bulletPlayer => {
            for (let index = 0; index < this.godFeathers.length; index++) {

                // Check for collisions between bullets from player and the godFeathers
                if (this.checkCollision(bulletPlayer.getRectangle(), this.godFeathers[index].getRectangle())) {
                    
                    // Remove bullet element
                    let bulletPlayerDiv = bulletPlayer.getDiv()
                    bulletPlayerDiv.parentElement?.removeChild(bulletPlayerDiv)

                    this.godFeathers[index].setHealth(-bulletPlayer.getDamage())

                    if (this.godFeathers[index].getHealth() === 0) {
                        console.log("GodFeather dies")

                        // Remove godFeather element
                        let godFeatherDiv = this.godFeathers[index].getDiv()
                        godFeatherDiv.parentElement?.removeChild(godFeatherDiv)

                        // Remove godFeather from array godFeathers[]
                        this.godFeathers.splice(index, 1)
                    }

                    
                }
            }
            if (this.player[0]) {bulletPlayer.update()}
        })

        // Door check
        if (this.pigeons.length === 0 && this.godFeathers.length === 0 && this.doorsLocked === true)  {
            // Open doors
            console.log(`Opening doors`)
            this.doorsLocked = false
            
        }


        // Check if doors are unlocked
        if (this.doorsLocked === false) {

            let background = <HTMLElement>document.getElementsByTagName("background")[0]

            //
            // LEVEL 1
            //



            //
            // LEVEL 2
            //
            if (background.classList.contains("spawn-2")) 
            {
                this.enterNewRoom("N", "spawn-2", "room1-2", true, false, true, true);
                this.enterNewRoom("S", "spawn-2", "room10-2", true, false, false, false);
                this.enterNewRoom("W", "spawn-2", "room3-2", false, true, false, false);                   
                
            }
            else if (background.classList.contains("room1-2")) 
            {
                this.enterNewRoom("N", "room1-2", "room4-2", true, true, true, false);                   
                this.enterNewRoom("S", "room1-2", "spawn-2", true, false, true, true);
                this.enterNewRoom("W", "room1-2", "room2-2", false, true, false, false);
            }

            else if (background.classList.contains("room2-2")) 
            {
                this.enterNewRoom("E", "room2-2", "room1-2", true, false, true, true);
            }

            else if (background.classList.contains("room3-2")) 
            {
                this.enterNewRoom("E", "room3-2", "spawn-2", true, false, true, true);
            }

            else if (background.classList.contains("room4-2")) 
            {
                this.enterNewRoom("N", "room4-2", "shop-2", false, false, true, false)
                this.enterNewRoom("E", "room4-2", "room5-2", true, false, false, true)
                this.enterNewRoom("S", "room4-2", "room1-2", true, false, true, true)
            }

            else if (background.classList.contains("room5-2")) 
            {
                this.enterNewRoom("N", "room5-2", "room6-2", true, true, true, false)
                this.enterNewRoom("W", "room5-2", "room4-2", true, true, true, false)
            }

            else if (background.classList.contains("room6-2")) 
            {
                this.enterNewRoom("N", "room6-2", "room8-2", true, false, true, false)
                this.enterNewRoom("E", "room6-2", "room7-2", false, false, false, true)
                this.enterNewRoom("S", "room6-2", "room5-2", true, false, false, true)
            }

            else if (background.classList.contains("room7-2")) 
            {
                this.enterNewRoom("W", "room7-2", "room6-2", true, true, true, false)
            }

            else if (background.classList.contains("room8-2")) 
            {
                this.enterNewRoom("N", "room8-2", "room9-2", false, true, true, false)
                this.enterNewRoom("S", "room8-2", "room6-2", true, true, true, false)
            }

            else if (background.classList.contains("room9-2")) 
            {
                this.enterNewRoom("E", "room9-2", "bossroom-2", false, true, false, true)
                this.enterNewRoom("S", "room9-2", "room8-2", true, false, true, false)
            }

            else if (background.classList.contains("room10-2")) 
            {
                this.enterNewRoom("N", "room10-2", "spawn-2", true, false, true, true)
            }

            else if (background.classList.contains("shop-2")) 
            {
                this.enterNewRoom("S", "shop-2", "room4-2", true, true, true, false)
            }

            else if (background.classList.contains("bossroom-2")) 
            {
                this.enterNewRoom("E", "bossroom-2", "spawn-3", true, false, true, true)
                this.enterNewRoom("W", "bossroom-2", "room9-2", false, true, true, false)
            }

            //
            // LEVEL 3
            //
            if (background.classList.contains("spawn-3")) 
            {    
                this.enterNewRoom("N", "spawn-3", "room4-3", false, true, true, true)                
                this.enterNewRoom("S", "spawn-3", "room8-3", true, true, false, false)
                this.enterNewRoom("W", "spawn-3", "room1-3", true, true, false, true)
            }

            else if (background.classList.contains("room1-3")) 
            {
                this.enterNewRoom("N", "room1-3", "room3-3", true, true, false, false)
                this.enterNewRoom("E", "room1-3", "spawn-3", true, false, true, true)
                this.enterNewRoom("W", "room1-3", "room2-3", false, true, false, false)
            }

            else if (background.classList.contains("room2-3")) 
            {
                this.enterNewRoom("E", "room2-3", "room1-3", true, true, false, true)
            }

            else if (background.classList.contains("room3-3")) 
            {
                this.enterNewRoom("N", "room3-3", "shop-3", false, false, true, false)
                this.enterNewRoom("E", "room3-3", "room4-3", false, true, true, true)
                this.enterNewRoom("S", "room3-3", "room1-3", true, true, false, true)
            }

            else if (background.classList.contains("room4-3")) 
            {
                this.enterNewRoom("E", "room4-3", "room5-3", false, true, false, true)
                this.enterNewRoom("S", "room4-3", "spawn-3", true, false, true, true)
                this.enterNewRoom("W", "room4-3", "room3-3", true, true, true, false)
            }

            else if (background.classList.contains("room5-3")) 
            {
                this.enterNewRoom("E", "room5-3", "room6-3", false, false, true, true)
                this.enterNewRoom("W", "room5-3", "room4-3", false, true, true, true)
            }

            else if (background.classList.contains("room6-3")) 
            {
                this.enterNewRoom("S", "room6-3", "room7-3", true, false, true, false)
                this.enterNewRoom("W", "room6-3", "room5-3", false, true, false, true)
            }

            else if (background.classList.contains("room7-3")) 
            {
                this.enterNewRoom("N", "room7-3", "room6-3", false, false, true, true)
                this.enterNewRoom("S", "room7-3", "room10-3", true, false, true, true)
            }

            else if (background.classList.contains("room8-3")) 
            {
                this.enterNewRoom("N", "room8-3", "spawn-3", true, false, true, true)
                this.enterNewRoom("E", "room8-3", "room9-3", false, true, true, true)
            }

            else if (background.classList.contains("room9-3")) 
            {
                this.enterNewRoom("E", "room9-3", "room10-3", true, false, true, true)
                this.enterNewRoom("S", "room9-3", "room11-3", true, true, true, false)
            }

            else if (background.classList.contains("room10-3")) 
            {
                this.enterNewRoom("N", "room10-3", "room7-3", true, false, true, false)
                this.enterNewRoom("S", "room10-3", "room12-3", true, false, false, true)
                this.enterNewRoom("W", "room10-3", "room9-3", false, true, true, true)
            }

            else if (background.classList.contains("room11-3")) 
            {
                this.enterNewRoom("N", "room11-3", "room9-3", false, true, true, true)
                this.enterNewRoom("E", "room11-3", "room12-3", true, false, false, true)
                this.enterNewRoom("S", "room11-3", "bossroom-3", true, false, false, false)
            }

            else if (background.classList.contains("room12-3")) 
            {
                this.enterNewRoom("N", "room12-3", "room10-3", true, false, true, true)
                this.enterNewRoom("W", "room12-3", "room11-3", true, true, true, false)
            }

            else if (background.classList.contains("shop-3")) 
            {
                this.enterNewRoom("S", "shop-3", "room3-3", true, true, true, false)
            }

            else if (background.classList.contains("bossroom-3")) 
            {
                this.enterNewRoom("N", "bossroom-3", "room11-3", true, true, true, false)
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


        let playerHealth = this.player[0].getHealth()

        let amountOfPigeons = 2
        let amountOfGodFeathers = 0
        if (newRoom === "bossroom-1" || newRoom === "bossroom-2" || newRoom === "bossroom-3") {   amountOfPigeons = 5;  
            amountOfGodFeathers = 1; }

        if (newRoom === "spawn-3") {
                amountOfPigeons = 1;  }
                
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
                    new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, amountOfGodFeathers, 287, 527, playerHealth)
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
                    new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, amountOfGodFeathers, 33, 280, playerHealth)
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
                    new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, amountOfGodFeathers, 287, 33, playerHealth)
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
                    new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, amountOfGodFeathers, 540, 280, playerHealth)
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
        this.bulletsGodFeather.forEach(bulletsGodFeather => {
            let bulletElement = bulletsGodFeather.getDiv()
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
window.addEventListener("load", () => games.push( new Game(true, false, true, true, 0, 0, 300, 300, 3) ))