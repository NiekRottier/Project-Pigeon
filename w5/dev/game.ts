let gameElement = document.getElementsByTagName("game")[0]


/**
 * @return number between 25 and 575
 */
function randomPosition(){
    return Math.floor(Math.random() * 550 + 25)
}

class Game {
    constructor() 
    {
        console.log(`Game was created!`)
        for (let i = 0; i < 4; i++) {
            new Pigeon()
        }

        new Player()
    }
}

// Create a new game when the page is loaded
window.addEventListener("load", () => new Game())
