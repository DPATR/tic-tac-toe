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

const onStartGame = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  console.log('in events.js ', data)
  api.startGame(data)
    .then(ui.startGameSuccess)
    .catch(ui.startGameFailure)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#game-board').on('submit', onStartGame)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  addHandlers
}
