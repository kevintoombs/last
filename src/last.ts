function drawHeader(game) {
    return "Hello, Last Builder. You currenly have: $" + game.currency
}

function drawBuildings() {
    var dom = document.getElementById('buildings-menu');
    for (let i = 0; i < defBuildings.length; i++) {
        let btn = document.createElement("BUTTON");
        var btxt = document.createTextNode(defBuildings[i].name);
        btn.appendChild(btxt);
        dom.appendChild(btn);
    }
}

function setupBuildings() {
    for (let i = 0; i < defBuildings.length; i++) {
        let build = new Building(defBuildings[i].id, 0);
        game.buildings.push(build)
    }
}

function addBuilding(build) {
    let building = new Building(build.id, build.count);
    game.buildings.push(building);
}

class LastData {
    currency: number;
    build: any[] = [];
    constructor() {
        this.currency = 0;
        console.log('Game data constructed')
    };
}

class Building {
    id: number = undefined;
    count: number = 0;
    
    name: string = undefined;
    cost: number = undefined;
    production: number = undefined;
    costGrowth: number = undefined;
    
    button: HTMLButtonElement = undefined;

    constructor(id: number, count: number) {
        this.id = id;
        this.count = count;
        this.name = defBuildings[id - 1].name;
        this.costGrowth = defBuildings[id-1].costGrowth;
        this.cost = defBuildings[id - 1].cost * (this.costGrowth ** this.count);
        this.production = defBuildings[id - 1].production;

        let dom = document.getElementById('buildings-menu');
        this.button = <HTMLButtonElement>document.createElement('BUTTON');
        this.button.textContent = this.name + "-" + this.count + "-" + this.cost;
        this.button.onclick = this.buy;

        dom.appendChild(this.button);
        console.log('Building made and appended');
    }
    constructor_old(input: any) {
        this.id = input.id;
        this.name = input.name;
        this.cost = input.cost;
        this.production = input.production;

        let dom = document.getElementById('buildings-menu');
        this.button = <HTMLButtonElement>document.createElement('BUTTON');
        this.button.textContent = this.name + "-" + this.count + "-" + this.cost;
        this.button.onclick = this.buy;

        dom.appendChild(this.button);
        console.log('Building made and appended');
    }

    check = () => {
        if (this.cost > game.currency) {
            this.button.disabled = true;
        } else {
            this.button.disabled = false;
        }
    }

    buy = () => {
        if (this.cost <= game.currency) {
            game.currency -= this.cost;
            this.count++;
            this.cost = Math.ceil(this.cost * this.costGrowth);
            this.button.textContent = this.name + "-" + this.count + "-" + this.cost;
            console.log('buy succeded');

        } else {
            console.log('buy failed')
        }
        game.render();
    }

    produce() {
        return this.production * this.count;
    }
}

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


var game: Game;
document.addEventListener('DOMContentLoaded', function () {
    game = new Game();
    game.load();
    game.initHTML();
    game.render();
    window.setInterval(game.tick, game.interval);
    //drawBuildings();
    console.log('Buildings Length: ' +game.buildings.length);
    if (game.buildings.length < 1) {
        
        setupBuildings();
    };
})