function drawHeader(game) {
    return "Hello, Last Builder. You currenly have: $" + game.currency;
}
function drawBuildings() {
    var dom = document.getElementById('buildings-menu');
    for (var i = 0; i < defBuildings.length; i++) {
        var btn = document.createElement("BUTTON");
        var btxt = document.createTextNode(defBuildings[i].name);
        btn.appendChild(btxt);
        dom.appendChild(btn);
    }
}
function setupBuildings() {
    for (var i = 0; i < defBuildings.length; i++) {
        var build = new Building(defBuildings[i]);
        game.buildings.push(build);
    }
}
function addBuilding() {
}
var LastData = (function () {
    function LastData() {
        this.currency = 0;
        console.log('Game data constructed');
    }
    ;
    return LastData;
}());
var Building = (function () {
    function Building(input) {
        var _this = this;
        this.id = undefined;
        this.name = undefined;
        this.cost = undefined;
        this.production = undefined;
        this.button = undefined;
        this.count = 0;
        this.costGrowth = 1.1;
        this.check = function () {
            if (_this.cost > game.currency) {
                _this.button.disabled = true;
            }
            else {
                _this.button.disabled = false;
            }
        };
        this.buy = function () {
            if (_this.cost <= game.currency) {
                game.currency -= _this.cost;
                _this.count++;
                _this.cost = Math.ceil(_this.cost * _this.costGrowth);
                _this.button.textContent = _this.name + "-" + _this.count + "-" + _this.cost;
                console.log('buy succeded');
            }
            else {
                console.log('buy failed');
            }
            game.render();
        };
        this.id = input.id;
        this.name = input.name;
        this.cost = input.cost;
        this.production = input.production;
        var dom = document.getElementById('buildings-menu');
        this.button = document.createElement('BUTTON');
        this.button.textContent = this.name + "-" + this.count + "-" + this.cost;
        this.button.onclick = this.buy;
        dom.appendChild(this.button);
        console.log('Building made and appended');
    }
    Building.prototype.produce = function () {
        return this.production * this.count;
    };
    return Building;
}());
var defBuildings = [
    {
        id: 1,
        name: "A",
        cost: 10,
        production: 1
    },
    {
        id: 2,
        name: "B",
        cost: 20,
        production: 2
    }
];
var game;
document.addEventListener('DOMContentLoaded', function () {
    game = new Game();
    game.render();
    window.setInterval(game.tick, game.interval);
    //drawBuildings();
    setupBuildings();
});
