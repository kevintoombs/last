class Game {
    interval: number;
    decimals: number;
    lastData: LastData;

    constructor() {
        this.interval = 100;
        this.decimals = 0;
        this.load();
        this.initHTML();
    };

    tick = () => {
        this.production();
        this.render();
    }

    generate = () => {
        this.lastData.currency += 1;
    }

    load = () => {
        if (localStorage.getItem("lastData") === null) {
            console.log("Data not found, making new data");
            this.lastData = new LastData();
        } else {
            console.log("Data found, loading");
            this.lastData = JSON.parse(localStorage.getItem('lastData'));
        }
    }

    save = () => {
        localStorage.setItem('lastData', JSON.stringify(this.lastData));
        console.log('Game data saved')
    }

    clear = () => {
        localStorage.clear();
        this.lastData = new LastData();
    }

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

function drawHeader(game: Game) {
    return "Hello, " + game.lastData.currency;
}

class LastData {
    currency: number
    constructor() {
        this.currency = 0;
        console.log('Game data constructed')
    }
}

abstract class Building {
    name: string;
    cost: number;
    abstract produce(): number;
}


document.addEventListener('DOMContentLoaded', function () {
    var game = new Game();
    window.setInterval(game.tick, game.interval);
})