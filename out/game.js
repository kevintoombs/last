var Game = (function () {
    function Game() {
        var _this = this;
        this.currency = 0;
        this.buildings = [];
        this.tick = function () {
            _this.production();
            _this.render();
        };
        this.generate = function () {
            _this.currency += 100;
            console.log(_this.currency);
            _this.render();
        };
        this.load = function () {
            if (localStorage.getItem("lastData") === null) {
                console.log("Data not found, making new data");
                _this.lastData = new LastData();
            }
            else {
                console.log("Data found, loading");
                _this.lastData = JSON.parse(localStorage.getItem('lastData'));
                _this.currency = _this.lastData.currency;
                _this.clearBuildings();
                console.log(_this);
                for (var _i = 0, _a = _this.lastData.build; _i < _a.length; _i++) {
                    var build = _a[_i];
                    addBuilding(build);
                }
            }
        };
        this.save = function () {
            _this.lastData.currency = _this.currency;
            _this.lastData.build = [];
            for (var _i = 0, _a = _this.buildings; _i < _a.length; _i++) {
                var building = _a[_i];
                var build = { id: building.id, count: building.count };
                _this.lastData.build.push(build);
            }
            localStorage.setItem('lastData', JSON.stringify(_this.lastData));
            console.log('Game data saved');
        };
        this.clear = function () {
            localStorage.clear();
            console.log('Local Storage Cleared');
        };
        this.interval = 1000;
        this.decimals = 0;
        this.initHTML();
    }
    ;
    Game.prototype.clearBuildings = function () {
        this.buildings = [];
        document.getElementById('buildings-menu').innerHTML = "buildings:";
    };
    Game.prototype.initHTML = function () {
        document.getElementById('generate-currency').onclick = this.generate;
        document.getElementById('save').onclick = this.save;
        document.getElementById('load').onclick = this.load;
        document.getElementById('clear').onclick = this.clear;
    };
    Game.prototype.production = function () {
        var start = this.currency;
        for (var i = 0; i < this.buildings.length; i++) {
            this.currency += this.buildings[i].produce();
        }
        console.log('made ' + (this.currency - start));
    };
    Game.prototype.render = function () {
        document.getElementById('header').innerHTML = drawHeader(this);
        for (var _i = 0, _a = this.buildings; _i < _a.length; _i++) {
            var building = _a[_i];
            building.check();
        }
    };
    return Game;
}());
