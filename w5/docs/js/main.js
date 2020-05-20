"use strict";
var Bullet = (function () {
    function Bullet() {
        var _this = this;
        this.createBullet = function (x, y) {
            _this.x = x;
            _this.y = y;
            _this.div = document.createElement("bullet");
            gameElement.appendChild(_this.div);
            _this.div.style.transform = "translate(" + x + "px, " + y + "px)";
            console.log("Bullet was created!");
            _this.shootBullet();
        };
        this.shootBullet = function () {
            var bulletOriginX = _this.x;
            var bulletOriginY = _this.y;
            var changes = _this.calculateDirection();
            var changeX = changes[0];
            var changeY = changes[1];
            var bulletX = _this.x;
            var bulletY = _this.y;
            var distance;
            var dX;
            var dY;
            var id;
            var thisDiv = _this.div;
            function frame() {
                var _a;
                bulletX += changeX;
                bulletY += changeY;
                dX = bulletOriginX - bulletX;
                dY = bulletOriginY - bulletY;
                distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
                console.log("distance = " + distance);
                if (distance <= 500) {
                    thisDiv.style.transform = "translate(" + bulletX + "px, " + bulletY + "px)";
                    requestAnimationFrame(frame);
                }
                else {
                    cancelAnimationFrame(id);
                    (_a = thisDiv.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(thisDiv);
                }
            }
            frame();
        };
        this.calculateDirection = function () {
            var targetX = 300;
            var targetY = 300;
            var bulletX = _this.x;
            var bulletY = _this.y;
            var dX = targetX - bulletX;
            var dY = targetY - bulletY;
            var Z = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
            var range = 500;
            var A = (dX / Z) * range;
            var B = (dY / Z) * range;
            var bulletSpeed = 100;
            var airtime = (range / bulletSpeed) * 60;
            var changeX = A / airtime;
            var changeY = B / airtime;
            return [changeX, changeY];
        };
        this.checkCollision = function (a, b) {
            return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom);
        };
    }
    return Bullet;
}());
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
        new Player();
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
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
            _this.div.addEventListener("click", function () { var bullet = new Bullet; bullet.createBullet(x, y); });
        };
        this.createPigeon();
    }
    return Pigeon;
}());
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
//# sourceMappingURL=main.js.map