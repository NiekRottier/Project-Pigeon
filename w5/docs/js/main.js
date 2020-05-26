"use strict";
var Player = (function () {
    function Player() {
        var _this = this;
        this.x = 300;
        this.y = 300;
        this.health = 3;
        this.getX = function () {
            return _this.x;
        };
        this.getY = function () {
            return _this.y;
        };
        this.getRectangle = function () {
            return _this.div.getBoundingClientRect();
        };
        this.createPlayer = function () {
            console.log("Player: this.x = " + _this.x + ", this.y = " + _this.y);
            _this.div = document.createElement("player");
            gameElement.appendChild(_this.div);
            _this.div.style.transform = "translate(" + _this.x + "px, " + _this.y + "px)";
        };
        this.death = function () {
            var _a;
            if (_this.health <= 2) {
                _this.div.style.backgroundColor = "orange";
            }
            else if (_this.health === 1) {
                _this.div.style.backgroundColor = "red";
            }
            else if (_this.health === 0) {
                (_a = _this.div.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(_this.div);
            }
        };
        this.createPlayer();
    }
    return Player;
}());
var Pigeon = (function () {
    function Pigeon() {
        var _this = this;
        this.range = 500;
        this.damage = 1;
        this.bulletSpeed = 100;
        this.getRange = function () {
            return _this.range;
        };
        this.getBulletSpeed = function () {
            return _this.bulletSpeed;
        };
        this.getDamage = function () {
            return _this.damage;
        };
        this.createPigeon = function () {
            var x = randomPosition();
            var y = randomPosition();
            _this.div = document.createElement("pigeon");
            gameElement.appendChild(_this.div);
            _this.div.style.transform = "translate(" + x + "px, " + y + "px)";
            _this.div.addEventListener("click", function () { return _this.createBullet(x, y); });
        };
        this.numOfBullets = 0;
        this.getRectangleBullet = function () {
            return _this.bulletDiv.getBoundingClientRect();
        };
        this.bulletUpdate = function () {
            var _a;
            var newX = _this.bulletX + _this.changeX;
            var newY = _this.bulletY + _this.changeY;
            var dX = _this.bulletOriginX - newX;
            var dY = _this.bulletOriginY - newY;
            var distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
            if (distance < _this.getRange()) {
                _this.bulletX = newX;
                _this.bulletY = newY;
                _this.bulletDiv.style.transform = "translate(" + _this.bulletX + "px, " + _this.bulletY + "px)";
            }
            else {
                console.log(distance);
                console.log("Removed bullet at " + distance);
                (_a = _this.bulletDiv.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(_this.bulletDiv);
                _this.numOfBullets--;
            }
        };
        this.calculateDirection = function () {
            var targetX = 300;
            var targetY = 300;
            var bulletX = _this.bulletX;
            var bulletY = _this.bulletY;
            var dX = targetX - bulletX;
            var dY = targetY - bulletY;
            var Z = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
            var range = _this.getRange();
            var A = (dX / Z) * range;
            var B = (dY / Z) * range;
            var bulletSpeed = _this.getBulletSpeed();
            var airtime = (range / bulletSpeed) * 60;
            var changeX = A / airtime;
            var changeY = B / airtime;
            _this.changeX = changeX;
            _this.changeY = changeY;
        };
        this.createPigeon();
    }
    Pigeon.prototype.createBullet = function (x, y) {
        this.bulletOriginX = this.bulletX = x;
        this.bulletOriginY = this.bulletY = y;
        this.calculateDirection();
        this.bulletDiv = document.createElement("bullet");
        gameElement.appendChild(this.bulletDiv);
        this.bulletDiv.style.transform = "translate(" + x + "px, " + y + "px)";
        console.log("Bullet was created!");
        this.numOfBullets++;
    };
    return Pigeon;
}());
var gameElement = document.getElementsByTagName("game")[0];
function randomPosition() {
    return Math.floor(Math.random() * 550 + 25);
}
var Game = (function () {
    function Game() {
        var _this = this;
        this.pigeons = [];
        this.gameLoop = function () {
            for (var i = 0; i < _this.pigeons.length; i++) {
                if (_this.pigeons[i].numOfBullets > 0 && _this.checkCollision(_this.pigeons[i].getRectangleBullet(), _this.player.getRectangle()) === false) {
                    _this.pigeons[i].bulletUpdate();
                }
            }
            requestAnimationFrame(function () { return _this.gameLoop(); });
        };
        this.checkCollision = function (a, b) {
            return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom);
        };
        console.log("Game was created!");
        for (var i = 0; i < 4; i++) {
            this.pigeons.push(new Pigeon());
        }
        this.player = new Player();
        this.gameLoop();
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
//# sourceMappingURL=main.js.map