"use strict";
var Bullet = (function () {
    function Bullet(originX, originY, targetX, targetY, range, bulletSpeed) {
        var _this = this;
        this.getDiv = function () {
            return _this.div;
        };
        this.getRectangle = function () {
            return _this.div.getBoundingClientRect();
        };
        this.createBullet = function (originX, originY, targetX, targetY) {
            _this.bulletOriginX = _this.bulletX = originX;
            _this.bulletOriginY = _this.bulletY = originY;
            _this.calculateDirection(targetX, targetY);
            _this.div = document.createElement("bullet");
            gameElement.appendChild(_this.div);
            _this.div.style.transform = "translate(" + originX + "px, " + originY + "px)";
            console.log("Bullet was created!");
        };
        this.update = function () {
            var _a;
            var newX = _this.bulletX + _this.changeX;
            var newY = _this.bulletY + _this.changeY;
            var dX = _this.bulletOriginX - newX;
            var dY = _this.bulletOriginY - newY;
            var distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
            if (_this.range > distance) {
                _this.bulletX = newX;
                _this.bulletY = newY;
                _this.div.style.transform = "translate(" + _this.bulletX + "px, " + _this.bulletY + "px)";
            }
            else {
                console.log("Removed bullet at " + distance);
                (_a = _this.div.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(_this.div);
            }
        };
        this.calculateDirection = function (targetX, targetY) {
            var bulletX = _this.bulletX;
            var bulletY = _this.bulletY;
            var dX = targetX - bulletX;
            var dY = targetY - bulletY;
            var Z = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
            var A = (dX / Z) * _this.range;
            var B = (dY / Z) * _this.range;
            var bulletSpeed = _this.bulletSpeed;
            var airtime = (_this.range / bulletSpeed) * 60;
            var changeX = A / airtime;
            var changeY = B / airtime;
            _this.changeX = changeX;
            _this.changeY = changeY;
        };
        this.range = range;
        this.bulletSpeed = bulletSpeed;
        this.createBullet(originX, originY, targetX, targetY);
    }
    return Bullet;
}());
var Player = (function () {
    function Player() {
        var _this = this;
        this.x = randomPosition();
        this.y = randomPosition();
        this.health = 3;
        this.getDiv = function () {
            return _this.div;
        };
        this.getHealth = function () {
            return _this.health;
        };
        this.setHealth = function (x) {
            _this.health += x;
        };
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
        this.numOfBullets = 0;
        this.getNumOfBullets = function () {
            return _this.numOfBullets;
        };
        this.addBullet = function () {
            _this.numOfBullets++;
        };
        this.removeBullet = function () {
            _this.numOfBullets--;
        };
        this.getX = function () {
            return _this.x;
        };
        this.getY = function () {
            return _this.y;
        };
        this.getDiv = function () {
            return _this.div;
        };
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
            var x = _this.x = randomPosition();
            var y = _this.y = randomPosition();
            _this.div = document.createElement("pigeon");
            gameElement.appendChild(_this.div);
            _this.div.style.transform = "translate(" + x + "px, " + y + "px)";
        };
        this.createPigeon();
    }
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
        this.bullets = [];
        this.gameLoop = function () {
            var _a, _b;
            for (var i = 0; i < _this.pigeons.length; i++) {
                for (var index = 0; index < _this.bullets.length; index++) {
                    if (_this.pigeons[i].getNumOfBullets() > 0) {
                        if (_this.checkCollision(_this.bullets[index].getRectangle(), _this.player.getRectangle()) === false) {
                            _this.bullets[index].update();
                        }
                        else {
                            var bulletDiv = _this.bullets[index].getDiv();
                            (_a = bulletDiv.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(bulletDiv);
                            _this.pigeons[i].removeBullet();
                            if (_this.player.getHealth() === 1) {
                                var playerDiv = _this.player.getDiv();
                                (_b = playerDiv.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(playerDiv);
                                console.log("PLAYER KILLED!");
                            }
                            else {
                                _this.player.setHealth(_this.pigeons[i].getDamage() * -1);
                                console.log("PLAYER TOOK " + _this.pigeons[i].getDamage() + " DAMAGE!");
                            }
                        }
                    }
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
        var _loop_1 = function (i) {
            this_1.pigeons[i].getDiv().addEventListener("click", function () {
                _this.bullets.push(new Bullet(_this.pigeons[i].getX(), _this.pigeons[i].getY(), _this.player.getX(), _this.player.getY(), _this.pigeons[i].getRange(), _this.pigeons[i].getBulletSpeed()));
                _this.pigeons[i].addBullet();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.pigeons.length; i++) {
            _loop_1(i);
        }
        this.player = new Player();
        this.gameLoop();
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
//# sourceMappingURL=main.js.map