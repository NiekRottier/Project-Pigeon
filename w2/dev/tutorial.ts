class Turorial{

    private tutorialElement : HTMLElement

    constructor(){
        this.createTutorial()

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    }

    createTutorial(){
        let gameElement = document.getElementsByTagName("game")[0]
        this.tutorialElement = document.createElement("tutorial")
        gameElement.appendChild(this.tutorialElement)
        this.tutorialElement.innerHTML = "Press WASD To move"
    }
    
    onKeyDown(e : KeyboardEvent){
        if (e.keyCode == 87 || e.keyCode == 83 ||e.keyCode == 65 ||e.keyCode == 68) {
            setTimeout(() => this.removeTutorial(), 2000)
        } 
    }

    removeTutorial(){
        this.tutorialElement.remove()
    }
}
