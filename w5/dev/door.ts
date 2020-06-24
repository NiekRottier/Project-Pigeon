class Door {

    div : HTMLElement

    public getRectangle = () => 
    {
        return this.div.getBoundingClientRect()
    }

    constructor(direction : string, door : boolean) {
        
        if (direction === "North" && door === true) {
            this.div = document.createElement("doorN")
            gameElement.appendChild(this.div)

            this.div.style.width = "60px"
            this.div.style.height = "33px"
            this.div.style.transform = `translate(270px, 5px)`

            this.div.style.position = "absolute"
            //this.div.style.border = "5px outset red";
        }
        if (direction === "East" && door === true){
            this.div = document.createElement("doorE")
            gameElement.appendChild(this.div)

            this.div.style.width = "33px"
            this.div.style.height = "60px"
            this.div.style.transform = `translate(567px, 270px)`

            this.div.style.position = "absolute"
            //this.div.style.border = "5px outset red";
        }

        if (direction === "South" && door === true){
            this.div = document.createElement("doorS")
            gameElement.appendChild(this.div)

            this.div.style.width = "60px"
            this.div.style.height = "33px"
            this.div.style.transform = `translate(270px, 567px)`

            this.div.style.position = "absolute"
            //this.div.style.border = "5px outset red";
        }

        if (direction === "West" && door === true){
            this.div = document.createElement("doorW")
            gameElement.appendChild(this.div)

            this.div.style.width = "33px"
            this.div.style.height = "60px"
            this.div.style.transform = `translate(0px, 270px)`

            this.div.style.position = "absolute"
            //this.div.style.border = "5px outset red";
        }
    }
}