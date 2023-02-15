const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login')
  }

  static register(req, res) {
    res.render('auth/register')
  }

  static async registerPost(req, res) {
    const {name, email, password, confirmpasswords} = req.body

    if (password != confirmpasswords) {
      req.flash('message', 'A confirmação de senha é diferente da senha, tente novamente')
      res.render('auth/register')
      return
    }

  }
}
