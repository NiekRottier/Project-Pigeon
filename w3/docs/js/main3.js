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
            if (_this.div) {
                var element = document.getElementsByTagName("game")[0];
                _this.game.bulletsPlayer.push(new Bullet(_this.x, _this.y + 20, _this.getCursorPosition(element, e)[0], _this.getCursorPosition(element, e)[1], _this.range, _this.bulletSpeed, _this.damage, _this.name));
                _this.addBullet();
            }
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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
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
                var playerDiv = _this.player[0].getDiv();
                if (background.classList.contains("spawn")) {
                    if (doorN) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                            console.log("North door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_a = playerDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("spawn");
                            background.classList.add("room4");
                            new Game(false, true, true, true, 1, 287, 527);
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
                            (_b = playerDiv.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("spawn");
                            background.classList.add("room8");
                            new Game(true, true, false, false, 1, 287, 33);
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
                            (_c = playerDiv.parentElement) === null || _c === void 0 ? void 0 : _c.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("spawn");
                            background.classList.add("room1");
                            new Game(true, true, false, true, 1, 540, 280);
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
                            (_d = playerDiv.parentElement) === null || _d === void 0 ? void 0 : _d.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room1");
                            background.classList.add("room3");
                            new Game(true, true, true, false, 1, 287, 527);
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
                            (_e = playerDiv.parentElement) === null || _e === void 0 ? void 0 : _e.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room1");
                            background.classList.add("spawn");
                            new Game(true, false, true, true, 1, 33, 280);
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
                            (_f = playerDiv.parentElement) === null || _f === void 0 ? void 0 : _f.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room1");
                            background.classList.add("room2");
                            new Game(false, true, false, false, 1, 540, 280);
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
                            (_g = playerDiv.parentElement) === null || _g === void 0 ? void 0 : _g.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room2");
                            background.classList.add("room1");
                            new Game(true, true, false, true, 1, 33, 280);
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
                            (_h = playerDiv.parentElement) === null || _h === void 0 ? void 0 : _h.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room3");
                            background.classList.add("shop");
                            new Game(false, false, true, false, 1, 287, 527);
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
                            (_j = playerDiv.parentElement) === null || _j === void 0 ? void 0 : _j.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room3");
                            background.classList.add("room4");
                            new Game(false, true, true, true, 1, 33, 280);
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
                            (_k = playerDiv.parentElement) === null || _k === void 0 ? void 0 : _k.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room3");
                            background.classList.add("room1");
                            new Game(true, true, false, true, 1, 287, 33);
                        }
                    }
                }
                else if (background.classList.contains("room4")) {
                    if (doorE) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                            console.log("East door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_l = playerDiv.parentElement) === null || _l === void 0 ? void 0 : _l.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room4");
                            background.classList.add("room5");
                            new Game(false, true, false, true, 1, 33, 280);
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
                            (_m = playerDiv.parentElement) === null || _m === void 0 ? void 0 : _m.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room4");
                            background.classList.add("spawn");
                            new Game(true, false, true, true, 1, 287, 33);
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
                            (_o = playerDiv.parentElement) === null || _o === void 0 ? void 0 : _o.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room4");
                            background.classList.add("room3");
                            new Game(true, true, true, false, 1, 540, 280);
                        }
                    }
                }
                else if (background.classList.contains("room5")) {
                    if (doorE) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                            console.log("East door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_p = playerDiv.parentElement) === null || _p === void 0 ? void 0 : _p.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room5");
                            background.classList.add("room6");
                            new Game(false, false, true, true, 1, 33, 280);
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
                            (_q = playerDiv.parentElement) === null || _q === void 0 ? void 0 : _q.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room5");
                            background.classList.add("room4");
                            new Game(false, true, true, true, 1, 540, 280);
                        }
                    }
                }
                else if (background.classList.contains("room6")) {
                    if (doorS) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorS.getBoundingClientRect())) {
                            console.log("South door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_r = playerDiv.parentElement) === null || _r === void 0 ? void 0 : _r.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room6");
                            background.classList.add("room7");
                            new Game(true, false, true, false, 1, 287, 33);
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
                            (_s = playerDiv.parentElement) === null || _s === void 0 ? void 0 : _s.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room6");
                            background.classList.add("room5");
                            new Game(false, true, false, true, 1, 540, 280);
                        }
                    }
                }
                else if (background.classList.contains("room7")) {
                    if (doorN) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                            console.log("North door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_t = playerDiv.parentElement) === null || _t === void 0 ? void 0 : _t.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room7");
                            background.classList.add("room6");
                            new Game(false, false, true, true, 1, 287, 527);
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
                            (_u = playerDiv.parentElement) === null || _u === void 0 ? void 0 : _u.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room7");
                            background.classList.add("room10");
                            new Game(true, false, true, true, 1, 287, 33);
                        }
                    }
                }
                else if (background.classList.contains("room8")) {
                    if (doorN) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                            console.log("North door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_v = playerDiv.parentElement) === null || _v === void 0 ? void 0 : _v.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room8");
                            background.classList.add("spawn");
                            new Game(true, false, true, true, 1, 287, 527);
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
                            (_w = playerDiv.parentElement) === null || _w === void 0 ? void 0 : _w.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room8");
                            background.classList.add("room9");
                            new Game(false, true, true, true, 1, 33, 280);
                        }
                    }
                }
                else if (background.classList.contains("room9")) {
                    if (doorE) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                            console.log("East door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_x = playerDiv.parentElement) === null || _x === void 0 ? void 0 : _x.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room9");
                            background.classList.add("room10");
                            new Game(true, false, true, true, 1, 33, 280);
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
                            (_y = playerDiv.parentElement) === null || _y === void 0 ? void 0 : _y.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room9");
                            background.classList.add("room11");
                            new Game(true, true, true, false, 1, 287, 33);
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
                            (_z = playerDiv.parentElement) === null || _z === void 0 ? void 0 : _z.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room9");
                            background.classList.add("room8");
                            new Game(true, true, false, false, 1, 540, 280);
                        }
                    }
                }
                else if (background.classList.contains("room10")) {
                    if (doorN) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                            console.log("North door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_0 = playerDiv.parentElement) === null || _0 === void 0 ? void 0 : _0.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room10");
                            background.classList.add("room7");
                            new Game(true, false, true, false, 1, 287, 527);
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
                            (_1 = playerDiv.parentElement) === null || _1 === void 0 ? void 0 : _1.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room10");
                            background.classList.add("room12");
                            new Game(true, false, false, true, 1, 287, 33);
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
                            (_2 = playerDiv.parentElement) === null || _2 === void 0 ? void 0 : _2.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room10");
                            background.classList.add("room9");
                            new Game(false, true, true, true, 1, 540, 280);
                        }
                    }
                }
                else if (background.classList.contains("room11")) {
                    if (doorN) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                            console.log("North door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_3 = playerDiv.parentElement) === null || _3 === void 0 ? void 0 : _3.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room11");
                            background.classList.add("room9");
                            new Game(false, true, true, true, 1, 287, 527);
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
                            (_4 = playerDiv.parentElement) === null || _4 === void 0 ? void 0 : _4.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room11");
                            background.classList.add("room12");
                            new Game(true, false, false, true, 1, 33, 280);
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
                            (_5 = playerDiv.parentElement) === null || _5 === void 0 ? void 0 : _5.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room11");
                            background.classList.add("bossroom");
                            new Game(true, false, false, false, 1, 287, 33);
                        }
                    }
                }
                else if (background.classList.contains("room12")) {
                    if (doorN) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                            console.log("North door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_6 = playerDiv.parentElement) === null || _6 === void 0 ? void 0 : _6.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room12");
                            background.classList.add("room10");
                            new Game(true, false, true, true, 1, 287, 527);
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
                            (_7 = playerDiv.parentElement) === null || _7 === void 0 ? void 0 : _7.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("room12");
                            background.classList.add("room11");
                            new Game(true, true, true, false, 1, 540, 280);
                        }
                    }
                }
                else if (background.classList.contains("shop")) {
                    if (doorS) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorS.getBoundingClientRect())) {
                            console.log("South door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_8 = playerDiv.parentElement) === null || _8 === void 0 ? void 0 : _8.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("shop");
                            background.classList.add("room3");
                            new Game(true, true, true, false, 1, 287, 33);
                        }
                    }
                }
                else if (background.classList.contains("bossroom")) {
                    if (doorN) {
                        if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                            console.log("North door");
                            _this.doors.forEach(function (door) {
                                if (door.div) {
                                    door.div.remove();
                                }
                            });
                            (_9 = playerDiv.parentElement) === null || _9 === void 0 ? void 0 : _9.removeChild(playerDiv);
                            delete (_this.player[0].div);
                            _this.player.splice(0, 1);
                            games.splice(0, 1);
                            background.classList.remove("bossroom");
                            background.classList.add("room11");
                            new Game(true, true, true, false, 1, 287, 527);
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
window.addEventListener("load", function () { return games.push(new Game(false, false, true, false, 0, 300, 400)); });
//# sourceMappingURL=main.js.map