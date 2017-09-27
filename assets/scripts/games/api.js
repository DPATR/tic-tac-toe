'use strict'

const config = require('../config')
const store = require('../store')

const signUp = function (data) {
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  console.log('in api.js ', store.user)
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = function (data) {
  console.log('in api.js ', store.user)
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const startGame = function (data) {
  console.log('in api.js ', store.user)
  return $.ajax({ // make a request of the API
    url: config.apiOrigin + '/game-board',
    method: 'POST',
    data
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  startGame
}
