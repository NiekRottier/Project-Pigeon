class Player {

    private div : HTMLElement

    private x : number = 300//randomPosition()
    private y : number = 300//randomPosition()
    public health = 3

    pigeon : Pigeon
    player : Player

    public getX = () =>
    {
        //console.log(`getX's x = ${this.x}`)
        return this.x
    }

    public getY = () : number =>
    {
        //console.log(`getY's y = ${this.y}`)
        return this.y
    }

    public getRectangle = () => 
    {
        return this.div.getBoundingClientRect()
    }

    constructor()
    {
        this.createPlayer()
    }

    private createPlayer = () =>
    {
        console.log(`Player: this.x = ${this.x}, this.y = ${this.y}`);
        

        // Create a player and append it to the gametag
        this.div = document.createElement("player") 
        gameElement.appendChild(this.div)

        // Put the player on the random x and y position
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
        //console.log( `player x = ${this.x}. player y = ${this.y}.`);
    }

    public death = () => 
    {
        if (this.health <= 2) {
            this.div.style.backgroundColor = "orange"
        } 
        else if (this.health === 1) 
        {
            this.div.style.backgroundColor = "red"
        }
        else if (this.health === 0) 
        {
            this.div.parentNode?.removeChild(this.div)
        }
    }
}