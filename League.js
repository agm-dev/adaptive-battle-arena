/**
 * League system works like this:
 * For 5 teams (1,2,3,4,5)
 *
 * ODD (full rotation clockwise)
 * First rotation
 * 1,2
 * 3,4
 * 5
 *
 * Second rotation
 * 3,1
 * 5,2
 * 4
 *
 * Third rotation
 * 5,3
 * 4,1
 * 2
 *
 * Last rotation
 * 4,5
 * 2,3
 * 1
 *
 * EVEN (the same, but first one never rotates)
 * First rotation
 * 1,2
 * 3,4
 *
 * Second rotation
 * 1,3
 * 4,2
 *
 */


 class League {

  constructor (population) {
    population = population || [] // array of fighter instances
    this.population = population.reduce((ids, fighter) => [...ids, fighter.id], [])
    this.rating = this._generateInitalRating(this.population)
    this.matches = this._generateMatches(this.population)

    this._POINTS_PER_VICTORY = 3
    this._POINTS_PER_TIE = 1
    this._POINTS_PER_DEFEAT = 0
  }

  /**
   * Method to generate intial scores table
   */
  _generateInitalRating (population) {
    return population.reduce((rating, fighter) => {
      const fighterRating = {}
      fighterRating[fighter] = {
        fights: 0,
        wins: 0,
        ties: 0,
        defeats: 0,
      }
      return Object.assign(fighterRating, rating)
    }, {})
  }

  /**
   * Method to generate matches
   * Matches is an array with N arrays,
   * where N is a 'league day', which contains
   * M arrays, where M is a match for that 'league day'
   */
  _generateMatches (population) {
    population = population || []
    if (population.length % 2 === 0) { // even
      return this._generateEvenMatches(population)
    } else {
      return [] // TODO: _generateOddMatches
    }
  }

  /**
   * This generates an array with N arrays
   * where N represents a league day, and
   * this one contains M arrays where M
   * represents matches
   */
  _generateEvenMatches (population) {
    population = population || [] // this must contain only ids of population instances
    const rotations = population.length - 1
    const leagueDays = []
    const firstLeagueDay = this._generateMatchesInLeagueDay(population)
    leagueDays.push(firstLeagueDay) // first league day is the given order
    for (let i=1; i<rotations; i++) { // we must jump over first iteration
      const firstOne = population[0]
      const rotators = population.slice(1)
      const toTheEnd = rotators[0]
      const remaining = rotators.slice(1)
      const rotated = [...remaining, toTheEnd]
      population = [firstOne, ...rotated]
      const matches = this._generateMatchesInLeagueDay(population)
      leagueDays.push(matches)
    }
    return leagueDays
  }

  _generateMatchesInLeagueDay (leagueDay) {
    leagueDay = leagueDay || []
    const matches = []
    for (let i=0; i<leagueDay.length; i+=2) {
      matches.push([leagueDay[i], leagueDay[i+1]])
    }
    return matches
  }

  /**
   * Method to play the league and calculate
   * the final state of fighters
   */
  resolve () {}

  getFirsts (n) {}

}

module.exports = League