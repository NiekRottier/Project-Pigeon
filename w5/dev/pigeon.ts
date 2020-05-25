class Pigeon {

    private div : HTMLElement

    //private health = 3
    private range = 500 //px
    //private reload = 1 //sec
    private damage = 1
    private bulletSpeed = 100 //px/sec
    //private speed = 0.8 //?

    player : Player

    public getRange = () : number => {
        return this.range
    }

    public getBulletSpeed = () : number => {
        return this.bulletSpeed
    }

    public getDamage = () : number => {
        return this.damage
    }

    constructor()
    {
        this.createPigeon()
    }

    createPigeon = () =>
    {
        // Give a random x and y position
        let x = randomPosition()
        let y = randomPosition()

        // Create a pigeon and append it to the gametag
        this.div = document.createElement("pigeon")
        gameElement.appendChild(this.div)

        // Put the birdy at the random x and y position
        this.div.style.transform = `translate(${x}px, ${y}px)`
        
        // On click create a bullet at the pigeons position
        this.div.addEventListener("click", () => this.createBullet(x, y))
    } 

    // BULLET

    private bulletDiv : HTMLElement

    private bulletX : number
    private bulletY : number
    private bulletOriginX : number
    private bulletOriginY : number

    changeX : number
    changeY : number

    numOfBullets : number = 0 

    createBullet(x : number, y : number) 
    {
        this.bulletOriginX = this.bulletX = x
        this.bulletOriginY = this.bulletY = y

        this.calculateDirection()

        // Create a bullet and append it to the gametag
        this.bulletDiv = document.createElement("bullet")
        gameElement.appendChild(this.bulletDiv)
        
        // Put the bullet at the coords x and y
        this.bulletDiv.style.transform = `translate(${x}px, ${y}px)`
        console.log(`Bullet was created!`)


        this.numOfBullets++
    }

    public bulletUpdate = () => 
    {
        // console.log(`changeX = ${changeX}, changeY = ${changeY}`);
        

        let newX = this.bulletX + this.changeX
        let newY = this.bulletY + this.changeY
        //console.log(`newX = ${newX}, newY = ${newY}`)

        // Difference between origin and new position
        let dX = this.bulletOriginX - newX
        let dY = this.bulletOriginY - newY
        //console.log(`bulletOriginX = ${this.bulletOriginX}, bulletOriginY = ${this.bulletOriginY}`);
        
        //console.log(`dX = ${dX}, dY = ${dY}`);
        

        let distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))

        if (distance < this.getRange()) 
        { //Also collisions
            
            this.bulletX = newX
            this.bulletY = newY

            // Move the bullet to the new position
            this.bulletDiv.style.transform = `translate(${this.bulletX}px, ${this.bulletY}px)`
            
        } else 
        {
            console.log(distance);
            
            console.log("TEST remove bullet");
            // Remove the bullet
            this.bulletDiv.parentNode?.removeChild(this.bulletDiv)

            this.numOfBullets--
        }
    }

    /**
     * Sets changeX and changeY
     */
    private calculateDirection = () =>
        {
        // Get target coords
        let targetX = 300//this.player.getX()
        let targetY = 300//this.player.getY()
        //console.log(`targetX = ${targetX}`);
        

        // Get bullet coords
        let bulletX = this.bulletX
        let bulletY = this.bulletY
        //console.log(`bulletX = ${bulletX}, bulletY = ${bulletY}`);
        
        // Calc delta X and Y
        let dX = targetX - bulletX
        let dY = targetY - bulletY
        //console.log(`dX = ${dX}`);
        
        // Calc diagonal Z
        let Z = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
        //console.log(`Z = ${Z}`);
        
        // Calc A and B
        let range = this.getRange()
        let A = (dX / Z) * range 
        let B = (dY / Z) * range
        //console.log(`A = ${A}`);

        // Calc airtime 5s = 300 frames
        let bulletSpeed = this.getBulletSpeed()
        let airtime : number = (range / bulletSpeed) * 60
        //console.log(`bulletSpeed = ${bulletSpeed}, airtime = ${airtime}`)

        // Calc change per 1 airtime
        let changeX : number = A / airtime
        let changeY : number = B / airtime
        //console.log(`changeX = ${changeX}, changeY = ${changeY}`);

        this.changeX = changeX
        this.changeY = changeY
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