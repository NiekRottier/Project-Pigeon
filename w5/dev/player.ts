class Player {

    div : HTMLElement 

    private name : string = "Player"

    private x : number = 300
    private y : number = 300
    private range : number = 500
    private bulletSpeed : number = 300
    private damage : number = 1
    private numOfBullets : number = 0

    // Which key is associated to the movements?
    private downkey : number = 83   
    private upkey : number = 87
    private leftkey : number = 65
    private rightkey: number = 68

    // Movement 'sizes'
    private downSpeed : number = 0
    private upSpeed : number = 0
    private leftSpeed : number = 0
    private rightSpeed : number = 0
    private health : number = 3

    game : Game

    public getNumOfBullets = () : number =>
    {
        return this.numOfBullets
    }
    
    public getDamage = () : number => {
        return this.damage
    }

    public addBullet = () => 
    {
        this.numOfBullets++
    }

    public removeBullet = () => 
    {
        this.numOfBullets--
    }

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

    public setX = (newX : number) =>
    {
        if(newX > 30 && newX < 543){ this.x = newX }
    }

    public setY = (newY : number) =>
    {
        if(newY > 30 && newY < 530){ this.y = newY }
    }

    public getRectangle = () => 
    {
        return this.div.getBoundingClientRect()
    }

    constructor(g : Game, x : number, y : number, health : number)
    {
        console.log("The Professor has arrived!")

        this.game = g

        this.x = x
        this.y = y
        this.health = health

        // Create a player and append it to the gametag
        this.div = document.createElement("player") 
        gameElement.appendChild(this.div)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp (e))

        window.addEventListener("click", (e) => { if (this.div) {
            let element = document.getElementsByTagName("game")[0]
            this.game.bulletsPlayer.push(new Bullet(this.x, this.y+20, this.getCursorPosition(element, e)[0], 
            this.getCursorPosition(element, e)[1], this.range, this.bulletSpeed, this.damage, this.name)) 
            this.addBullet()
        }
            
        })
    }

    // When key is pressed
    private onKeyDown(e: KeyboardEvent): void {
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

    // When key is released
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

    getCursorPosition(element : Element, event : any) {
        const rect = element.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        // console.log("x: " + x + " y: " + y)
        return [x, y]
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