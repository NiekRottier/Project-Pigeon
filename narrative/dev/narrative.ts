class Narrative{
    private body : HTMLElement 

    constructor(){
        this.body = document.getElementsByTagName("body")[0]
        
        this.createNarrative1()
    }

    private createNarrative1(){
        let narrative1 = document.createElement("narrative1")
        this.body.appendChild(narrative1)

        setTimeout(() => this.createNarrative2(), 10000)
    }

    private createNarrative2(){
        let narrative2 = document.createElement("narrative2")
        this.body.appendChild(narrative2)

        setTimeout(() => this.createNarrative3(), 10000)
    }

    private createNarrative3(){
        let narrative3 = document.createElement("narrative3")
        this.body.appendChild(narrative3)
        
        setTimeout(() => this.createNarrative4(), 10000)
    }

    private createNarrative4(){
        let narrative4 = document.createElement("narrative4")
        this.body.appendChild(narrative4)
        
        setTimeout(() => this.moveToIndex(), 10000)
    }

    private moveToIndex(){
        window.location.replace("/Project-Pigeon/index.html")
    }
}
 window.addEventListener("load", ()=> new Narrative())