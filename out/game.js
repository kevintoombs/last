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
            _this.currency += 1;
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
            }
        };
        this.save = function () {
            _this.lastData.currency = _this.currency;
            /*for (var building of this.buildings){
                var build = {id:building.id, count:building.count};
                this.lastData.build.push(build);
            }*/
            localStorage.setItem('lastData', JSON.stringify(_this.lastData));
            console.log('Game data saved');
        };
        this.clear = function () {
            localStorage.clear();
            console.log('Local Storage Cleared');
        };
        this.interval = 1000;
        this.decimals = 0;
        this.load();
        this.initHTML();
    }
    ;
    Game.prototype.initHTML = function () {
        document.getElementById('generate-currency').onclick = this.generate;
        document.getElementById('save').onclick = this.save;
        document.getElementById('load').onclick = this.load;
        document.getElementById('clear').onclick = this.clear;
    };
    Game.prototype.production = function () {
        for (var i = 0; i < this.buildings.length; i++) {
            this.currency += this.buildings[i].produce();
        }
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
