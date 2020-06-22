class Door {

    div : HTMLElement

    public getRectangle = () => 
    {
        return this.div.getBoundingClientRect()
    }

    constructor(direction : string) {
        
        if (direction === "North") {
            this.div = document.createElement("doorN")
            gameElement.appendChild(this.div)

            this.div.style.width = "60px"
            this.div.style.height = "33px"
            this.div.style.transform = `translate(270px, 0px)`

            this.div.style.position = "absolute"
        }
        if (direction === "East"){
            this.div = document.createElement("doorE")
            gameElement.appendChild(this.div)

            this.div.style.width = "33px"
            this.div.style.height = "60px"
            this.div.style.transform = `translate(567px, 270px)`

            this.div.style.position = "absolute"
        }

        if (direction === "South"){
            this.div = document.createElement("doorS")
            gameElement.appendChild(this.div)

            this.div.style.width = "60px"
            this.div.style.height = "33px"
            this.div.style.transform = `translate(270px, 567px)`

            this.div.style.position = "absolute"
        }

        if (direction === "West"){
            this.div = document.createElement("doorW")
            gameElement.appendChild(this.div)

            this.div.style.width = "33px"
            this.div.style.height = "60px"
            this.div.style.transform = `translate(0px, 270px)`

            this.div.style.position = "absolute"
        }
    }
}