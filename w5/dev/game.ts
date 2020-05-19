let gameElement = document.getElementsByTagName("game")[0]


function randomPosition(){
    return Math.floor(Math.random() * 550 + 25)
}

class game {
    constructor() 
    {
        console.log(`Game was created!`)
        for (let i = 0; i < 1; i++) {
            new Pigeon
        }

        new Player
    }
}


window.addEventListener("load", () => new game())
