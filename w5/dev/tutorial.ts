class Tutorial{ 

    private tutorialElement : HTMLElement
    private doTutorial : boolean = true

    constructor(){
        this.createTutorial()

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    }

    createTutorial(){
        let gameElement = document.getElementsByTagName("game")[0]

        this.tutorialElement = document.createElement("tutorial")
        gameElement.appendChild(this.tutorialElement)

        this.tutorialElement.innerHTML = "Press WASD to move"
    }
    
    onKeyDown(e : KeyboardEvent){
        if (this.doTutorial == true) {
            if(e.keyCode == 87 || e.keyCode == 83 ||e.keyCode == 65 ||e.keyCode == 68){
            this.doTutorial = false
            setTimeout(() => this.removeTutorial(0), 1000)
            console.log(this.doTutorial);
            }
        }
        setTimeout(() => this.removeTutorial(1), 3000)
    }

    removeTutorial(a : number){
        if (a == 0) {
            this.tutorialElement.innerHTML = ""
            this.createTutorial2()
            console.log("uitgevoerd!");
            
        }else if (a == 1) {
            this.tutorialElement.remove()
        }
    }

    createTutorial2(){
        this.tutorialElement.innerHTML = "Click to shoot"
    }
}
