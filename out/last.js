class Game {
    constructor() {
        this.tick = () => {
            this.production();
            this.render();
        };
        this.generate = () => {
            this.lastData.currency += 1;
        };
        this.load = () => {
            if (localStorage.getItem("lastData") === null) {
                console.log("Data not found, making new data");
                this.lastData = new LastData();
            }
            else {
                console.log("Data found, loading");
                this.lastData = JSON.parse(localStorage.getItem('lastData'));
            }
        };
        this.save = () => {
            localStorage.setItem('lastData', JSON.stringify(this.lastData));
            console.log('Game data saved');
        };
        this.clear = () => {
            localStorage.clear();
            this.lastData = new LastData();
        };
        this.interval = 100;
        this.decimals = 0;
        this.load();
        this.initHTML();
    }
    ;
    initHTML() {
        document.getElementById('generate-currency').onclick = this.generate;
        document.getElementById('save').onclick = this.save;
        document.getElementById('load').onclick = this.load;
        document.getElementById('clear').onclick = this.clear;
    }
    production() {
        this.lastData.currency += 0;
    }
    render() {
        document.getElementById('header').innerHTML = drawHeader(this);
    }
}
function drawHeader(game) {
    return "Hello, " + game.lastData.currency;
}
class LastData {
    constructor() {
        this.currency = 0;
        console.log('Game data constructed');
    }
}
class Building {
}
document.addEventListener('DOMContentLoaded', function () {
    var game = new Game();
    window.setInterval(game.tick, game.interval);
});
