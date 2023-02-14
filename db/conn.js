const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pc_plus", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectado ao banco");
} catch (error) {
  console.log(error);
}

module.exports = sequelize;