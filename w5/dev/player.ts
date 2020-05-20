class Player {

    private x = randomPosition()
    private y = randomPosition()

    public getX() : number 
    {
        console.log(`Player.x = ${this.x}`)
        
        return this.x
    }

    public getY() : number 
    {
        console.log(`Player.y = ${this.y}`)
        
        return this.y
    }

    constructor()
    {
        this.createPlayer()
    }

    private createPlayer()
    {
        let player = document.createElement("player") 
        gameElement.appendChild(player)

        player.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}

const player = new Player