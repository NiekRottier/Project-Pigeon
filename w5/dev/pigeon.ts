class Pigeon {

    //private div: HTMLElement
    
    //private name = "Pigeon"
    //private health = 2
    private range = 500 //px
    //private reload = 1  //sec
    //private damage = 1
    private bulletspeed = 100 //px/sec
    //private speed = 0.8 //?


    private pigeonX = randomPosition()
    private pigeonY = randomPosition()
    

    constructor()
    {
        this.createPigeon()
    }

    createPigeon()
    {
        let pigeon = document.createElement("pigeon")
        gameElement.appendChild(pigeon)

        pigeon.style.transform = `translate(${this.pigeonX}px, ${this.pigeonY}px)`

        this.shootBullet()
    }

    shootBullet()
    {
        let bullet = document.createElement("bullet")
        gameElement.appendChild(bullet)

        bullet.style.transform = `translate(${this.pigeonX}px, ${this.pigeonY}px)`

        let changeX = this.calculateDirection("changeX")
        let changeY = this.calculateDirection("changeY")
        let airtime = this.calculateDirection("airtime")
        let targetX = this.calculateDirection("targetX")
        let targetY = this.calculateDirection("targetY")

        console.log(changeX, changeY, airtime);
        

        const bulletOriginX = this.pigeonX
        const bulletOriginY = this.pigeonY
        let bulletX = this.pigeonX
        let bulletY = this.pigeonY

        let distance = 0
        let dX = 0
        let dY = 0

        let id : any

        console.log(bulletX, bulletY);
        frame()
    
        
        function frame(){
            bulletX += changeX
            bulletY += changeY

            dX = bulletOriginX - bulletX
            dY = bulletOriginY - bulletY

            distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))

            console.log(bulletX, bulletY, distance);

            bullet.style.transform = `translate(${bulletX}px, ${bulletY}px)`
            
            if (distance >= 500 || (Math.floor(bulletX) === targetX && Math.floor(bulletY) === targetY)) // If the bullet isn't past max range or at the target location
            {
                cancelAnimationFrame(id)
            } 
            else
            {
                requestAnimationFrame(frame)
            }
        }
    }

    /**
     * Calculates everything
     * 
     * @param requestedVar 
     * @returns requested variable
     */
    calculateDirection(requestedVar : string)
    {
        // Get target coords
        let targetX = player.getX()
        let targetY = player.getY()

        // Get bullet coords
        let bulletX = this.pigeonX
        let bulletY = this.pigeonY

        // Calc delta X and Y
        let dX = targetX - bulletX
        let dY = targetY - bulletY

        // Calc diagonal Z
        let Z = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))

        // Calc A and B
        let A = (dX / Z) * this.range 
        let B = (dY / Z) * this.range

        // Calc airtime 5s = 5000 airtime
        let airtime : number = (this.range / this.bulletspeed) * 60

        // Calc change per 1 airtime
        let changeX : number = A / airtime
        let changeY : number = B / airtime
        
        return eval(requestedVar) // return the requested variable
    }
}