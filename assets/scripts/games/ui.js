'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#message').text('Signed up successfully')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-up')
}

const signInSuccess = function (data) {
  $('#message').text('Signed in successfully')
  store.user = data.user
  data.signedIn = true
  store.signedIn = data.signedIn
  $('.games').show()
  $('.buttons').show()
  $('#change-password').show()
  $('#sign-out').show()
  $('#sign-in').hide()
  $('#sign-up').hide()
}

const signInFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-in')
}

const changePasswordSuccess = function (data) {
  $('#message').text('Changed password successfully')
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#message').text('Error on change-password')
}

const signOutSuccess = function (data) {
  $('#message').text('Signed out successfully')
  store.user = null
  $('.games').hide()
  $('.buttons').hide()
  $('#sign-in').show()
  $('#sign-up').show()
  $('#change-password').hide()
  $('#sign-out').hide()
}

const signOutFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-out')
}

const createGameSuccess = function (data) {
  $('#message').text('Game created successfully')
  store.game = data.game
}

const createGameFailure = function (error) {
  console.error(error)
  $('#message').text('Error on create game')
}

const updateGameSuccess = function (data) {
  $('#message').text('Game updated successfully')
}

const updateGameFailure = function (error) {
  console.error(error)
  $('#message').text('Error on update game')
}

const getGamesSuccess = function (data) {
  store.games = data.games
  $('#message').text('Games retrieved successfully')
  $('#gamemessage').text('You have ' + store.games.length + ' total games!')
}

const getGamesFailure = function (error) {
  console.error(error)
  $('#message').text('Error on get games')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  createGameSuccess,
  createGameFailure,
  updateGameSuccess,
  updateGameFailure,
  getGamesSuccess,
  getGamesFailure
}
