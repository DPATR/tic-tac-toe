'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

let gameArray = ['', '', '', '', '', '', '', '', '']
$('.cell').text('')
$('#gamemessage').text('')
const gameX = 'X'
const gameO = 'O'
let symbol
let counter = 0
let drawCounter = 0
let cellValue
let haveAWinner
let gameOver = false
let index = 0
let gameStarted = false

const initVariables = function () {
  $('#gamemessage').text('')
  symbol = ''
  counter = 0
  drawCounter = 0
  cellValue = ''
  haveAWinner = false
  gameOver = false
  index = 0
  gameStarted = false
  gameArray = ['', '', '', '', '', '', '', '', '']
  $('.cell').text('')
  return true
}

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#message').text('')
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

let signedIn = false

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#message').text('')
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#message').text('')
  signedIn = store.signedIn
  if (!signedIn) {
    $('#message').text('You need to be signed in to change password')
  } else {
    api.changePassword(data)
      .then(ui.changePasswordSuccess)
      .catch(ui.changePasswordFailure)
  }
}

const onSignOut = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#message').text('')
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
  initVariables()
  document.getElementById('emailSignin').value = ''
  document.getElementById('passwordSignin').value = ''
  document.getElementById('emailSignup').value = ''
  document.getElementById('passwordSignup').value = ''
  document.getElementById('confirmSignup').value = ''
  document.getElementById('oldPswdChange').value = ''
  document.getElementById('newPswdChange').value = ''
}

const onStartGame = function (event) {
  const data = getFormFields(event.target)
  event.preventDefault()
  initVariables()
  api.createGame(data)
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
  gameStarted = true
}

const onStatistics = function (event) {
  event.preventDefault()
  api.getGames(event)
    .then(ui.getGamesSuccess)
    .catch(ui.getGamesFailure)
}

const onUpdateGame = function (index, value, over) {
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
  cellValue = changeSymbol(counter, myVal)
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
    $(this).text(cellValue)
    index = event.target.id - 1
    gameArray[index] = cellValue
    onUpdateGame(index, cellValue, gameOver)
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
        onUpdateGame(index, cellValue, gameOver)
      }
    }
  }
  if (!haveAWinner) {
    symbol = gameO
    haveAWinner = checkWin(gameArray)
    if (haveAWinner) {
      gameOver = true
      $('#gamemessage').text(symbol + ' Wins!')
      onUpdateGame(index, cellValue, gameOver)
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
  $('#start').on('click', onStartGame)
  $('#stats').on('click', onStatistics)
  $('.cell').on('click', onClickBoard)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onStartGame,
  onStatistics,
  onUpdateGame,
  onClickBoard,
  checkWin,
  changeSymbol,
  checkDraw,
  addHandlers
}
