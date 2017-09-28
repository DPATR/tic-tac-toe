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
const initGame = ''
let symbol
let counter = 0
let cellName
let cellValue
let haveAWinner

// http://www.dreamincode.net/forums/topic/296317-creating-a-simple-tic-tac-toe-game-in-javascript/

const onStartGame = function (event) {
  event.preventDefault()
  counter = 0
  gameArray = ['', '', '', '', '', '', '', '', '']
  for (let i = 0; i < gameArray.length; i++) {
    // line below is not working - need to initialize the event.target
    document.getElementById(event.target.id).setAttribute('value', '')
  }
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
  console.log('in checkWin')
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

const onClickBoard = function (event) {
  event.preventDefault()
  const myVal = document.getElementById(event.target.id).value
  cellValue = changeSymbol(counter, myVal)
  if (cellValue === 'occupied') {
    // *** HOW TO CREATE & USE DYNAMIC TEXT MESSAGES ON A WEB PAGE
    // REPLACE ALERT ***
    alert('You must choose a game position that is not occupied')
  } else {
    document.getElementById(event.target.id).value = cellValue
    gameArray[event.target.id - 1] = cellValue
    counter++
    symbol = gameX
    haveAWinner = checkWin(gameArray)
    if (haveAWinner) {
      alert(symbol + ' Wins!')
    } else {
      symbol = gameO
      haveAWinner = checkWin(gameArray)
      if (haveAWinner) {
        alert(symbol + ' Wins!')
      }
    }
    if (!haveAWinner) {
      alert('It is a Draw!')
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
  onClickBoard,
  checkWin,
  changeSymbol,
  addHandlers
}
