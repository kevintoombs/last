class Game {
    interval: number;
    decimals: number;
    currency: number = 0;
    buildings: Building[] = [];
    
    lastData: LastData;

    constructor() {
        this.interval = 1000;
        this.decimals = 0;
        this.load();
        this.initHTML();
    };

    tick = () => {
        this.production();
        this.render();
    }

    generate = () => {
        this.currency += 1;
        console.log(this.currency);
        this.render();
    }

    load = () => {
        if (localStorage.getItem("lastData") === null) {
            console.log("Data not found, making new data");
            this.lastData = new LastData();
        } else {
            console.log("Data found, loading");
            this.lastData = JSON.parse(localStorage.getItem('lastData'));
            this.currency = this.lastData.currency;
        }
    }

    save = () => {
        this.lastData.currency = this.currency;
        /*for (var building of this.buildings){
            var build = {id:building.id, count:building.count};
            this.lastData.build.push(build);
        }*/
        localStorage.setItem('lastData', JSON.stringify(this.lastData));
        console.log('Game data saved');
    }

    clear = () => {
        localStorage.clear();
        console.log('Local Storage Cleared');
    }

    initHTML() {
        document.getElementById('generate-currency').onclick = this.generate;
        document.getElementById('save').onclick = this.save;
        document.getElementById('load').onclick = this.load;
        document.getElementById('clear').onclick = this.clear;
    }

    production() {
        for (let i = 0; i < this.buildings.length; i++){
            this.currency += this.buildings[i].produce();
        }
    }

    render() {
        document.getElementById('header').innerHTML = drawHeader(this);
        for (var building of this.buildings){
            building.check();
        }
    }


}