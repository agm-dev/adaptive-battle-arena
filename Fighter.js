const Entity = require('./Entity')

class Fighter extends Entity {

  constructor () {
    super()

    this._SOFT_CAP = 40
    this._HARD_CAP = 70

    this._HP_PER_VITALITY = 10
    this._HP_PER_VITALITY_ON_SOFT_CAP = 5
    this._HP_PER_VITALITY_ON_HARD_CAP = 2

    this._STAMINA_PER_ENDURANCE = 1.3
    this._STAMINA_PER_ENDURANCE_ON_SOFT_CAP = 1.1
    this._STAMINA_PER_ENDURANCE_ON_HARD_CAP = 0.8

    this.stats = {
      vitality: this._random(0, 100),
      strength: this._random(0, 100),
      dextery: this._random(0, 100),
      endurance: this._random(0, 100),
      luck: this._random(0, 100),
    }

    this.health = this.maxHealth
    this.stamina = this.maxStamina
  }

  get level () {
    return Object.keys(this.stats).reduce((level, stat) => (level += this.stats[stat]), 0)
  }

  get maxHealth () {
    // health is calculated from vitality, with soft and hard cap:
    let vit = this.stats.vitality
    if (vit <= this._SOFT_CAP) {
      return vit * this._HP_PER_VITALITY
    } else if (vit <= this._HARD_CAP) {
      return this._SOFT_CAP * this._HP_PER_VITALITY + (vit - this._SOFT_CAP) * this._HP_PER_VITALITY_ON_SOFT_CAP
    } else {
      return this._SOFT_CAP * this._HP_PER_VITALITY + (this._HARD_CAP - this._SOFT_CAP) * this._HP_PER_VITALITY_ON_SOFT_CAP + (vit - this._HARD_CAP) * this._HP_PER_VITALITY_ON_HARD_CAP
    }
  }

  get maxStamina () {
    // stamina is calculated from endurance, with soft and hard cap:
    let endurance = this.stats.endurance
    if (endurance <= this._SOFT_CAP) {
      return Math.floor(endurance * this._STAMINA_PER_ENDURANCE)
    } else if (endurance <= this._HARD_CAP) {
      return Math.floor(this._SOFT_CAP * this._STAMINA_PER_ENDURANCE + (endurance - this._SOFT_CAP) * this._STAMINA_PER_ENDURANCE_ON_SOFT_CAP)
    } else {
      return Math.floor(this._SOFT_CAP * this._STAMINA_PER_ENDURANCE + (this._HARD_CAP - this._SOFT_CAP) * this._STAMINA_PER_ENDURANCE_ON_SOFT_CAP + (endurance - this._HARD_CAP) * this._STAMINA_PER_ENDURANCE_ON_HARD_CAP)
    }
  }

  reduceHealth (n) {
    n = n || 0
    if (n > this.health) {
      n = this.health
    }
    this.health -= n
    console.log(`Fighter ${this.id} loses ${n} points of health (current healt: ${this.health})`)
  }

  reduceStamina (n) {
    n = n || 0
    if (n > this.stamina) {
      n = this.stamina
    }
    this.stamina -= n
    console.log(`Fighter ${this.id} loses ${n} points of stamina (current stamina: ${this.stamina})`)
  }

  recoverStamina () {
    let recoverQuantity = this.stats.dextery
    if (this.stamina + recoverQuantity > this.maxStamina) {
      recoverQuantity = this.maxStamina - this.stamina
    }
    this.stamina += recoverQuantity
    console.log(`Fighter ${this.id} recovers ${recoverQuantity} points of stamina (current stamina: ${this.stamina})`)
  }

  printStats () {
    let text = Object.keys(this.stats).reduce((text, stat) => (text += `${stat}: ${this.stats[stat]}\n`), `=== ${this.id} ===\nlevel: ${this.level}\n\n`)
    text += `\nHP: ${this.health}\n`
    text += `Stamina: ${this.stamina}\n`
    console.log(text)
  }


}

module.exports = Fighter

// TODO: implement stats based on initial level, with random distribution of level points per stats

/**
 * vitalidad: indica puntos de vida
 * fuerza: indica valor de daño del golpe
 * destreza: indica valor de recuperación de estamina y probabilidad de esquivar golpe
 * resistencia: indica valor de estamina
 * suerte: indica probabilidad de golpe crítico y probabilidad de esquivar golpe
 *
 * valores combate:
 * - vida
 * - estamina
 *
 * acciones combate:
 * - golpear
 */