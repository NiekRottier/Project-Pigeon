class Bullet 
{
    private div : HTMLElement

    private bulletX : number
    private bulletY : number
    private bulletOriginX : number
    private bulletOriginY : number

    private changeX : number
    private changeY : number

    private range : number
    private bulletSpeed : number 

    public getDiv = () : HTMLElement => {
        return this.div
    }

    constructor(originX : number, originY : number, targetX : number, targetY : number, range : number, bulletSpeed : number) {
        this.range = range
        this.bulletSpeed = bulletSpeed
        this.createBullet(originX, originY, targetX, targetY)
    }

    public getRectangle = () =>
    {
        return this.div.getBoundingClientRect()
    }

    private createBullet = (originX : number, originY : number, targetX : number, targetY : number) =>
    {
        this.bulletOriginX = this.bulletX = originX
        this.bulletOriginY = this.bulletY = originY

        //Calculate the direction of the bullet. Send the location of the center of the target
        this.calculateDirection(targetX+13.5, targetY+20)

        // Create a bullet and append it to the gametag
        this.div = document.createElement("bullet")
        gameElement.appendChild(this.div)
        
        // Put the bullet at the coords x and y
        this.div.style.transform = `translate(${originX}px, ${originY}px)`
        console.log(`Bullet was created!`)
    }

    public update = () => 
    {
        //console.log(`changeX = ${this.changeX}, changeY = ${this.changeY}`);

        let newX = this.bulletX + this.changeX
        let newY = this.bulletY + this.changeY
        //console.log(`newX = ${newX}, newY = ${newY}`)

        // Difference between origin and new position
        let dX = this.bulletOriginX - newX
        let dY = this.bulletOriginY - newY
        //console.log(`bulletOriginX = ${this.bulletOriginX}, bulletOriginY = ${this.bulletOriginY}`);
        
        //console.log(`dX = ${dX}, dY = ${dY}`);
        

        let distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
        //console.log(`distance = ${distance}`);
        

        // Check if bullet is past range
        if (this.range > distance)
        {
            this.bulletX = newX
            this.bulletY = newY

            // Move the bullet to the new position
            this.div.style.transform = `translate(${this.bulletX}px, ${this.bulletY}px)`
            
        } else 
        {   
            //console.log(`Removed bullet at ${distance}`);
            // Remove the bullet
            this.div.parentNode?.removeChild(this.div)
        }
    }

    /**
     * Sets changeX and changeY
     */
    private calculateDirection = (targetX : number, targetY : number) =>
        {
        //console.log(`targetX = ${targetX}, targetY = ${targetY}`);

        // Get bullet coords
        let bulletX = this.bulletX
        let bulletY = this.bulletY
        //console.log(`bulletX = ${bulletX}, bulletY = ${bulletY}`);
        
        // Calc delta X and Y
        let dX = targetX - bulletX
        let dY = targetY - bulletY
        //console.log(`dX = ${dX}, dY = ${dY}`);
        
        // Calc diagonal Z
        let Z = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
        //console.log(`Z = ${Z}`);
        
        // Calc A and B
        let A = (dX / Z) * this.range 
        let B = (dY / Z) * this.range
        //console.log(`range = ${this.range}`)
        //console.log(`A = ${A}, B = ${B}`);

        // Calc airtime 5s = 300 frames
        let bulletSpeed = this.bulletSpeed
        let airtime : number = (this.range / bulletSpeed) * 60
        //console.log(`bulletSpeed = ${bulletSpeed}, airtime = ${airtime}`)

        // Calc change per 1 airtime
        let changeX : number = A / airtime
        let changeY : number = B / airtime
        //console.log(`changeX = ${changeX}, changeY = ${changeY}`);

        this.changeX = changeX
        this.changeY = changeY
    }
}