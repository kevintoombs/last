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
        var build = new Building(defBuildings[i].id, 0);
        game.buildings.push(build);
    }
}
function addBuilding(build) {
    var building = new Building(build.id, build.count);
    game.buildings.push(building);
}
var LastData = (function () {
    function LastData() {
        this.build = [];
        this.currency = 0;
        console.log('Game data constructed');
    }
    ;
    return LastData;
}());
var Building = (function () {
    function Building(id, count) {
        var _this = this;
        this.id = undefined;
        this.count = 0;
        this.name = undefined;
        this.cost = undefined;
        this.production = undefined;
        this.costGrowth = undefined;
        this.button = undefined;
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
        this.id = id;
        this.count = count;
        this.name = defBuildings[id - 1].name;
        this.costGrowth = defBuildings[id - 1].costGrowth;
        this.cost = defBuildings[id - 1].cost * (Math.pow(this.costGrowth, this.count));
        this.production = defBuildings[id - 1].production;
        var dom = document.getElementById('buildings-menu');
        this.button = document.createElement('BUTTON');
        this.button.textContent = this.name + "-" + this.count + "-" + this.cost;
        this.button.onclick = this.buy;
        dom.appendChild(this.button);
        console.log('Building made and appended');
    }
    Building.prototype.constructor_old = function (input) {
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
    };
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
        costGrowth: 1.1,
        production: 1
    },
    {
        id: 2,
        name: "B",
        cost: 20,
        costGrowth: 1.1,
        production: 2
    }
];
var game;
document.addEventListener('DOMContentLoaded', function () {
    game = new Game();
    game.load();
    game.initHTML();
    game.render();
    window.setInterval(game.tick, game.interval);
    //drawBuildings();
    console.log('Buildings Length: ' + game.buildings.length);
    if (game.buildings.length < 1) {
        setupBuildings();
    }
    ;
});
