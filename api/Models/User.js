const {Schema, model} = require('mongoose')

const user = new Schema({
  username: {
    type: String,
    required: false
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = model('user', user)
