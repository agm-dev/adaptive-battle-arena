const Fighter = require('./Fighter')

class Population {

  constructor (n) {
    this.fighters = this._generateFighters(n)
  }

  _generateFighters (n) {
    return [...Array(n)].reduce(container => {
      return [...container, new Fighter()]
    }, [])
  }

  printFighters () {
    this.fighters.map(fighter => fighter.printStats())
  }

}

module.exports = Population