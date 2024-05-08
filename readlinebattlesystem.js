import readlineSync from 'readline-sync';
import chalk from 'chalk';
class Unit {
    name;
    healtpoints;
    dmg;
    armorbreak;
    armor;
    attackAfterSecons(seconds) {
        setTimeout(attack, 5000);
    }
    attack(unit, chulk, timeout) {
        setTimeout(() => {
            if (unit instanceof Unit) {
                console.log(chulk(`${this.name} greift ${unit.name} an`));
                let reducedarmor = unit.armor - this.armorbreak;
                if (reducedarmor < 0) { reducedarmor = 0; }
                console.log(chulk(`${this.name} fügt ${unit.name} ${this.dmg / 100 * (100 - reducedarmor)} schaden zu`))
                unit.healtpoints -= this.dmg / 100 * (100 - reducedarmor);
                if (unit.healtpoints <= 0) {
                    console.log(chulk(`${unit.name} wurde von ${this.name} besiegt`));
                    return true
                }
                else { return false; }
            }
        }, timeout);

    }
}
class Lancer extends Unit {
    constructor() {
        super();
        this.name = "Lancer";
        this.healtpoints = 30;
        this.dmg = 25;
        this.armorbreak = 75;
        this.armor = 25;
    }
}
class knight extends Unit {
    constructor() {
        super();
        this.name = "Knight";
        this.healtpoints = 60;
        this.dmg = 50;
        this.armorbreak = 0;
        this.armor = 75;
    }
}
class Archer extends Unit {
    constructor() {
        super();
        this.name = "Archer";
        this.healtpoints = 20;
        this.dmg = 80;
        this.armorbreak = 0;
        this.armor = 5;

    }
}
class Viking extends Unit {
    constructor() {
        super();
        this.name = "Viking";
        this.healtpoints = 100;
        this.dmg = 30;
        this.armorbreak = 30;
        this.armor = 20;
    }
}
function getRandom(arr) {
    return Math.floor(Math.random() * arr.length);
}
function shuffle(units) {
    // Fisher-Yates-Shuffle , mischt das Array zufaellig durch
    if (Array.isArray(units)) {
        for (let i = units.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [units[i], units[j]] = [units[j], units[i]];
        }
    }
    // gibt neu gemischtes array zurück
    return units;
}
//
function handleFight(attackers, defenders) {
    shuffle(attackers);
    shuffle(defenders);
    let count = 0;
    let attackerCount = 0;
    let defenderCount = 0;
    if (Array.isArray(attackers) && Array.isArray(defenders)) {
        while (attackers.length > 0 && defenders.length > 0) {
            if (count % 2 === 0) {
                let enemyIndex = getRandom(defenders);
                if (attackers[attackerCount] instanceof Unit) {
                    if (attackers[attackerCount].attack(defenders[enemyIndex], chalk.green, 1000)) {
                        defenders.splice(enemyIndex, 1);
                        attackerCount++;
                    }
                }

            }
            else {
                let enemyIndex = getRandom(attackers);
                if (defenders[defenderCount] instanceof Unit) {
                    if (defenders[defenderCount].attack(attackers[enemyIndex], chalk.red, 1000)) {
                        attackers.splice(enemyIndex, 1);
                        defenderCount++;
                    }
                }

            }
            if (attackers.length <= attackerCount) {
                attackerCount = 0;
            }
            if (defenders.length <= defenderCount) {
                defenderCount = 0;
            }
            console.log(attackers.length);
            console.log(defenders.length);
            count++;
        }
        if (defenders.length === 0) {
            console.log("die angreifer haben gewonnen");
        }
        else {
            console.log("die verteidiger haben gewonnen");
        }
    }
}
function createWarriors(warriorName, teamName) {
    console.log(`wie viele ${warriorName}s soll es im ${teamName} geben ?`)
    let input;
    while (true) {
        input = readlineSync.question();
        console.clear();
        if (!isNaN(input)) {
            console.log(`es gibt ${input} ${warriorName}s`);
            break;
        }
        else {
            console.log("bitte gib eine zahl ein")
            continue;
        }
    }
    if (input < 0) {
        console.log("die anzahl wurde auf 0 aufgerundet");
        input = 0;
    }
    return input;
}

function addUnits(arrayToAdd, UnitType, count) {
    for (let i = 0; i < count; i++) {
        arrayToAdd.push(new UnitType());
    }
}
console.clear();
let attackers = [];
let defenders = [];
while (true) {

    addUnits(attackers, knight, createWarriors("Knight", "Angreiferteam"));
    addUnits(attackers, Lancer, createWarriors("Lancer", "Angreiferteam"));
    addUnits(attackers, Archer, createWarriors("Archer", "Angreiferteam"));
    addUnits(attackers, Viking, createWarriors("Viking", "Angreiferteam"));

    addUnits(defenders, knight, createWarriors("Knight", "Verteidigerteam"));
    addUnits(defenders, Lancer, createWarriors("Lancer", "Verteidigerteam"));
    addUnits(defenders, Archer, createWarriors("Archer", "Verteidigerteam"));
    addUnits(defenders, Viking, createWarriors("Viking", "Verteidigerteam"));
    console.clear();
    handleFight(attackers, defenders);
    //console.log(attackers[2].attack(defenders[2]))
    break;
}
