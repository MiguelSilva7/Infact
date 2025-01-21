const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
);

const User = require("./user")(sequelize, DataTypes);
const JobApplication = require("./jobApplication")(sequelize, DataTypes);
const Person = require("./person")(sequelize, DataTypes);
const Company = require("./company")(sequelize, DataTypes);
const Advertisement = require("./advertisement")(sequelize, DataTypes);

const models = {
  User,
  JobApplication,
  Person,
  Company,
  Advertisement,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion établie avec succès à la base de données.");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données :", err);
  });

module.exports = {
  sequelize,
  models,
};
