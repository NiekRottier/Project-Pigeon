"use strict";
var Narrative = (function () {
    function Narrative() {
        this.body = document.getElementsByTagName("body")[0];
        this.createNarrative1();
    }
    Narrative.prototype.createNarrative1 = function () {
        var _this = this;
        var narrative1 = document.createElement("narrative1");
        this.body.appendChild(narrative1);
        setTimeout(function () { return _this.createNarrative2(); }, 10000);
    };
    Narrative.prototype.createNarrative2 = function () {
        var _this = this;
        var narrative2 = document.createElement("narrative2");
        this.body.appendChild(narrative2);
        setTimeout(function () { return _this.createNarrative3(); }, 10000);
    };
    Narrative.prototype.createNarrative3 = function () {
        var _this = this;
        var narrative3 = document.createElement("narrative3");
        this.body.appendChild(narrative3);
        setTimeout(function () { return _this.createNarrative4(); }, 10000);
    };
    Narrative.prototype.createNarrative4 = function () {
        var _this = this;
        var narrative4 = document.createElement("narrative4");
        this.body.appendChild(narrative4);
        setTimeout(function () { return _this.moveToIndex(); }, 10000);
    };
    Narrative.prototype.moveToIndex = function () {
        window.location.replace("/w5/docs/index.html");
    };
    return Narrative;
}());
window.addEventListener("load", function () { return new Narrative(); });
//# sourceMappingURL=main.js.map