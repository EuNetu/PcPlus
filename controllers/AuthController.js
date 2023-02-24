const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      req.flash("message", "Usuário não encontrado.");
      res.redirect("/login");
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      req.flash("message", "Senha incorreta! Tente novamente.");
      res.redirect("/login");
      return;
    }

    req.session.userid = user.id;
    req.session.user = user.name;
    req.flash("message", `Seja Bem-Vindo, ${user.name}!`);
    req.session.save(() => {
      res.redirect("/");
    });
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, phoneComplete, password, confirmpassword } = req.body;
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
    console.log(typeof phoneComplete)
    console.log(phoneComplete)
    const code_area = phoneComplete.substring(3, 1)
    console.log(code_area)
    const phone = phoneComplete.substring(phoneComplete.indexOf(" ") + 1).replace('-','');
    console.log(phone)
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      code_area,
      phone,
      password: hashedPassword,
    };
    try {
      const createdUser = await User.create(user);

      req.session.userid = createdUser.id;
      req.session.user = user.name;
      req.flash("message", "Cadastro realizado com sucesso.");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
};
