class Pigeon {

    private div : HTMLElement
    
    //private name = "Pigeon"
    //private health = 2
    private range = 500 //px
    //private reload = 1  //sec
    private damage = 1
    private bulletSpeed = 100 //px/sec
    //private speed = 0.8 //?

    pigeon : Pigeon
    player : Player
    bullet : Bullet

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
        this.div.addEventListener("click", () => {let bullet = new Bullet; bullet.createBullet(x, y)})
    } 
}