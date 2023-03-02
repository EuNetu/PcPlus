const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class PostController {
  static async showProfile(req, res) {
    if (!req.session.userid) {
      const userId = -1;
      return;
    }
    const userId = req.session.userid;

    const user = await User.findOne({
      where: { id: userId },
      raw: true,
    });

    if (!user) {
      res.redirect("/login");
    }
    console.log(user);
    res.render("profile/user", { user });
  }

  static async updateProfile(req, res) {
    if (!req.session.userid) {
      const userId = -1;
      return;
    }
    const userId = req.session.userid;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.redirect("/profile");
      return;
    }
    const { name, password, phoneComplete } = req.body;

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      req.flash(
        "message",
        "Senha incorreta! Não foi possível realizar as alterações."
      );
      res.redirect("/profile");
      return;
    }
    const code_area = phoneComplete.substring(3, 1);
    const phone = phoneComplete
      .substring(phoneComplete.indexOf(" ") + 1)
      .replace("-", "");

    const newProfile = {
      name,
      code_area,
      phone,
    };

    try {
      await User.update(newProfile, { where: { id: userId } });
      req.flash("message", "Você atualizou o seu perfil! :)");
      req.session.user = newProfile.name;
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }
};
