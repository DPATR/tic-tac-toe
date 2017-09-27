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

// let gameArray = ['', '', '', '', '', '', '', '', '']
const gameX = 'X'
const gameO = 'O'
let counter = 0

// http://www.dreamincode.net/forums/topic/296317-creating-a-simple-tic-tac-toe-game-in-javascript/

const onStartGame = function (event) {
  const data = getFormFields(event.target)
  console.log(data)
  // console.log(data.length) does not work!
  event.preventDefault()
  let gameArray = ['', '', '', '', '', '', '', '', '']
  for (let i = 0; i < 9; i++) {
    // set table cell value = ' '
  }
  console.log(data)
}

const onClickBoard = function (event) {
  event.preventDefault()
  // const data = getFormFields(event.target)
  console.log(event)
  // if(counter = 0) {
  //   console.log('hi')
  //   populate selected cell with 'X'
  //   counter++
  // }
}

const checkWin = function () {
  // if there are 3 of the same symbols in a row, return true
  // if not, return false
  return true
}

const changeSymbol = function () {

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
