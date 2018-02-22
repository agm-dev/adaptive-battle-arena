const Population = require('./Population')
const Battle = require('./Battle')

const population = new Population(10)
//population.printFighters()

population.fighters[0].printStats()
population.fighters[1].printStats()

const battle = new Battle(population.fighters[0], population.fighters[1])

battle.getWinner()

console.log(`Total number of rounds: ${battle.rounds}`)
