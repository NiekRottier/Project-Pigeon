import { CST } from "../CST";

export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data){
        console.log(data);
        console.log("Hi")
    }

    preload(){

    }

    create(){
        this.add.image(this.game. renderer.width / 2, this.game.renderer.height * 0.20, "logo").setDepth(1);

        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);

        let playButton = this.add.image(this.game. renderer.width / 2, this.game.renderer.height / 2, "play_button").setDepth(1);

        this.add.image(this.game. renderer.width / 2, this.game.renderer.height / 2 + 100, "options_button").setDepth(1);

        let hoverSprite = this.add.sprite(100, 100, "cat");
        hoverSprite.setScale(2);
        hoverSprite.setVisible(false);

        this.sound.pauseOnBlur = true;
        this.sound.play("title_music", {

            loop: true
        })

        this.anims.create({
            key: "walk",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("cat", {
                frames: [0, 1, 2, 3]
            })

        })

        playButton.setInteractive();

        playButton.on("pointerover", ()=>{
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;
        })

        playButton.on("pointerout", ()=>{
            hoverSprite.setVisible(false);
        })

        playButton.on("pointerup", ()=>{
            console.log("open")
        })

    }
}