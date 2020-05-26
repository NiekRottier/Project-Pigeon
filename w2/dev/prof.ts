class Professor {
     private professor : HTMLElement

     x : number = 0
     y: number = 0


    constructor(){
        console.log("The Professor has arrived!")
        
        this.createProf()
    }

    createProf(){
        this.professor = document.createElement("professor")

        this.professor.addEventListener("a", () => this.moveLeft)
        this.professor.addEventListener("w", () => this.moveUp)
        this.professor.addEventListener("s", () => this.moveDown)
        this.professor.addEventListener("d", () => this.moveRight)


        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.professor)

        console.log("here he is!")
    }

    moveLeft(){
        this.x -= 5
    }

    moveUp(){
        this.y += 5
    }

    moveDown(){
        this.y -=5
    }

    moveRight(){
        this.x +=5
    }


}   