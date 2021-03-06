'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./games/events')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// const gameEvents = require('./games/events')
//
// $(() => {
//   $('#game-board').on('submit', gamesEvents.onStartGame)
// })

$(() => {
  events.addHandlers() // references functions in events.js without having to define functions here
})
