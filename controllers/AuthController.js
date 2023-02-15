const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;
    if (password != confirmpassword) {
      req.flash(
        "message",
        "A confirmação de senha é diferente da senha, tente novamente."
      );
      res.render("auth/register");
      return;
    }

    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash("message", "Já existe um usário cadastrado com este e-mail.");
      res.render("auth/register");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };
    try {
      const createdUser = await User.create(user);

      req.session.userid = createdUser.id;
      req.flash('message', "Cadastro realizado com sucesso.")

      req.session.save(() => {
        res.redirect('/')
      });

    } catch (err) {
      console.log(err);
    }
  }
};
