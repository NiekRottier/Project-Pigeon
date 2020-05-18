class player {
    name = "Prof. Patat"
    health = 3
    range = 50
    reload = 1
    damage = 1
    speed = 1

    walk(){
        console.log(`Walk`)
    }
    attack(){
        console.log(`Attack for ${this.damage}`)
    }
    interactPowerup(){
        console.log(`You picked up a power-up!`)
    }
    interactShop(){
        console.log(`You bought a thing`)
    }

}

class pigeon {
    name = "Pigeon"
    health = 2
    range = 65
    reload = 1
    damage = 1
    speed = 0.8

    walk(){
        console.log(`Walk`)
    }
    attack(){
        console.log(`Attack for ${this.damage}`)
    }
}

class wall {
    name = "Wall"
    immovable = true
    solid = true
    destructable = false
}

class box {
    name = "Box"
    immovable = false
    solid = true
    destructable = false
}
    
class vase {
    name = "Vase"
    immovable = true
    solid = true
    destructable = true
}
    
class water {
    name = "Water"
    immovable = true
    solid = true
    destructable = false
}

class door {
    name = "door"
    immovable = true
    solid = true
    destructable = false

    // open(){
    //     if (stage.bossAlive === false) {
    //         this.solid = false
    //     }
    // }
}

class bossroom {
    constructor() {
        //new boss;
    }
}


class room {
    constructor(){
        new pigeon
        new door
        new wall
    }
}

class stage {
    constructor() {
        for (let i = 0; i < 16; i++) {
            new room
        }
        new bossroom
    }

    bossAlive = true
}