"use strict";
var Bullet = (function () {
    function Bullet(originX, originY, targetX, targetY, range, bulletSpeed, damage, shooter) {
        var _this = this;
        this.getDiv = function () {
            return _this.div;
        };
        this.getDamage = function () {
            return _this.damage;
        };
        this.getRectangle = function () {
            return _this.div.getBoundingClientRect();
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
        this.damage = damage;
        this.bulletOriginX = this.bulletX = originX;
        this.bulletOriginY = this.bulletY = originY;
        this.calculateDirection(targetX + 13.5, targetY + 20);
        if (shooter === "Player") {
            this.div = document.createElement("playerBullet");
            console.log("test player");
        }
        if (shooter === "Pigeon") {
            this.div = document.createElement("pigeonBullet");
        }
        gameElement.appendChild(this.div);
        this.div.style.transform = "translate(" + originX + "px, " + originY + "px)";
        console.log(shooter + "'s bullet was created!");
    }
    return Bullet;
}());
var Player = (function () {
    function Player(x, g) {
        var _this = this;
        this.name = "Player";
        this.x = 0;
        this.y = 0;
        this.range = 500;
        this.bulletSpeed = 300;
        this.damage = 1;
        this.numOfBullets = 0;
        this.downkey = 0;
        this.upkey = 0;
        this.leftkey = 0;
        this.rightkey = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.health = 9;
        this.getNumOfBullets = function () {
            return _this.numOfBullets;
        };
        this.getDamage = function () {
            return _this.damage;
        };
        this.addBullet = function () {
            _this.numOfBullets++;
        };
        this.removeBullet = function () {
            _this.numOfBullets--;
        };
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
            _this.div = document.createElement("player");
            gameElement.appendChild(_this.div);
        };
        console.log("The Professor has arrived!");
        this.game = g;
        this.createPlayer();
        this.upkey = 87;
        this.downkey = 83;
        this.leftkey = 65;
        this.rightkey = 68;
        if (x != 0)
            x -= this.div.clientWidth;
        this.x = x;
        this.y = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        window.addEventListener("click", function (e) {
            var element = document.getElementsByTagName("game")[0];
            _this.game.bulletsPlayer.push(new Bullet(_this.x, _this.y + 20, _this.getCursorPosition(element, e)[0], _this.getCursorPosition(element, e)[1], _this.range, _this.bulletSpeed, _this.damage, _this.name));
            _this.addBullet();
        });
    }
    Player.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 3;
                break;
            case this.downkey:
                this.downSpeed = 3;
                break;
            case this.leftkey:
                this.leftSpeed = 3;
                break;
            case this.rightkey:
                this.rightSpeed = 3;
                break;
        }
    };
    Player.prototype.onKeyUp = function (e) {
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
    };
    Player.prototype.getCursorPosition = function (element, event) {
        var rect = element.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return [x, y];
    };
    Player.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        if (newY < gameElement.clientHeight - 70 && newY > 30)
            this.y = newY;
        if (newX < gameElement.clientWidth - 57 && newX > 30)
            this.x = newX;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Player;
}());
var Pigeon = (function () {
    function Pigeon(g, p) {
        var _this = this;
        this.name = "Pigeon";
        this.range = 500;
        this.reload = 2000;
        this.damage = 1;
        this.bulletSpeed = 100;
        this.speedX = 1;
        this.speedY = 1;
        this.health = 3;
        this.numOfBullets = 0;
        this.getHealth = function () {
            return _this.health;
        };
        this.setHealth = function (x) {
            _this.health += x;
        };
        this.getRectangle = function () {
            return _this.div.getBoundingClientRect();
        };
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
        this.setDiv = function (x) {
            _this.div = x;
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
        this.createBullet = function () {
            _this.game.bulletsPigeon.push(new Bullet(_this.x, _this.y, _this.player.getX(), _this.player.getY(), _this.range, _this.bulletSpeed, _this.damage, _this.name));
            _this.addBullet();
        };
        var x = this.x = randomPosition();
        var y = this.y = randomPosition();
        this.game = g;
        this.player = p;
        this.div = document.createElement("pigeon");
        gameElement.appendChild(this.div);
        this.div.style.transform = "translate(" + x + "px, " + y + "px)";
        setInterval(this.createBullet, this.reload);
    }
    Pigeon.prototype.update = function () {
        if (this.x >= gameElement.clientWidth - 59 || this.x <= 30) {
            this.speedX *= -1;
        }
        if (this.y >= gameElement.clientHeight - 50 || this.y <= 30) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Pigeon;
}());
var gameElement = document.getElementsByTagName("game")[0];
function randomPosition() {
    return Math.floor(Math.random() * 540 + 30);
}
var Game = (function () {
    function Game() {
        var _this = this;
        this.pigeons = [];
        this.bulletsPigeon = [];
        this.bulletsPlayer = [];
        this.gameLoop = function () {
            if (_this.player) {
                _this.player.update();
            }
            if (_this.pigeons) {
                _this.pigeons.forEach(function (pigeon) { pigeon.update(); });
            }
            _this.bulletsPigeon.forEach(function (bulletPigeon) {
                var _a, _b;
                if (_this.checkCollision(bulletPigeon.getRectangle(), _this.player.getRectangle())) {
                    var bulletPigeonDiv = bulletPigeon.getDiv();
                    (_a = bulletPigeonDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletPigeonDiv);
                    _this.player.setHealth(-bulletPigeon.getDamage());
                    if (_this.player.getHealth() === 0) {
                        console.log("Player dies");
                        var playerDiv = _this.player.getDiv();
                        (_b = playerDiv.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(playerDiv);
                    }
                }
                bulletPigeon.update();
            });
            _this.bulletsPlayer.forEach(function (bulletPlayer) {
                _this.pigeons.forEach(function (pigeon) {
                    var _a, _b;
                    if (_this.checkCollision(bulletPlayer.getRectangle(), pigeon.getRectangle())) {
                        var bulletPlayerDiv = bulletPlayer.getDiv();
                        (_a = bulletPlayerDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletPlayerDiv);
                        pigeon.setHealth(-bulletPlayer.getDamage());
                        if (pigeon.getHealth() === 0) {
                            console.log("Pigeon dies");
                            var pigeonDiv = pigeon.getDiv();
                            (_b = pigeonDiv.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(pigeonDiv);
                        }
                    }
                });
                if (_this.player) {
                    bulletPlayer.update();
                }
            });
            requestAnimationFrame(function () { return _this.gameLoop(); });
        };
        this.checkCollision = function (a, b) {
            return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom);
        };
        console.log("Game was created!");
        this.player = new Player(290, this);
        for (var i = 0; i < 3; i++) {
            this.pigeons.push(new Pigeon(this, this.player));
        }
        this.gameLoop();
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
//# sourceMappingURL=main.js.map