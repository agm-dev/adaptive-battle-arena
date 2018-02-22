const Entity = require('./Entity')

class Battle extends Entity {

  constructor (fighter1, fighter2) {
    super()
    this.fighter1 = fighter1
    this.fighter2 = fighter2
    this.rounds = 0
  }

  _genPriority (fighter) {
    return this._random(0, 100) + fighter.stats.luck
  }

  _calculateFightersOrder () {
    let repeat,
        priorityFighter1,
        priorityFighter2
    do {
      repeat = false
      priorityFighter1 = this._genPriority(this.fighter1)
      priorityFighter2 = this._genPriority(this.fighter2)
      if (priorityFighter1 > priorityFighter2) {
        this.firstFighter = this.fighter1
        this.secondFighter = this.fighter2
        console.log(`Fighter 1 will attack first`)
      } else if (priorityFighter1 < priorityFighter2) {
        this.firstFighter = this.fighter2
        this.secondFighter = this.fighter1
        console.log(`Fighter 2 will attack first`)
      } else {
        repeat = true
      }
    } while (repeat);
  }

  round () {
    this.rounds++
    this._calculateFightersOrder()
    const damage1 = this.firstFighter.stats.strength
    const damage2 = this.secondFighter.stats.strength
    const stamina1 = this.firstFighter.stamina
    const stamina2 = this.secondFighter.stamina
    if (stamina1 >= damage1) {
      this.secondFighter.reduceHealth(damage1)
      this.firstFighter.reduceStamina(damage1)
      if (this.secondFighter.health <= 0) return
    } else {
      this.firstFighter.recoverStamina()
    }
    if (stamina2 >= damage2) {
      this.firstFighter.reduceHealth(damage2)
      this.secondFighter.reduceStamina(damage1)
      if (this.firstFighter.health <= 0) return
    } else {
      this.secondFighter.recoverStamina()
    }
  }

  getWinner () {
    while (this.fighter1.health > 0 && this.fighter2.health > 0) {
      this.round()
    }
    if (this.fighter1.health <= 0) {
      console.log(`The winner is fighter 2: ${this.fighter2.id}`)
      return this.fighter2
    }
    if (this.fighter2.health <= 0) {
      console.log(`The winner is fighter 1: ${this.fighter1.id}`)
      return this.fighter1
    }
    return null
  }

}

module.exports = Battle