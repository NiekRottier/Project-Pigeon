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

        this.shootBullet()
    }


    createPigeon()
    {
        let pigeon = document.createElement("pigeon")
        gameElement.appendChild(pigeon)

        pigeon.style.transform = `translate(${this.pigeonX}px, ${this.pigeonY}px)`
    }

    shootBullet()
    {
        let bullet = document.createElement("bullet")
        gameElement.appendChild(bullet)

        bullet.style.transform = `translate(${this.pigeonX}px, ${this.pigeonY}px)`

        let changeX = this.calculateDirection("changeX")
        let changeY = this.calculateDirection("changeY")
        let airtime = this.calculateDirection("airtime")

        console.log(changeX, changeY, airtime);
        

        let bulletX = this.pigeonX
        let bulletY = this.pigeonY

        console.log(bulletX, bulletY);
        

        for (let i = 0; i < airtime; i++) 
        {
            requestAnimationFrame(frame)
        }
        function frame(){
            bulletX += changeX
            bulletY += changeY

            console.log(bulletX, bulletY);

            bullet.style.transform = `translate(${bulletX}px, ${bulletY}px)`
        }
    }

    calculateDirection(requestedVar : string)
    {
        // Get target coords
        let targetX = 300 //Player.getX()
        let targetY = 300 //Player.getY()

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
        let airtime : number = (this.range / this.bulletspeed) * 1000

        // Calc change per 1 airtime
        let changeX : number = A / airtime
        let changeY : number = B / airtime
        
        return eval(requestedVar) // return the requested variable
    }
}