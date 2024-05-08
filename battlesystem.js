


class BattleSystem {

    static handleFight(attackers, defenders) {
        if (Array.isArray(attackers) && Array.isArray(defenders)) {
            this.shuffle(attackers);
            this.shuffle(defenders);
            for (let i = 0; i < attackers.length + defenders.length; i++) {
                if (i % 2 === 0) {
                    let enemyIndex = this.getRandom(defenders);
                    if (attackers[i].attack(defenders[enemyIndex])) {
                        defenders.splice(defenders[enemyIndex], 1);
                    }
                }
                else {
                    let enemyIndex = this.getRandom(attackers);
                    if (defenders[i].attack(attackers[enemyIndex])) {
                        attackers.splice(attackers[enemyIndex], 1);
                    }
                }
            }
        }
    }
    static getRandom(arr) {
        return Math.floor(Math.random() * arr.length);
    }
    static shuffle(units) {
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
}
class Unit {
    healtpoints;
    dmg;
    armor;
    attack(enemy) {
        let enemyIsDead = false;
        if (enemy instanceof Unit) {
            enemy.healtpoints -= this.dmg;
            if (enemy.healtpoints <= 0) {
                enemyIsDead = true;
            }
        }
        return enemyIsDead;
    }
}
class Archer extends Unit {
    healtpoints = 100;
    dmg = 20;
    armor = 0;
}
class knight extends Unit {
    healtpoints = 200;
    dmg = 5;
    armor = 25;
}
class Lancer extends Unit {
    healtpoints = 150;
    dmg = 10;
    armor = 10;
}