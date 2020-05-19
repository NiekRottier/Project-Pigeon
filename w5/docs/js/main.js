"use strict";
var gameElement = document.getElementsByTagName("game")[0];
function randomPosition() {
    return Math.floor(Math.random() * 550 + 25);
}
var game = (function () {
    function game() {
        console.log("Game was created!");
        for (var i = 0; i < 1; i++) {
            new Pigeon;
        }
        new Player;
    }
    return game;
}());
window.addEventListener("load", function () { return new game(); });
var Pigeon = (function () {
    function Pigeon() {
        this.range = 500;
        this.bulletspeed = 100;
        this.pigeonX = randomPosition();
        this.pigeonY = randomPosition();
        this.createPigeon();
        this.shootBullet();
    }
    Pigeon.prototype.createPigeon = function () {
        var pigeon = document.createElement("pigeon");
        gameElement.appendChild(pigeon);
        pigeon.style.transform = "translate(" + this.pigeonX + "px, " + this.pigeonY + "px)";
    };
    Pigeon.prototype.shootBullet = function () {
        var bullet = document.createElement("bullet");
        gameElement.appendChild(bullet);
        bullet.style.transform = "translate(" + this.pigeonX + "px, " + this.pigeonY + "px)";
        var changeX = this.calculateDirection("changeX");
        var changeY = this.calculateDirection("changeY");
        var airtime = this.calculateDirection("airtime");
        console.log(changeX, changeY, airtime);
        var bulletX = this.pigeonX;
        var bulletY = this.pigeonY;
        console.log(bulletX, bulletY);
        for (var i = 0; i < airtime; i++) {
            requestAnimationFrame(frame);
        }
        function frame() {
            bulletX += changeX;
            bulletY += changeY;
            console.log(bulletX, bulletY);
            bullet.style.transform = "translate(" + bulletX + "px, " + bulletY + "px)";
        }
    };
    Pigeon.prototype.calculateDirection = function (requestedVar) {
        var targetX = 300;
        var targetY = 300;
        var bulletX = this.pigeonX;
        var bulletY = this.pigeonY;
        var dX = targetX - bulletX;
        var dY = targetY - bulletY;
        var Z = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
        var A = (dX / Z) * this.range;
        var B = (dY / Z) * this.range;
        var airtime = (this.range / this.bulletspeed) * 1000;
        var changeX = A / airtime;
        var changeY = B / airtime;
        return eval(requestedVar);
    };
    return Pigeon;
}());
var Player = (function () {
    function Player() {
        this.x = 300;
        this.y = 300;
        var player = document.createElement("player");
        gameElement.appendChild(player);
        player.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    Player.prototype.getX = function () {
        console.log("Player.x = " + this.x);
        return this.x;
    };
    Player.prototype.getY = function () {
        console.log("Player.y = " + this.y);
        return this.y;
    };
    return Player;
}());
//# sourceMappingURL=main.js.map