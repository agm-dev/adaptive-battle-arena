const Population = require('./Population')
const Battle = require('./Battle')
const League = require('./League')

const population = new Population(4)
for (let i=0; i<population.fighters.length; i++) {
  population.fighters[i].id = i+1
}

const league = new League(population.fighters)

console.log(league.rating)
console.log('===================')
console.log(league.matches)

/*
population.fighters[0].printStats()
population.fighters[1].printStats()

const battle = new Battle(population.fighters[0], population.fighters[1])

battle.getWinner()

console.log(`Total number of rounds: ${battle.rounds}`)
*/
