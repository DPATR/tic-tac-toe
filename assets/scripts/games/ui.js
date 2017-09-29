'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  console.log('in ui.js ', data)
  $('#message').text('Signed up successfully')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-up')
}

const signInSuccess = function (data) {
  console.log('in ui.js ', data)
  $('#message').text('Signed in successfully')
  store.user = data.user
  $('.games').show()
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
  console.log('Signed out successfully!')
  store.user = null
  $('.games').hide()
}

const signOutFailure = function (error) {
  console.error(error)
  $('#message').text('Error on sign-out')
}

const createGameSuccess = function (data) {
  $('#message').text('Game created successfully')
  console.log('Game created successfully!')
  store.user = null
}

const createGameFailure = function (error) {
  console.error(error)
  $('#message').text('Error on create game')
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
  createGameFailure
}
