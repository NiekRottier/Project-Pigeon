class Game {
    constructor() {
        console.log("Game was created!");
        this.professor = new Professor(0, 87, 83, 65, 68);
        this.gameLoop();
    }
    gameLoop() {
        this.professor.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Game());
class Professor {
    constructor(x, upKey, downKey, leftKey, rightKey) {
        this.x = 0;
        this.y = 0;
        this.downkey = 0;
        this.upkey = 0;
        this.leftkey = 0;
        this.rightkey = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        console.log("The Professor has arrived!");
        this.createProf();
        this.upkey = upKey;
        this.downkey = downKey;
        this.leftkey = leftKey;
        this.rightkey = rightKey;
        if (x != 0)
            x -= this.professor.clientWidth;
        this.x = x;
        this.y = 200;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    createProf() {
        this.professor = document.createElement("professor");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.professor);
        console.log("here he is!");
    }
    onKeyDown(e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 6;
                break;
            case this.downkey:
                this.downSpeed = 6;
                break;
            case this.leftkey:
                this.leftSpeed = 6;
                console.log(this.leftSpeed);
                break;
            case this.rightkey:
                this.rightSpeed = 6;
                console.log(this.rightSpeed);
                break;
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
        }
    }
    update() {
        let newY = this.y - this.upSpeed + this.downSpeed;
        let newX = this.x - this.leftSpeed + this.rightSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        if (newX > 0 && newX + 100 < window.innerHeight)
            this.x = newX;
        this.professor.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
//# sourceMappingURL=main.js.map