const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'No people in the world has the same names, leave me alone']
  },
  email: {
    type: String,
    unique: [true, 'Theres already a user with this email'],
    validate: {
      validator(value) {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)
      }
    },
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    // validate: {
    //   validator(value) {
    //     return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value)
    //   }
    // }
    required: [true, 'password is required'],
  },
  role: {
    type: String,
    enum: ['user', 'master', 'admin'],
    required: [true, 'Role is required']
  }
})

exports.User = mongoose.model('user', userSchema)