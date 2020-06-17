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
            let doorN = <HTMLElement>document.getElementsByTagName("doorN")[0]
            let doorE = <HTMLElement>document.getElementsByTagName("doorE")[0]
            let doorS = <HTMLElement>document.getElementsByTagName("doorS")[0]
            let doorW = <HTMLElement>document.getElementsByTagName("doorW")[0]

            // Spawnroom doors
            if (background.classList.contains("spawn")) 
            {    
                // If doorN exists
                if (doorN) {
                    // Check for collision between player and door
                    if (this.checkCollision(this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                        console.log(`North door`);
                        
                        // Remove current doors
                        this.doors.forEach(door => {
                            if (door.div) {
                                door.div.remove()
                            }
                        })

                        // Load new background
                        background.classList.remove("spawn")
                        background.classList.add("room4")

                        // Remove player element
                        let playerDiv = this.player[0].getDiv()
                        playerDiv.parentElement?.removeChild(playerDiv)

                        // Remove player for this.player
                        this.player.splice(0, 1)
    
                        // Create a new Game
                        new Game(false, true, true, true, 1, 287, 529)
                    }
                }
                
                // If doorS exists
                if (doorS) {
                    // Check for collision between player and door
                    if (this.checkCollision(this.player[0].getRectangle(), doorS.getBoundingClientRect())) {
                        console.log(`South door`);
                        
                        // Remove current doors
                        this.doors.forEach(door => {
                            if (door.div) {
                                door.div.remove()
                            }
                        })

                        // Load new background
                        background.classList.remove("spawn")
                        background.classList.add("room8")

                        // Remove player element
                        let playerDiv = this.player[0].getDiv()
                        playerDiv.parentElement?.removeChild(playerDiv)

                        // Remove player for this.player
                        this.player.splice(0, 1)
    
                        // Create a new Game
                        new Game(true, true, false, false, 1, 287, 31)
                    }
                }
                
                // If doorW exists
                if (doorW) {
                    // Check for collision between player and door
                    if (this.checkCollision(this.player[0].getRectangle(), doorW.getBoundingClientRect())) {
                        console.log(`West door`);
                        
                        // Remove current doors
                        this.doors.forEach(door => {
                            if (door.div) {
                                door.div.remove()
                            }
                        })

                        // Load new background
                        background.classList.remove("spawn")
                        background.classList.add("room1")

                        // Remove player element
                        let playerDiv = this.player[0].getDiv()
                        playerDiv.parentElement?.removeChild(playerDiv)

                        // Remove player for this.player
                        this.player.splice(0, 1)

                        // Create a new Game
                        new Game(true, true, false, true, 1, 542, 280)
                    }
                }
            }

            // Room 1 doors
            else if (background.classList.contains("room1")) 
            {
                // If doorN exists
                if (doorN) {
                    // Check for collision between player and door
                    if (this.checkCollision(this.player[0].getRectangle(), 
                    doorN.getBoundingClientRect())) {
                        console.log(`North door`);
                        
                        // Remove current doors
                        this.doors.forEach(door => {
                            if (door.div) {
                                door.div.remove()
                            }
                        })

                        // Load new background
                        background.classList.remove("room1")
                        background.classList.add("room3")

                        // Remove player element
                        let playerDiv = this.player[0].getDiv()
                        playerDiv.parentElement?.removeChild(playerDiv)

                        // Remove player for this.player
                        this.player.splice(0, 1)

                        // Create a new Game
                        new Game(true, true, true, false, 0, 287, 529)
                    }
                }

                // If doorE exists
                if (doorE) {
                    // Check for collision between player and door
                    if (this.checkCollision(this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                        console.log(`East door`);
                            
                        // Remove current doors
                        this.doors.forEach(door => {
                            if (door.div) {
                                door.div.remove()
                            }
                        })

                        // Load new background
                        background.classList.remove("room1")
                        background.classList.add("spawn")

                        // Remove player element
                        let playerDiv = this.player[0].getDiv()
                        playerDiv.parentElement?.removeChild(playerDiv)

                        // Remove player for this.player
                        this.player.splice(0, 1)

                        // Create a new Game
                        new Game(true, false, true, true, 0, 31, 280)
                    }
                }
                
                // If doorW exists
                if (doorW) {
                    // Check for collision between player and door
                    if (this.checkCollision(this.player[0].getRectangle(), 
                    doorW.getBoundingClientRect())) {
                        console.log(`West door`);
                        
                        // Remove current doors
                        this.doors.forEach(door => {
                            if (door.div) {
                                door.div.remove()
                            }
                        })

                        // Load new background
                        background.classList.remove("room1")
                        background.classList.add("room2")

                        // Remove player element
                        let playerDiv = this.player[0].getDiv()
                        playerDiv.parentElement?.removeChild(playerDiv)

                        // Remove player for this.player
                        this.player.splice(0, 1)

                        // Create a new Game
                        new Game(false, true, false, false, 0, 542, 280)
                    }
                }
            }

            // Room 2 doors
            else if (background.classList.contains("room2")) 
            {
                // If doorE exists
                if (doorE) {
                    // Check for collision between player and door
                    if (this.checkCollision(this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                        console.log(`East door`);
                            
                        // Remove current doors
                        this.doors.forEach(door => {
                            if (door.div) {
                                door.div.remove()
                            }
                        })

                        // Load new background
                        background.classList.remove("room2")
                        background.classList.add("room1")

                        // Remove player element
                        let playerDiv = this.player[0].getDiv()
                        playerDiv.parentElement?.removeChild(playerDiv)

                        // Remove player for this.player
                        this.player.splice(0, 1)

                        // Create a new Game
                        new Game(false, false, false, true, 0, 31, 280)
                    }
                }
            }

            // Room 3 doors
            else if (background.classList.contains("room3")) 
            {
                // If doorN exists
                if (doorN) {
                    // Check for collision between player and door
                    if (this.checkCollision(this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                        console.log(`North door`);
                        
                        // Remove current doors
                        this.doors.forEach(door => {
                            if (door.div) {
                                door.div.remove()
                            }
                        })

                        // Load new background
                        background.classList.remove("room3")
                        background.classList.add("shop")

                        // Remove player element
                        let playerDiv = this.player[0].getDiv()
                        playerDiv.parentElement?.removeChild(playerDiv)

                        // Remove player for this.player
                        this.player.splice(0, 1)

                        // Create a new Game
                        new Game(false, false, true, false, 0, 287, 529)
                    }
                }

                // If doorE exists
                if (doorE) {
                    // Check for collision between player and door
                    if (this.checkCollision(this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                        console.log(`East door`);
                            
                        // Remove current doors
                        this.doors.forEach(door => {
                            if (door.div) {
                                door.div.remove()
                            }
                        })

                        // Load new background
                        background.classList.remove("room3")
                        background.classList.add("room4")

                        // Remove player element
                        let playerDiv = this.player[0].getDiv()
                        playerDiv.parentElement?.removeChild(playerDiv)

                        // Remove player for this.player
                        this.player.splice(0, 1)

                        // Create a new Game
                        new Game(false, true, true, true, 0, 31, 280)
                    }
                }
                
                // If doorS exists
                if (doorS) {
                    // Check for collision between player and door
                    if (this.checkCollision(this.player[0].getRectangle(), doorS.getBoundingClientRect())) {
                        console.log(`South door`);
                        
                        // Remove current doors
                        this.doors.forEach(door => {
                            if (door.div) {
                                door.div.remove()
                            }
                        })

                        // Load new background
                        background.classList.remove("room3")
                        background.classList.add("spawn")

                        // Remove player element
                        let playerDiv = this.player[0].getDiv()
                        playerDiv.parentElement?.removeChild(playerDiv)

                        // Remove player for this.player
                        this.player.splice(0, 1)

                        // Remove game from games
                        games.splice(0, 1)

                        // Create a new Game
                        new Game(true, false, true, true, 0, 287, 31)
                    }
                }
            }

            // Room 4 doors
            else if (background.classList.contains("room4")) 
            {

            }

            // Room 5 doors
            else if (background.classList.contains("room5")) 
            {

            }

            // Room 6 doors
            else if (background.classList.contains("room6")) 
            {

            }

            // Room 7 doors
            else if (background.classList.contains("room7")) 
            {

            }

            // Room 8 doors
            else if (background.classList.contains("room8")) 
            {

            }

            // Room 9 doors
            else if (background.classList.contains("room9")) 
            {

            }

            // Room 10 doors
            else if (background.classList.contains("room10")) 
            {

            }

            // Room 11 doors
            else if (background.classList.contains("room11")) 
            {

            }

            // Room 12 doors
            else if (background.classList.contains("room12")) 
            {

            }

            // Shop doors
            else if (background.classList.contains("shop")) 
            {

            }

            // Bossroom doors
            else if (background.classList.contains("bossroom")) 
            {

            }
        }

        // BASIC CODE FOR DOORS IN ALL ROOMS
        // CHANGE WHAT BACKGROUND TO REMOVE AND ADD & HOW TO SET UP THE NEW GAME CLASS
        // 
        // // If doorN exists
        // if (doorN) {
        //     // Check for collision between player and door
        //     if (this.checkCollision(this.player.getRectangle(), doorN.getBoundingClientRect())) {
        //         console.log(`North door`);
                
        //         // Remove current doors
        //         this.doors.forEach(door => {
        //             if (door.div) {
        //                 door.div.remove()
        //             }
        //         })

        //         // Load new background
        //         background.classList.remove("")
        //         background.classList.add("")

        //         // Create a new Game
        //         new Game(false, false, true, false, 0, 287, 529)
        //     }
        // }

        // // If doorE exists
        // if (doorE) {
        //     // Check for collision between player and door
        //     if (this.checkCollision(this.player.getRectangle(), doorE.getBoundingClientRect())) {
        //         console.log(`East door`);
                    
        //         // Remove current doors
        //         this.doors.forEach(door => {
        //             if (door.div) {
        //                 door.div.remove()
        //             }
        //         })

        //         // Load new background
        //         background.classList.remove("")
        //         background.classList.add("")

        //         // Create a new Game
        //         new Game(false, false, false, true, 0, 31, 280)
        //     }
        // }
        
        // // If doorS exists
        // if (doorS) {
        //     // Check for collision between player and door
        //     if (this.checkCollision(this.player.getRectangle(), doorS.getBoundingClientRect())) {
        //         console.log(`South door`);
                
        //         // Remove current doors
        //         this.doors.forEach(door => {
        //             if (door.div) {
        //                 door.div.remove()
        //             }
        //         })

        //         // Load new background
        //         background.classList.remove("")
        //         background.classList.add("")

        //         // Create a new Game
        //         new Game(true, false, false, false, 0, 287, 31)
        //     }
        // }
        
        // // If doorW exists
        // if (doorW) {
        //     // Check for collision between player and door
        //     if (this.checkCollision(this.player.getRectangle(), doorW.getBoundingClientRect())) {
        //         console.log(`West door`);
                
        //         // Remove current doors
        //         this.doors.forEach(door => {
        //             if (door.div) {
        //                 door.div.remove()
        //             }
        //         })

        //         // Load new background
        //         background.classList.remove("")
        //         background.classList.add("")

        //         // Create a new Game
        //         new Game(false, true, false, false, 0, 542, 280)
        //     }
        // }

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

let games : Game[] = []

// Create a new game when the page is loaded
window.addEventListener("load", () => games.push( new Game(true, false, true, true, 0, 300, 300) ))
