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
        this.calculateDirection(targetX, targetY);
        if (shooter === "Player") {
            this.div = document.createElement("playerBullet");
        }
        if (shooter === "Pigeon") {
            this.div = document.createElement("pigeonBullet");
        }
        if (shooter === "GodFeather") {
            this.div = document.createElement("godFeatherBullet");
        }
        if (shooter === "Squawking") {
            this.div = document.createElement("squawkingBullet");
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
            this.div.style.transform = "translate(270px, 5px)";
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
    function Player(g, x, y, health) {
        var _this = this;
        this.name = "Player";
        this.x = 300;
        this.y = 300;
        this.range = 500;
        this.bulletSpeed = 200;
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
        this.health = health;
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
        this.reload = 1200;
        this.damage = 1;
        this.bulletSpeed = 150;
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
var GodFeather = (function () {
    function GodFeather(g, p) {
        var _this = this;
        this.name = "GodFeather";
        this.range = 500;
        this.reload = 500;
        this.damage = 1;
        this.bulletSpeed = 150;
        this.speedX = 1;
        this.speedY = 1;
        this.health = 7;
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
                _this.game.bulletsGodFeather.push(new Bullet(_this.x, _this.y, _this.player.getX(), _this.player.getY(), _this.range, _this.bulletSpeed, _this.damage, _this.name));
                _this.addBullet();
            }
        };
        var x = this.x = randomPosition();
        var y = this.y = randomPosition();
        this.game = g;
        this.player = p;
        this.div = document.createElement("godFeather");
        gameElement.appendChild(this.div);
        this.div.style.transform = "translate(" + x + "px, " + y + "px)";
    }
    GodFeather.prototype.update = function () {
        if (this.x >= gameElement.clientWidth - 79 || this.x <= 30) {
            this.speedX *= -1;
        }
        if (this.y >= gameElement.clientHeight - 109 || this.y <= 30) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GodFeather;
}());
var Squawking = (function () {
    function Squawking(g, p) {
        var _this = this;
        this.name = "Squawking";
        this.range = 350;
        this.reload = 500;
        this.damage = 1;
        this.bulletSpeed = 200;
        this.speedX = 2;
        this.speedY = 2;
        this.health = 10;
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
                _this.addBullet();
                _this.game.bulletsSquawking.push(new Bullet(_this.x, _this.y, _this.player.getX(), _this.player.getY(), _this.range, _this.bulletSpeed, _this.damage, _this.name));
            }
        };
        var x = this.x = randomPosition();
        var y = this.y = randomPosition();
        this.game = g;
        this.player = p;
        this.div = document.createElement("squawking");
        gameElement.appendChild(this.div);
        this.div.style.transform = "translate(" + x + "px, " + y + "px)";
    }
    Squawking.prototype.update = function () {
        if (this.x >= gameElement.clientWidth - 122 || this.x <= 30) {
            this.speedX *= -1;
        }
        if (this.y >= gameElement.clientHeight - 116 || this.y <= 30) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Squawking;
}());
var gameElement = document.getElementsByTagName("game")[0];
function randomPosition() {
    return Math.floor(Math.random() * 400 + 70);
}
var Game = (function () {
    function Game(doorN, doorE, doorS, doorW, amountOfPigeons, amountOfGodFeathers, amountOfSquawkings, playerX, playerY, playerhealth, tutorial, score) {
        var _this = this;
        this.pigeons = [];
        this.bulletsPigeon = [];
        this.player = [];
        this.bulletsPlayer = [];
        this.godFeathers = [];
        this.bulletsGodFeather = [];
        this.squawkings = [];
        this.bulletsSquawking = [];
        this.tutorialCounter = 0;
        this.doors = [];
        this.doorsLocked = true;
        this.score = 0;
        this.gameLoop = function () {
            if (_this.player[0]) {
                _this.player[0].update();
            }
            if (_this.pigeons) {
                _this.pigeons.forEach(function (pigeon) { pigeon.update(); });
            }
            if (_this.godFeathers) {
                _this.godFeathers.forEach(function (godFeather) { godFeather.update(); });
            }
            if (_this.squawkings) {
                _this.squawkings.forEach(function (squawking) { squawking.update(); });
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
                        window.location.replace("/Project-Pigeon/dead.html");
                    }
                }
                bulletPigeon.update();
            });
            _this.bulletsGodFeather.forEach(function (bulletGodFeather) {
                var _a, _b;
                if (_this.checkCollision(bulletGodFeather.getRectangle(), _this.player[0].getRectangle())) {
                    var bulletGodFeatherDiv = bulletGodFeather.getDiv();
                    (_a = bulletGodFeatherDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletGodFeatherDiv);
                    _this.player[0].setHealth(-bulletGodFeather.getDamage());
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
                        window.location.replace("/Project-Pigeon/dead.html");
                    }
                }
                bulletGodFeather.update();
            });
            _this.bulletsSquawking.forEach(function (bulletSquawking) {
                var _a, _b;
                if (_this.checkCollision(bulletSquawking.getRectangle(), _this.player[0].getRectangle())) {
                    var bulletSquawkingDiv = bulletSquawking.getDiv();
                    (_a = bulletSquawkingDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletSquawkingDiv);
                    _this.player[0].setHealth(-bulletSquawking.getDamage());
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
                        window.location.replace("/Project-Pigeon/dead.html");
                    }
                }
                bulletSquawking.update();
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
                            _this.score++;
                            var scoreElement = document.getElementsByTagName("score")[0];
                            scoreElement.innerHTML = "Score: " + _this.score;
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
            _this.bulletsPlayer.forEach(function (bulletPlayer) {
                var _a, _b;
                for (var index = 0; index < _this.godFeathers.length; index++) {
                    if (_this.checkCollision(bulletPlayer.getRectangle(), _this.godFeathers[index].getRectangle())) {
                        var bulletPlayerDiv = bulletPlayer.getDiv();
                        (_a = bulletPlayerDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletPlayerDiv);
                        _this.godFeathers[index].setHealth(-bulletPlayer.getDamage());
                        if (_this.godFeathers[index].getHealth() === 0) {
                            console.log("GodFeather dies");
                            _this.score += 10;
                            var scoreElement = document.getElementsByTagName("score")[0];
                            scoreElement.innerHTML = "Score: " + _this.score;
                            var godFeatherDiv = _this.godFeathers[index].getDiv();
                            (_b = godFeatherDiv.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(godFeatherDiv);
                            _this.godFeathers.splice(index, 1);
                        }
                    }
                }
                if (_this.player[0]) {
                    bulletPlayer.update();
                }
            });
            _this.bulletsPlayer.forEach(function (bulletPlayer) {
                var _a, _b;
                for (var index = 0; index < _this.squawkings.length; index++) {
                    if (_this.checkCollision(bulletPlayer.getRectangle(), _this.squawkings[index].getRectangle())) {
                        var bulletPlayerDiv = bulletPlayer.getDiv();
                        (_a = bulletPlayerDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletPlayerDiv);
                        _this.squawkings[index].setHealth(-bulletPlayer.getDamage());
                        if (_this.squawkings[index].getHealth() === 0) {
                            console.log("Squawking dies");
                            _this.score += 10;
                            var scoreElement = document.getElementsByTagName("score")[0];
                            scoreElement.innerHTML = "Score: " + _this.score;
                            var squawkingDiv = _this.squawkings[index].getDiv();
                            (_b = squawkingDiv.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(squawkingDiv);
                            _this.squawkings.splice(index, 1);
                        }
                    }
                }
                if (_this.player[0]) {
                    bulletPlayer.update();
                }
            });
            if (_this.pigeons.length === 0 && _this.godFeathers.length === 0 && _this.squawkings.length === 0 && _this.doorsLocked === true) {
                console.log("Opening doors");
                _this.doorsLocked = false;
            }
            if (_this.doorsLocked === false) {
                var background = document.getElementsByTagName("background")[0];
                if (background.classList.contains("spawn-1")) {
                    _this.enterNewRoom("N", "spawn-1", "room1-1", false, true, true, false);
                }
                if (background.classList.contains("room1-1")) {
                    _this.enterNewRoom("E", "room1-1", "room2-1", false, true, false, true);
                    _this.enterNewRoom("S", "room1-1", "spawn-1", true, false, false, false);
                }
                if (background.classList.contains("room2-1")) {
                    _this.enterNewRoom("E", "room2-1", "room3-1", true, false, true, true);
                    _this.enterNewRoom("W", "room2-1", "room1-1", false, true, true, false);
                }
                if (background.classList.contains("room3-1")) {
                    _this.enterNewRoom("N", "room3-1", "room4-1", false, true, true, false);
                    _this.enterNewRoom("S", "room3-1", "room6-1", true, true, false, false);
                    _this.enterNewRoom("W", "room3-1", "room2-1", false, true, false, true);
                }
                if (background.classList.contains("room4-1")) {
                    _this.enterNewRoom("E", "room4-1", "room5-1", false, false, false, true);
                    _this.enterNewRoom("S", "room4-1", "room3-1", true, false, true, true);
                }
                if (background.classList.contains("room5-1")) {
                    _this.enterNewRoom("W", "room5-1", "room4-1", false, true, true, false);
                }
                if (background.classList.contains("room6-1")) {
                    _this.enterNewRoom("N", "room6-1", "room3-1", true, false, true, true);
                    _this.enterNewRoom("E", "room6-1", "room7-1", true, false, true, true);
                }
                if (background.classList.contains("room7-1")) {
                    _this.enterNewRoom("N", "room7-1", "bossroom-1", false, true, true, false);
                    _this.enterNewRoom("S", "room7-1", "shop-1", true, false, false, false);
                }
                if (background.classList.contains("shop-1")) {
                    _this.enterNewRoom("N", "shop-1", "room7-1", true, false, true, true);
                }
                if (background.classList.contains("bossroom-1")) {
                    _this.enterNewRoom("E", "bossroom-1", "spawn-2", true, false, true, true);
                    _this.enterNewRoom("S", "bossroom-1", "room7-1", true, false, true, true);
                }
                if (background.classList.contains("spawn-2")) {
                    _this.enterNewRoom("N", "spawn-2", "room1-2", true, false, true, true);
                    _this.enterNewRoom("S", "spawn-2", "room10-2", true, false, false, false);
                    _this.enterNewRoom("W", "spawn-2", "room3-2", false, true, false, false);
                }
                else if (background.classList.contains("room1-2")) {
                    _this.enterNewRoom("N", "room1-2", "room4-2", true, true, true, false);
                    _this.enterNewRoom("S", "room1-2", "spawn-2", true, false, true, true);
                    _this.enterNewRoom("W", "room1-2", "room2-2", false, true, false, false);
                }
                else if (background.classList.contains("room2-2")) {
                    _this.enterNewRoom("E", "room2-2", "room1-2", true, false, true, true);
                }
                else if (background.classList.contains("room3-2")) {
                    _this.enterNewRoom("E", "room3-2", "spawn-2", true, false, true, true);
                }
                else if (background.classList.contains("room4-2")) {
                    _this.enterNewRoom("N", "room4-2", "shop-2", false, false, true, false);
                    _this.enterNewRoom("E", "room4-2", "room5-2", true, false, false, true);
                    _this.enterNewRoom("S", "room4-2", "room1-2", true, false, true, true);
                }
                else if (background.classList.contains("room5-2")) {
                    _this.enterNewRoom("N", "room5-2", "room6-2", true, true, true, false);
                    _this.enterNewRoom("W", "room5-2", "room4-2", true, true, true, false);
                }
                else if (background.classList.contains("room6-2")) {
                    _this.enterNewRoom("N", "room6-2", "room8-2", true, false, true, false);
                    _this.enterNewRoom("E", "room6-2", "room7-2", false, false, false, true);
                    _this.enterNewRoom("S", "room6-2", "room5-2", true, false, false, true);
                }
                else if (background.classList.contains("room7-2")) {
                    _this.enterNewRoom("W", "room7-2", "room6-2", true, true, true, false);
                }
                else if (background.classList.contains("room8-2")) {
                    _this.enterNewRoom("N", "room8-2", "room9-2", false, true, true, false);
                    _this.enterNewRoom("S", "room8-2", "room6-2", true, true, true, false);
                }
                else if (background.classList.contains("room9-2")) {
                    _this.enterNewRoom("E", "room9-2", "bossroom-2", false, true, false, true);
                    _this.enterNewRoom("S", "room9-2", "room8-2", true, false, true, false);
                }
                else if (background.classList.contains("room10-2")) {
                    _this.enterNewRoom("N", "room10-2", "spawn-2", true, false, true, true);
                }
                else if (background.classList.contains("shop-2")) {
                    _this.enterNewRoom("S", "shop-2", "room4-2", true, true, true, false);
                }
                else if (background.classList.contains("bossroom-2")) {
                    _this.enterNewRoom("E", "bossroom-2", "spawn-3", true, false, true, true);
                    _this.enterNewRoom("W", "bossroom-2", "room9-2", false, true, true, false);
                }
                if (background.classList.contains("spawn-3")) {
                    _this.enterNewRoom("N", "spawn-3", "room4-3", false, true, true, true);
                    _this.enterNewRoom("S", "spawn-3", "room8-3", true, true, false, false);
                    _this.enterNewRoom("W", "spawn-3", "room1-3", true, true, false, true);
                }
                else if (background.classList.contains("room1-3")) {
                    _this.enterNewRoom("N", "room1-3", "room3-3", true, true, false, false);
                    _this.enterNewRoom("E", "room1-3", "spawn-3", true, false, true, true);
                    _this.enterNewRoom("W", "room1-3", "room2-3", false, true, false, false);
                }
                else if (background.classList.contains("room2-3")) {
                    _this.enterNewRoom("E", "room2-3", "room1-3", true, true, false, true);
                }
                else if (background.classList.contains("room3-3")) {
                    _this.enterNewRoom("N", "room3-3", "shop-3", false, false, true, false);
                    _this.enterNewRoom("E", "room3-3", "room4-3", false, true, true, true);
                    _this.enterNewRoom("S", "room3-3", "room1-3", true, true, false, true);
                }
                else if (background.classList.contains("room4-3")) {
                    _this.enterNewRoom("E", "room4-3", "room5-3", false, true, false, true);
                    _this.enterNewRoom("S", "room4-3", "spawn-3", true, false, true, true);
                    _this.enterNewRoom("W", "room4-3", "room3-3", true, true, true, false);
                }
                else if (background.classList.contains("room5-3")) {
                    _this.enterNewRoom("E", "room5-3", "room6-3", false, false, true, true);
                    _this.enterNewRoom("W", "room5-3", "room4-3", false, true, true, true);
                }
                else if (background.classList.contains("room6-3")) {
                    _this.enterNewRoom("S", "room6-3", "room7-3", true, false, true, false);
                    _this.enterNewRoom("W", "room6-3", "room5-3", false, true, false, true);
                }
                else if (background.classList.contains("room7-3")) {
                    _this.enterNewRoom("N", "room7-3", "room6-3", false, false, true, true);
                    _this.enterNewRoom("S", "room7-3", "room10-3", true, false, true, true);
                }
                else if (background.classList.contains("room8-3")) {
                    _this.enterNewRoom("N", "room8-3", "spawn-3", true, false, true, true);
                    _this.enterNewRoom("E", "room8-3", "room9-3", false, true, true, true);
                }
                else if (background.classList.contains("room9-3")) {
                    _this.enterNewRoom("E", "room9-3", "room10-3", true, false, true, true);
                    _this.enterNewRoom("S", "room9-3", "room11-3", true, true, true, false);
                }
                else if (background.classList.contains("room10-3")) {
                    _this.enterNewRoom("N", "room10-3", "room7-3", true, false, true, false);
                    _this.enterNewRoom("S", "room10-3", "room12-3", true, false, false, true);
                    _this.enterNewRoom("W", "room10-3", "room9-3", false, true, true, true);
                }
                else if (background.classList.contains("room11-3")) {
                    _this.enterNewRoom("N", "room11-3", "room9-3", false, true, true, true);
                    _this.enterNewRoom("E", "room11-3", "room12-3", true, false, false, true);
                    _this.enterNewRoom("S", "room11-3", "bossroom-3", true, true, false, false);
                }
                else if (background.classList.contains("room12-3")) {
                    _this.enterNewRoom("N", "room12-3", "room10-3", true, false, true, true);
                    _this.enterNewRoom("W", "room12-3", "room11-3", true, true, true, false);
                }
                else if (background.classList.contains("shop-3")) {
                    _this.enterNewRoom("S", "shop-3", "room3-3", true, true, true, false);
                }
                else if (background.classList.contains("bossroom-3")) {
                    _this.enterNewRoom("N", "bossroom-3", "room11-3", true, true, true, false);
                    _this.enterNewRoom("E", "bossroom-3", "spawn-1", true, false, false, false);
                }
            }
            requestAnimationFrame(function () { return _this.gameLoop(); });
        };
        this.enterNewRoom = function (direction, currentRoom, newRoom, newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW) {
            var background = document.getElementsByTagName("background")[0];
            var doorN = document.getElementsByTagName("doorN")[0];
            var doorE = document.getElementsByTagName("doorE")[0];
            var doorS = document.getElementsByTagName("doorS")[0];
            var doorW = document.getElementsByTagName("doorW")[0];
            var playerHealth = _this.player[0].getHealth();
            var amountOfPigeons = 2;
            var amountOfGodFeathers = 0;
            var amountOfSquawkings = 0;
            var lvl = newRoom.slice(-1);
            if (lvl === "1") {
                amountOfPigeons = 1;
            }
            if (lvl === "2") {
                amountOfPigeons = 2;
            }
            if (lvl === "3") {
                amountOfPigeons = 3;
            }
            if (newRoom === "bossroom-1" || newRoom === "bossroom-2" || newRoom === "bossroom-3") {
                amountOfPigeons *= 2;
            }
            if (newRoom === "bossroom-2") {
                amountOfGodFeathers = 1;
            }
            if (newRoom === "bossroom-3") {
                amountOfSquawkings = 1;
            }
            if (newRoom === "spawn-1" || newRoom === "spawn-2" || newRoom === "spawn-3" ||
                newRoom === "shop-1" || newRoom === "shop-2" || newRoom === "shop-3") {
                amountOfPigeons = 0;
            }
            if (direction === "N") {
                if (doorN) {
                    if (_this.checkCollision(_this.player[0].getRectangle(), doorN.getBoundingClientRect())) {
                        console.log("North door to " + newRoom);
                        _this.removeDoorBulletPlayerGame();
                        background.classList.remove(currentRoom);
                        background.classList.add(newRoom);
                        new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, amountOfGodFeathers, amountOfSquawkings, 287, 500, playerHealth, false, _this.score);
                    }
                }
            }
            if (direction === "E") {
                if (doorE) {
                    if (_this.checkCollision(_this.player[0].getRectangle(), doorE.getBoundingClientRect())) {
                        console.log("East door to " + newRoom);
                        _this.removeDoorBulletPlayerGame();
                        background.classList.remove(currentRoom);
                        background.classList.add(newRoom);
                        new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, amountOfGodFeathers, amountOfSquawkings, 66, 280, playerHealth, false, _this.score);
                        if (currentRoom === "bossroom-1") {
                            var musicplayer = document.getElementById("musicplayer");
                            musicplayer === null || musicplayer === void 0 ? void 0 : musicplayer.setAttribute("src", "/Project-Pigeon/audio/GodFeather.mp3");
                            console.log("Change music");
                        }
                        if (currentRoom === "bossroom-2") {
                            var musicplayer = document.getElementById("musicplayer");
                            musicplayer === null || musicplayer === void 0 ? void 0 : musicplayer.setAttribute("src", "/Project-Pigeon/audio/StephenSquawking.mp3");
                            console.log("Change music");
                        }
                        if (currentRoom === "bossroom-3") {
                            window.location.replace("/Project-Pigeon/endscreen.html");
                        }
                    }
                }
            }
            if (direction === "S") {
                if (doorS) {
                    if (_this.checkCollision(_this.player[0].getRectangle(), doorS.getBoundingClientRect())) {
                        console.log("South door to " + newRoom);
                        _this.removeDoorBulletPlayerGame();
                        background.classList.remove(currentRoom);
                        background.classList.add(newRoom);
                        new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, amountOfGodFeathers, amountOfSquawkings, 287, 66, playerHealth, false, _this.score);
                    }
                }
            }
            if (direction === "W") {
                if (doorW) {
                    if (_this.checkCollision(_this.player[0].getRectangle(), doorW.getBoundingClientRect())) {
                        console.log("East door to " + newRoom);
                        _this.removeDoorBulletPlayerGame();
                        background.classList.remove(currentRoom);
                        background.classList.add(newRoom);
                        new Game(newRoomDoorN, newRoomDoorE, newRoomDoorS, newRoomDoorW, amountOfPigeons, amountOfGodFeathers, amountOfSquawkings, 500, 280, playerHealth, false, _this.score);
                    }
                }
            }
        };
        this.removeDoorBulletPlayerGame = function () {
            var _a;
            _this.doors.forEach(function (door) {
                if (door.div) {
                    door.div.remove();
                }
            });
            _this.bulletsPigeon.forEach(function (bulletsPigeon) {
                var _a;
                var bulletElement = bulletsPigeon.getDiv();
                if (bulletElement) {
                    (_a = bulletElement.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletElement);
                }
            });
            _this.bulletsGodFeather.forEach(function (bulletsGodFeather) {
                var _a;
                var bulletElement = bulletsGodFeather.getDiv();
                if (bulletElement) {
                    (_a = bulletElement.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletElement);
                }
            });
            _this.bulletsPlayer.forEach(function (bulletsPlayer) {
                var _a;
                var bulletElement = bulletsPlayer.getDiv();
                if (bulletElement) {
                    (_a = bulletElement.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(bulletElement);
                }
            });
            var playerDiv = _this.player[0].getDiv();
            (_a = playerDiv.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(playerDiv);
            delete (_this.player[0].div);
            _this.player.splice(0, 1);
            games.splice(0, 1);
        };
        this.checkCollision = function (a, b) {
            return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom);
        };
        console.log("Game was created!");
        this.score = score;
        if (tutorial === true) {
            if (this.tutorialCounter == 0) {
                this.tutorialCounter++;
                new Tutorial();
            }
        }
        this.doors.push(new Door("North", doorN));
        this.doors.push(new Door("East", doorE));
        this.doors.push(new Door("South", doorS));
        this.doors.push(new Door("West", doorW));
        this.player.push(new Player(this, playerX, playerY, playerhealth));
        for (var i = 0; i < amountOfPigeons; i++) {
            this.pigeons.push(new Pigeon(this, this.player[0]));
        }
        for (var i = 0; i < amountOfGodFeathers; i++) {
            this.godFeathers.push(new GodFeather(this, this.player[0]));
        }
        for (var i = 0; i < amountOfSquawkings; i++) {
            this.squawkings.push(new Squawking(this, this.player[0]));
        }
        for (var i = 0; i < this.pigeons.length; i++) {
            setInterval(this.pigeons[i].createBullet, this.pigeons[i].getReload());
        }
        for (var i = 0; i < this.godFeathers.length; i++) {
            setInterval(this.godFeathers[i].createBullet, this.godFeathers[i].getReload());
        }
        for (var i = 0; i < this.squawkings.length; i++) {
            setInterval(this.squawkings[i].createBullet, this.squawkings[i].getReload());
        }
        this.gameLoop();
    }
    return Game;
}());
var games = [];
window.addEventListener("load", function () { return games.push(new Game(true, false, false, false, 0, 0, 0, 300, 300, 3, true, 0)); });
var Tutorial = (function () {
    function Tutorial() {
        var _this = this;
        this.doTutorial = true;
        this.createTutorial();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Tutorial.prototype.createTutorial = function () {
        var gameElement = document.getElementsByTagName("game")[0];
        this.tutorialElement = document.createElement("tutorial");
        gameElement.appendChild(this.tutorialElement);
        this.tutorialElement.innerHTML = "Press WASD to move";
    };
    Tutorial.prototype.onKeyDown = function (e) {
        var _this = this;
        if (this.doTutorial == true) {
            if (e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 65 || e.keyCode == 68) {
                this.doTutorial = false;
                setTimeout(function () { return _this.removeTutorial(0); }, 1000);
                console.log(this.doTutorial);
            }
        }
        setTimeout(function () { return _this.removeTutorial(1); }, 3000);
    };
    Tutorial.prototype.removeTutorial = function (a) {
        if (a == 0) {
            this.tutorialElement.innerHTML = "";
            this.createTutorial2();
            console.log("uitgevoerd!");
        }
        else if (a == 1) {
            this.tutorialElement.remove();
        }
    };
    Tutorial.prototype.createTutorial2 = function () {
        this.tutorialElement.innerHTML = "Click to shoot";
    };
    return Tutorial;
}());
//# sourceMappingURL=main.js.map