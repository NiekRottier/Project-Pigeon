/// <reference path="player.ts"/>

class Pigeon {

    private div : HTMLElement

    //private health = 3
    private range = 500 //px
    //private reload = 1 //sec
    private damage = 1
    private bulletSpeed = 100 //px/sec
    private speedX : number = 2
    private speedY : number = 2
    private x : number
    private y : number

    private numOfBullets : number = 0

    public getNumOfBullets = () : number =>
    {
        return this.numOfBullets
    }

    public addBullet = () => 
    {
        this.numOfBullets++
    }

    public removeBullet = () => 
    {
        this.numOfBullets--
    }

    public getX = () : number =>
    {
        //console.log(`getX's x = ${this.x}`)
        return this.x
    }

    public getY = () : number =>
    {
        //console.log(`getY's y = ${this.y}`)
        return this.y
    }

    public getDiv = () : HTMLElement => {
        return this.div
    }

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

    private createPigeon = () =>
    {
        // Give a random x and y position
        let x = this.x = randomPosition()
        let y = this.y = randomPosition()

        // Create a pigeon and append it to the gametag
        this.div = document.createElement("pigeon")
        gameElement.appendChild(this.div)

        // Put the birdy at the random x and y position
        this.div.style.transform = `translate(${x}px, ${y}px)`
    } 

    public update() : void {
        let game = <HTMLElement>document.getElementsByTagName("game")[0]

        if (this.x >= game.clientWidth-59 || this.x <= 30) {
            this.speedX *= -1
        }
        if (this.y >= game.clientHeight-50 || this.y <= 30) {
            this.speedY *= -1
        }

        this.x += this.speedX
        this.y += this.speedY
        // console.log(`xBall = ${this.x}, yBall = ${this.y}`);
        
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}