"use strict";
var gameElement = document.getElementsByTagName("game")[0];
function randomPosition() {
    return Math.floor(Math.random() * 550 + 25);
}
var Game = (function () {
    function Game() {
        console.log("Game was created!");
        for (var i = 0; i < 4; i++) {
            new Pigeon();
        }
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Pigeon = (function () {
    function Pigeon() {
        this.range = 500;
        this.bulletspeed = 100;
        this.pigeonX = randomPosition();
        this.pigeonY = randomPosition();
        this.createPigeon();
    }
    Pigeon.prototype.createPigeon = function () {
        var pigeon = document.createElement("pigeon");
        gameElement.appendChild(pigeon);
        pigeon.style.transform = "translate(" + this.pigeonX + "px, " + this.pigeonY + "px)";
        this.shootBullet();
    };
    Pigeon.prototype.shootBullet = function () {
        var bullet = document.createElement("bullet");
        gameElement.appendChild(bullet);
        bullet.style.transform = "translate(" + this.pigeonX + "px, " + this.pigeonY + "px)";
        var changeX = this.calculateDirection("changeX");
        var changeY = this.calculateDirection("changeY");
        var airtime = this.calculateDirection("airtime");
        var targetX = this.calculateDirection("targetX");
        var targetY = this.calculateDirection("targetY");
        console.log(changeX, changeY, airtime);
        var bulletOriginX = this.pigeonX;
        var bulletOriginY = this.pigeonY;
        var bulletX = this.pigeonX;
        var bulletY = this.pigeonY;
        var distance = 0;
        var dX = 0;
        var dY = 0;
        var id;
        console.log(bulletX, bulletY);
        frame();
        function frame() {
            bulletX += changeX;
            bulletY += changeY;
            dX = bulletOriginX - bulletX;
            dY = bulletOriginY - bulletY;
            distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
            console.log(bulletX, bulletY, distance);
            bullet.style.transform = "translate(" + bulletX + "px, " + bulletY + "px)";
            if (distance >= 500 || (Math.floor(bulletX) === targetX && Math.floor(bulletY) === targetY)) {
                cancelAnimationFrame(id);
            }
            else {
                requestAnimationFrame(frame);
            }
        }
    };
    Pigeon.prototype.calculateDirection = function (requestedVar) {
        var targetX = player.getX();
        var targetY = player.getY();
        var bulletX = this.pigeonX;
        var bulletY = this.pigeonY;
        var dX = targetX - bulletX;
        var dY = targetY - bulletY;
        var Z = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
        var A = (dX / Z) * this.range;
        var B = (dY / Z) * this.range;
        var airtime = (this.range / this.bulletspeed) * 60;
        var changeX = A / airtime;
        var changeY = B / airtime;
        return eval(requestedVar);
    };
    return Pigeon;
}());
var Player = (function () {
    function Player() {
        this.x = randomPosition();
        this.y = randomPosition();
        this.createPlayer();
    }
    Player.prototype.getX = function () {
        console.log("Player.x = " + this.x);
        return this.x;
    };
    Player.prototype.getY = function () {
        console.log("Player.y = " + this.y);
        return this.y;
    };
    Player.prototype.createPlayer = function () {
        var player = document.createElement("player");
        gameElement.appendChild(player);
        player.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Player;
}());
var player = new Player;
//# sourceMappingURL=main.js.map