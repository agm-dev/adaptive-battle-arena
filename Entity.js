const uuidv1 = require('uuid/v1')

class Entity {

  constructor () {
    this.id = uuidv1()
  }

  _random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

}

module.exports = Entity