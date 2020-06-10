class Professor {
    
    private professor : HTMLElement 
     private x : number = 0
     private y: number = 0

     //which key is associated to the movements? the keynumbers will be added in game.ts
     private downkey : number = 0   
     private upkey : number = 0
     private leftkey : number = 0
     private rightkey: number = 0

     //movement 'sizes'
     private downSpeed : number = 0
     private upSpeed : number = 0
     private leftSpeed : number = 0
     private rightSpeed : number = 0

    
     constructor(x: number, upKey : number, downKey : number, leftKey: number, rightKey: number){
        console.log("The Professor has arrived!")
        this.createProf()   //maakt de professor aan

        this.upkey = upKey //87, w 
        this.downkey = downKey// 83, s 
        this.leftkey = leftKey //65, a 
        this.rightkey = rightKey //68 d 

        if(x != 0) x -= this.professor.clientWidth
        this.x = x
        this.y = 200

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp (e))
    }

    //maak een element aan waarin professor wordt geplaatst
    createProf(){
        this.professor = document.createElement("professor")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.professor)
        console.log("here he is!")       
    }

    //when key is pressed
    private onKeyDown(e: KeyboardEvent): void { // if key is pressed
        switch (e.keyCode){
            case this.upkey:
                this.upSpeed = 3
                break

            case this.downkey:
                this.downSpeed = 3
                break

            case this.leftkey:
                this.leftSpeed = 3
                break
            
            case this.rightkey:
                this.rightSpeed = 3
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void{    // if key is not pressed 
        switch(e.keyCode){
            case this.upkey:
                this.upSpeed = 0
                break

            case this.downkey:
                this.downSpeed = 0
                break
            
            case this.leftkey:
                this.leftSpeed = 0
                break

            case this.rightkey:
                this.rightSpeed = 0
                break
        }
    }

    public update(){
        let newY = this.y - this.upSpeed + this.downSpeed
        let newX : number = this.x - this.leftSpeed + this.rightSpeed

        // check of de professor binnen beeld blijft
        if (newY > 0 && newY + 100 < window.innerHeight) this.y = newY
        if (newX > 0 && newX + 100 < window.innerHeight) this.x = newX
        

        this.professor.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

}