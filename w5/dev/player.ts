class Player {

    private div : HTMLElement 

    private x : number = 0
     private y: number = 0

     //which key is associated to the movements? the keynumbers will be added in game.ts
     private downkey : number = 0   
     private upkey : number = 0
     private leftkey : number = 0
     private rightkey: number = 0

     //movement 'sizes'
     private downSpeed : number = 0
     private upSpeed : number = 0
     private leftSpeed : number = 0
     private rightSpeed : number = 0
    public health : number = 9

    public getDiv = () : HTMLElement => {
        return this.div
    }
    
    public getHealth = () =>
    {
        return this.health
    }

    public setHealth = (x : number) => 
    {
        this.health += x 
    }

    public getX = () =>
    {
        //console.log(`getX's x = ${this.x}`)
        return this.x
    }

    public getY = () =>
    {
        //console.log(`getY's y = ${this.y}`)
        return this.y
    }

    public getRectangle = () => 
    {
        return this.div.getBoundingClientRect()
    }

    constructor(x: number, upKey : number, downKey : number, leftKey: number, rightKey: number)
    {
        console.log("The Professor has arrived!")
        this.createPlayer()
        

        this.upkey = upKey //87, w 
        this.downkey = downKey// 83, s 
        this.leftkey = leftKey //65, a 
        this.rightkey = rightKey //68 d 
        
        if(x != 0) x -= this.div.clientWidth
        this.x = x
        this.y = 200

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp (e))
    }

    private createPlayer = () =>
    {
        // Create a player and append it to the gametag
        this.div = document.createElement("player") 
        gameElement.appendChild(this.div)
    }

    // When key is pressed
    private onKeyDown(e: KeyboardEvent): void { // if key is pressed
        switch (e.keyCode){
            case this.upkey:
                this.upSpeed = 3
                break

            case this.downkey:
                this.downSpeed = 3
                break

            case this.leftkey:
                this.leftSpeed = 3
                break
            
            case this.rightkey:
                this.rightSpeed = 3
                break
        }
    }

    // If key is released
    private onKeyUp(e: KeyboardEvent): void{     
        switch(e.keyCode){
            case this.upkey:
                this.upSpeed = 0
                break

            case this.downkey:
                this.downSpeed = 0
                break
            
            case this.leftkey:
                this.leftSpeed = 0
                break

            case this.rightkey:
                this.rightSpeed = 0
                break
        }
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

    public update()
    {    
        let newY = this.y - this.upSpeed + this.downSpeed
        let newX : number = this.x - this.leftSpeed + this.rightSpeed

        // check if the player is still in the frame
        if (newY < gameElement.clientHeight-70 && newY > 30) this.y = newY
        if (newX < gameElement.clientWidth-57 && newX > 30) this.x = newX
        
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}