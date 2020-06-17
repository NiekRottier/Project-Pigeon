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
var Door = (function () {
    function Door(direction, door) {
        var _this = this;
        this.getRectangle = function () {
            return _this.div.getBoundingClientRect();
        };
        if (direction === "North" && door === true) {
            this.div = document.createElement("doorN");
            gameElement.appendChild(this.div);
            this.div.style.width = "60px";
            this.div.style.height = "33px";
            this.div.style.transform = "translate(270px, 0px)";
            this.div.style.position = "absolute";
        }
        if (direction === "East" && door === true) {
            this.div = document.createElement("doorE");
            gameElement.appendChild(this.div);
            this.div.style.width = "33px";
            this.div.style.height = "60px";
            this.div.style.transform = "translate(567px, 270px)";
            this.div.style.position = "absolute";
        }
        if (direction === "South" && door === true) {
            this.div = document.createElement("doorS");
            gameElement.appendChild(this.div);
            this.div.style.width = "60px";
            this.div.style.height = "33px";
            this.div.style.transform = "translate(270px, 567px)";
            this.div.style.position = "absolute";
        }
        if (direction === "West" && door === true) {
            this.div = document.createElement("doorW");
            gameElement.appendChild(this.div);
            this.div.style.width = "33px";
            this.div.style.height = "60px";
            this.div.style.transform = "translate(0px, 270px)";
            this.div.style.position = "absolute";
        }
    }
    return Door;
}());
var Player = (function () {
    function Player(g, x, y) {
        var _this = this;
        this.name = "Player";
        this.x = 300;
        this.y = 300;
        this.range = 500;
        this.bulletSpeed = 300;
        this.damage = 1;
        this.numOfBullets = 0;
        this.downkey = 83;
        this.upkey = 87;
        this.leftkey = 65;
        this.rightkey = 68;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.health = 3;
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
        this.setX = function (newX) {
            if (newX > 30 && newX < 543) {
                _this.x = newX;
            }
        };
        this.setY = function (newY) {
            if (newY > 30 && newY < 530) {
                _this.y = newY;
            }
        };
        this.getRectangle = function () {
            return _this.div.getBoundingClientRect();
        };
        console.log("The Professor has arrived!");
        this.game = g;
        this.x = x;
        this.y = y;
        this.div = document.createElement("player");
        gameElement.appendChild(this.div);
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
        this.getReload = function () {
            return _this.reload;
        };
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
            if (_this.health > 0) {
                _this.game.bulletsPigeon.push(new Bullet(_this.x, _this.y, _this.player.getX(), _this.player.getY(), _this.range, _this.bulletSpeed, _this.damage, _this.name));
                _this.addBullet();
            }
        };
        var x = this.x = randomPosition();
        var y = this.y = randomPosition();
        this.game = g;
        this.player = p;
        this.div = document.createElement("pigeon");
        gameElement.appendChild(this.div);
        this.div.style.transform = "translate(" + x + "px, " + y + "px)";
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
    function Game(doorN, doorE, doorS, doorW, amountOfPigeons, playerX, playerY) {
        var _this = this;
        this.pigeons = [];
        this.bulletsPigeon = [];
        this.bulletsPlayer = [];
        this.player = [];
        this.doors = [];
        this.doorsLocked = true;
        this.gameLoop = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            if (_this.player[0]) {
                _this.player[0].update();
            }
            if (_this.pigeons) {
                _this.pigeons.forEach(function (pigeon) { pigeon.update(); });
            }
            _this.bulletsPigeon.forEach(function (bulletPigeon) {
                var _a, _b;
                if (_this.checkCollision(bulletPigeon.getRectangle(), _this.player[0].getRectangle())) {
                    var bulletPigeonDiv = bulletPigeon.getDiv();
                    (_a = bulletPigeonDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletPigeonDiv);
                    _this.player[0].setHealth(-bulletPigeon.getDamage());
                    var healthdisplay = document.getElementsByTagName("health")[0];
                    var removeOneHeart = healthdisplay.clientWidth - 27;
                    if (removeOneHeart < 0) {
                        removeOneHeart = 0;
                    }
                    healthdisplay.style.width = removeOneHeart + "px";
                    if (_this.player[0].getHealth() === 0) {
                        console.log("Player dies");
                        var playerDiv = _this.player[0].getDiv();
                        (_b = playerDiv.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(playerDiv);
                    }
                }
                bulletPigeon.update();
            });
            _this.bulletsPlayer.forEach(function (bulletPlayer) {
                var _a, _b;
                for (var index = 0; index < _this.pigeons.length; index++) {
                    if (_this.checkCollision(bulletPlayer.getRectangle(), _this.pigeons[index].getRectangle())) {
                        var bulletPlayerDiv = bulletPlayer.getDiv();
                        (_a = bulletPlayerDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletPlayerDiv);
                        _this.pigeons[index].setHealth(-bulletPlayer.getDamage());
                        if (_this.pigeons[index].getHealth() === 0) {
                            console.log("Pigeon dies");
                            var pigeonDiv = _this.pigeons[index].getDiv();
                            (_b = pigeonDiv.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(pigeonDiv);
                            _this.pigeons.splice(index, 1);
                        }
                    }
                }
                if (_this.player[0]) {
                    bulletPlayer.update();
                }
            });
            if (_this.pigeons.length === 0 && _this.doorsLocked === true) {
                console.log("Opening doors");
                _this.doorsLocked = false;
            }
            if (_this.doorsLocked === false) {
                var background = document.getElementsByTagName("background")[0];
                var doorN = document.getElementsByTagName("doorN")[0];
                var doorE = document.getElementsByTagName("doorE")[0];
                var doorS = document.getElementsByTagName("doorS")[0];
                var doorW = document.getElementsByTagName("doorW")[0];
                if (background.classList.contains("spawn")) {
                    if (doorN) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                            console.log("North door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            background.classList.remove("spawn");
                            background.classList.add("room4");
                            var playerDiv = _this.player[0].getDiv();
                            (_a = playerDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(playerDiv);
                            _this.player.splice(0, 1);
                            new Game(false, true, true, true, 1, 287, 529);
                        }
                    }
                    if (doorS) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorS.getBoundingClientRect())) {
                            console.log("South door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            background.classList.remove("spawn");
                            background.classList.add("room8");
                            var playerDiv = _this.player[0].getDiv();
                            (_b = playerDiv.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(playerDiv);
                            _this.player.splice(0, 1);
                            new Game(true, true, false, false, 1, 287, 31);
                        }
                    }
                    if (doorW) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorW.getBoundingClientRect())) {
                            console.log("West door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            background.classList.remove("spawn");
                            background.classList.add("room1");
                            var playerDiv = _this.player[0].getDiv();
                            (_c = playerDiv.parentElement) === null || _c === void 0 ? void 0 : _c.removeChild(playerDiv);
                            _this.player.splice(0, 1);
                            new Game(true, true, false, true, 1, 542, 280);
                        }
                    }
                }
                else if (background.classList.contains("room1")) {
                    if (doorN) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                            console.log("North door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            background.classList.remove("room1");
                            background.classList.add("room3");
                            var playerDiv = _this.player[0].getDiv();
                            (_d = playerDiv.parentElement) === null || _d === void 0 ? void 0 : _d.removeChild(playerDiv);
                            _this.player.splice(0, 1);
                            new Game(true, true, true, false, 0, 287, 529);
                        }
                    }
                    if (doorE) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                            console.log("East door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            background.classList.remove("room1");
                            background.classList.add("spawn");
                            var playerDiv = _this.player[0].getDiv();
                            (_e = playerDiv.parentElement) === null || _e === void 0 ? void 0 : _e.removeChild(playerDiv);
                            _this.player.splice(0, 1);
                            new Game(true, false, true, true, 0, 31, 280);
                        }
                    }
                    if (doorW) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorW.getBoundingClientRect())) {
                            console.log("West door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            background.classList.remove("room1");
                            background.classList.add("room2");
                            var playerDiv = _this.player[0].getDiv();
                            (_f = playerDiv.parentElement) === null || _f === void 0 ? void 0 : _f.removeChild(playerDiv);
                            _this.player.splice(0, 1);
                            new Game(false, true, false, false, 0, 542, 280);
                        }
                    }
                }
                else if (background.classList.contains("room2")) {
                    if (doorE) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                            console.log("East door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            background.classList.remove("room2");
                            background.classList.add("room1");
                            var playerDiv = _this.player[0].getDiv();
                            (_g = playerDiv.parentElement) === null || _g === void 0 ? void 0 : _g.removeChild(playerDiv);
                            _this.player.splice(0, 1);
                            new Game(false, false, false, true, 0, 31, 280);
                        }
                    }
                }
                else if (background.classList.contains("room3")) {
                    if (doorN) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                            console.log("North door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            background.classList.remove("room3");
                            background.classList.add("shop");
                            var playerDiv = _this.player[0].getDiv();
                            (_h = playerDiv.parentElement) === null || _h === void 0 ? void 0 : _h.removeChild(playerDiv);
                            _this.player.splice(0, 1);
                            new Game(false, false, true, false, 0, 287, 529);
                        }
                    }
                    if (doorE) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                            console.log("East door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            background.classList.remove("room3");
                            background.classList.add("room4");
                            var playerDiv = _this.player[0].getDiv();
                            (_j = playerDiv.parentElement) === null || _j === void 0 ? void 0 : _j.removeChild(playerDiv);
                            _this.player.splice(0, 1);
                            new Game(false, true, true, true, 0, 31, 280);
                        }
                    }
                    if (doorS) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorS.getBoundingClientRect())) {
                            console.log("South door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            background.classList.remove("room3");
                            background.classList.add("spawn");
                            var playerDiv = _this.player[0].getDiv();
                            (_k = playerDiv.parentElement) === null || _k === void 0 ? void 0 : _k.removeChild(playerDiv);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            new Game(true, false, true, true, 0, 287, 31);
                        }
                    }
                }
                else if (background.classList.contains("room4")) {
                }
                else if (background.classList.contains("room5")) {
                }
                else if (background.classList.contains("room6")) {
                }
                else if (background.classList.contains("room7")) {
                }
                else if (background.classList.contains("room8")) {
                }
                else if (background.classList.contains("room9")) {
                }
                else if (background.classList.contains("room10")) {
                }
                else if (background.classList.contains("room11")) {
                }
                else if (background.classList.contains("room12")) {
                }
                else if (background.classList.contains("shop")) {
                }
                else if (background.classList.contains("bossroom")) {
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
        this.doors.push(new Door("North", doorN));
        this.doors.push(new Door("East", doorE));
        this.doors.push(new Door("South", doorS));
        this.doors.push(new Door("West", doorW));
        this.player.push(new Player(this, playerX, playerY));
        for (var i = 0; i < amountOfPigeons; i++) {
            this.pigeons.push(new Pigeon(this, this.player[0]));
        }
        for (var i = 0; i < this.pigeons.length; i++) {
            setInterval(this.pigeons[i].createBullet, this.pigeons[i].getReload());
        }
        this.gameLoop();
    }
    return Game;
}());
var games = [];
window.addEventListener("load", function () { return games.push(new Game(true, false, true, true, 0, 300, 300)); });
//# sourceMappingURL=main.js.map