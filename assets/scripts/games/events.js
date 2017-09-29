'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  console.log('in events.js ', data) // data comes from the getFormFields function above; contains email, password, password_confirmation
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  console.log('in events.js ', data) // data comes from the getFormFields function above; contains email, password, password_confirmation
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  console.log('in events.js ', data) // data comes from the getFormFields function above; contains old password, new password
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  console.log('in events.js ', data) // data comes from the getFormFields function above; contains old password, new password
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

let gameArray = ['', '', '', '', '', '', '', '', '']
const gameX = 'X'
const gameO = 'O'
let symbol
let counter = 0
let drawCounter = 0
let cellValue
let haveAWinner
let gameOver = false
let gameUpdate = false
let index = 0
let gameStarted = false

// http://www.dreamincode.net/forums/topic/296317-creating-a-simple-tic-tac-toe-game-in-javascript/

const initVariables = function () {
  console.log('in initVariables')
  $('#gamemessage').text('')
  symbol = ''
  counter = 0
  drawCounter = 0
  cellValue = ''
  haveAWinner = false
  gameOver = false
  gameUpdate = false
  index = 0
  return true
}

const onStartGame = function (event) {
  const data = getFormFields(event.target)
  event.preventDefault()
  console.log('in events.js ', data)
  console.log('in events.js ', event.target)
  initVariables()
  gameArray = ['', '', '', '', '', '', '', '', '']
  // console.log(gameArray)
  $('.cell').text('')
  api.createGame(data)
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
  gameStarted = true
}

const onUpdateGame = function (index, value, over) {
  // console.log('in onUpdateGame')
  // console.log('index value= ' + index)
  // console.log('player value= ' + value)
  // console.log('gameOver= ' + over)
  event.preventDefault()
  const data = {
    'game': {
      'cell': {
        'index': index,
        'value': value
      },
      'over': over
    }
  }
  api.updategame(data)
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFailure)
  return true
}

const changeSymbol = function (counter, myVal) {
  if (counter === 0 && myVal !== 'X' && myVal !== 'O') {
    return gameX
  } else {
    if (counter > 0 && myVal !== 'X' && myVal !== 'O') {
      if (counter === 1 || counter === 3 || counter === 5 || counter === 7 || counter === 9) {
        return gameO
      } else {
        if (counter === 2 || counter === 4 || counter === 6 || counter === 8) {
          return gameX
        }
      }
    } else {
      return 'occupied'
    }
  }
}

const checkWin = function (gameArray) {
  if (gameArray[0] === symbol && gameArray[1] === symbol && gameArray[2] === symbol) {
    return true
  }
  if (gameArray[3] === symbol && gameArray[4] === symbol && gameArray[5] === symbol) {
    return true
  }
  if (gameArray[6] === symbol && gameArray[7] === symbol && gameArray[8] === symbol) {
    return true
  }
  if (gameArray[0] === symbol && gameArray[3] === symbol && gameArray[6] === symbol) {
    return true
  }
  if (gameArray[1] === symbol && gameArray[4] === symbol && gameArray[7] === symbol) {
    return true
  }
  if (gameArray[2] === symbol && gameArray[5] === symbol && gameArray[8] === symbol) {
    return true
  }
  if (gameArray[0] === symbol && gameArray[4] === symbol && gameArray[8] === symbol) {
    return true
  }
  if (gameArray[2] === symbol && gameArray[4] === symbol && gameArray[6] === symbol) {
    return true
  }
}

const checkDraw = function (gameArray) {
  drawCounter = 0
  for (let i = 0; i < gameArray.length; i++) {
    if (gameArray[i] === gameX || gameArray[i] === gameO) {
      drawCounter++
    }
  }
  if (drawCounter === gameArray.length) {
    return true
  } else {
    return false
  }
}

const onClickBoard = function (event) {
  event.preventDefault()
  const myVal = $(this).text()
  // console.log(myVal)
  cellValue = changeSymbol(counter, myVal)
  // console.log('in events.js and cellValue = ', cellValue)
  if (!gameStarted) {
    $('#gamemessage').text('The Game has not been started. Click on Start A New Game to play!')
    return
  }
  if (gameOver) {
    $('#gamemessage').text('The Game is Over. Start A New Game to play again!')
    return
  }
  if (cellValue === 'occupied') {
    $('#gamemessage').text('You must choose a game position that is not occupied')
  } else {
    // push the value to the cell in the UI
    $(this).text(cellValue)
    // console.log(cellValue)
    index = event.target.id - 1
    gameArray[index] = cellValue
    // call onUpdateGame function to update the game of this move on the game board
    console.log('calling onUpdateGame function')
    gameUpdate = onUpdateGame(index, cellValue, gameOver)
    if (cellValue === gameX) {
      $('#gamemessage').text('The next move will be player ' + gameO)
    } else {
      if (cellValue === gameO) {
        $('#gamemessage').text('The next move will be player ' + gameX)
      }
    }
    counter++
    symbol = gameX
    if (!haveAWinner) {
      haveAWinner = checkWin(gameArray)
      if (haveAWinner) {
        gameOver = true
        $('#gamemessage').text(symbol + ' Wins!')
        // call onUpdateGame function to update the game with game is over
        console.log('calling onUpdateGame function')
        gameUpdate = onUpdateGame(index, cellValue, gameOver)
      }
    }
  }
  if (!haveAWinner) {
    symbol = gameO
    haveAWinner = checkWin(gameArray)
    if (haveAWinner) {
      gameOver = true
      $('#gamemessage').text(symbol + ' Wins!')
      // call onUpdateGame function to update the game with game is over
      console.log('calling onUpdateGame function')
      gameUpdate = onUpdateGame(index, cellValue, gameOver)
    }
  }
  if (!haveAWinner && !gameOver) {
    gameOver = checkDraw(gameArray)
    if (gameOver) {
      $('#gamemessage').text('It is a Draw!')
    }
  }
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#game-board').on('submit', onStartGame)
  $('.cell').on('click', onClickBoard)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onStartGame,
  onUpdateGame,
  onClickBoard,
  checkWin,
  changeSymbol,
  checkDraw,
  addHandlers
}
