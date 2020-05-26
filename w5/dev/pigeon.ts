/// <reference path="player.ts"/>

class Pigeon {

    private div : HTMLElement

    //private health = 3
    private range = 500 //px
    //private reload = 1 //sec
    private damage = 1
    private bulletSpeed = 100 //px/sec
    //private speed = 0.8 //?+
    private x : number
    private y : number

    private numOfBullets : number = 0

    public getNumOfBullets = () : number =>
    {
        return this.numOfBullets
    }

    public addBullet() {
        this.numOfBullets++
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
}