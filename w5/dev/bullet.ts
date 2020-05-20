class Bullet 
{
    private div : HTMLElement

    private x : number
    private y : number

    pigeon : Pigeon
    player : Player
    bullet : Bullet

    constructor() 
    {
        
    }

    createBullet = (x : number, y : number) =>
    {
        this.x = x
        this.y = y

        // Create a bullet and append it to the gametag
        this.div = document.createElement("bullet")
        gameElement.appendChild(this.div)
        
        // Put the bullet at the coords x and y
        this.div.style.transform = `translate(${x}px, ${y}px)`
        console.log(`Bullet was created!`)

        this.shootBullet()
    }

    shootBullet = () =>
    {  
        // Set bulletOrigin to calculate travelled distance
        const bulletOriginX = this.x
        const bulletOriginY = this.y

        // Get numbers from calculatedirection()
        let changes = this.calculateDirection()
        const changeX = changes[0]
        const changeY = changes[1]
        
        // Set the startpoint of the bullet at the pigeons position 
        let bulletX = this.x
        let bulletY = this.y
        //console.log(`old bulletX = ${bulletX}, old bulletY = ${bulletY}`);


        // Damage
        //let damage = pigeon.getDamage()

        // Initializing some variables that are used in the function frame()
        let distance : number
        let dX : number
        let dY : number

        // id is used to stop the animation
        let id : any

        // Used for changing the bullet his position
        let thisDiv = this.div

        /**
         * Each execution of the function is a frame of the bullet flying
         */
        function frame() 
        {
            // New x and y position MOET MEERDERE KEREN WORDEN UITGEVOERD
            bulletX += changeX
            bulletY += changeY
            //console.log(`new bulletX = ${bulletX}, new bulletY = ${bulletY}`);

            // Difference between origin and new position om the x- and y-axis
            dX = bulletOriginX - bulletX
            dY = bulletOriginY - bulletY
    
            // Diagonal distance travelled
            distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
            console.log(`distance = ${distance}`)

            // If the bullet is past max range
            if (distance <= 500 ) 
            {
                // Move the bullet to the new position
                thisDiv.style.transform = `translate(${bulletX}px, ${bulletY}px)`

                requestAnimationFrame(frame)
            } 
            else
            {
                // Cancel the animation
                cancelAnimationFrame(id)
                // Remove the bullet
                thisDiv.parentNode?.removeChild(thisDiv)
            }    
        }
        frame()
        
    }

    /**
     * Calculates everything
     */
    private calculateDirection = () =>
        {
        // Get target coords
        let targetX = 300//this.player.getX()
        let targetY = 300//this.player.getY()
        //console.log(`targetX = ${targetX}`);
        

        // Get bullet coords
        let bulletX = this.x
        let bulletY = this.y
        //console.log(`bulletX = ${bulletX}, bulletY = ${bulletY}`);
        
        // Calc delta X and Y
        let dX = targetX - bulletX
        let dY = targetY - bulletY
        //console.log(`dX = ${dX}`);
        
        // Calc diagonal Z
        let Z = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
        //console.log(`Z = ${Z}`);
        
        // Calc A and B
        let range = 500//pigeon.getRange()
        let A = (dX / Z) * range 
        let B = (dY / Z) * range
        //console.log(`A = ${A}`);
        

        // Calc airtime 5s = 300 frames
        let bulletSpeed = 100//pigeon.getBulletSpeed()
        let airtime : number = (range / bulletSpeed) * 60
        //console.log(`bulletSpeed = ${bulletSpeed}, airtime = ${airtime}`)

        // Calc change per 1 airtime
        let changeX : number = A / airtime
        let changeY : number = B / airtime
        //console.log(`changeX = ${changeX}, changeY = ${changeY}`);
        
        return [changeX, changeY]
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

    // public getRectangle = () =>
    // {
    //     return this.div.getBoundingClientRect()
    // }
}