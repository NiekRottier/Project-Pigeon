/// <reference path="player.ts"/>

class Pigeon {

    private div : HTMLElement

    private name : string = "Pigeon"

    private range = 500 //px
    private reload = 2000 //ms
    private damage = 1
    private bulletSpeed = 100 //px/sec
    private speedX : number = 1
    private speedY : number = 1
    private x : number
    private y : number
    private health : number = 3

    private game : Game
    private player : Player

    private numOfBullets : number = 0

    public getReload = () =>
    {
        return this.reload
    }

    public getHealth = () =>
    {
        return this.health
    }

    public setHealth = (x : number) => 
    {
        this.health += x 
    }

    public getRectangle = () =>
    {
        return this.div.getBoundingClientRect()
    }

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

    public setDiv = (x : any) => {
        this.div = x
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

    constructor(g : Game, p : Player)
    {
        // Give a random x and y position
        let x = this.x = randomPosition()
        let y = this.y = randomPosition()

        this.game = g
        this.player = p
        // console.log(`this.player = ${p}`);
        

        // Create a pigeon and append it to the gametag
        this.div = document.createElement("pigeon")
        gameElement.appendChild(this.div)

        // Put the birdy at the random x and y position
        this.div.style.transform = `translate(${x}px, ${y}px)`
    }

    public createBullet = () => 
    {
        if (this.health > 0) {
            this.game.bulletsPigeon.push(new Bullet(this.x, this.y, this.player.getX(), this.player.getY(), 
            this.range, this.bulletSpeed, this.damage, this.name)) 
            this.addBullet()
        }
    }

    public update() : void 
    {
        if (this.x >= gameElement.clientWidth-59 || this.x <= 30) {
            this.speedX *= -1
        }
        if (this.y >= gameElement.clientHeight-50 || this.y <= 30) {
            this.speedY *= -1
        }

        this.x += this.speedX
        this.y += this.speedY
        // console.log(`xBall = ${this.x}, yBall = ${this.y}`);
        
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}