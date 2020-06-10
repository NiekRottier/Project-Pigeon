class Game {

    private professor : Professor
    private tutorial : Turorial
    private tutorialCounter : number = 0 

    constructor(){
        console.log("Game was created!")

        this.professor = new Professor(0, 87, 83, 65, 68) // plaats prof in game
        if (this.tutorialCounter == 0) {
            this.tutorialCounter++
            this.tutorial = new Turorial()
        }
        

        this.gameLoop()

    }

    private gameLoop(){
        this.professor.update()

        requestAnimationFrame(()=>this.gameLoop())
    }

}

window.addEventListener("load", () =>new Game())