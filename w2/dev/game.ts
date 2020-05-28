class Game {

    private professor : Professor

    constructor(){
        console.log("Game was created!")

        this.professor = new Professor(0, 87, 83, 65, 68) // plaats prof in game

        this.gameLoop()

    }

    private gameLoop(){
        this.professor.update()

        requestAnimationFrame(()=>this.gameLoop())
    }

}

window.addEventListener("load", () =>new Game())