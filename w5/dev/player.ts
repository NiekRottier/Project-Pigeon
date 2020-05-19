class Player {

    private x = 300
    private y = 300

    getX() : number 
    {
        console.log(`Player.x = ${this.x}`)
        
        return this.x
    }
    getY() : number 
    {
        console.log(`Player.y = ${this.y}`)
        
        return this.y
    }

    constructor(){
        let player = document.createElement("player")
        
        gameElement.appendChild(player)

        player.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}