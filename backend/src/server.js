const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");

const advertisementRoutes = require("./routes/advertisementRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const personRoutes = require("./routes/personRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const { sequelize } = require("./models");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());
app.use(bodyParser.json());

app.use("/advertisement", advertisementRoutes);
app.use("/company", companyRoutes);
app.use("/job_application", jobApplicationRoutes);
app.use("/person", personRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });
};

async function syncModels() {
  try {
    await sequelize.sync({ force: true });

    console.log("Toutes les tables ont été synchronisées avec succès !");
  } catch (error) {
    console.error("Erreur lors de la synchronisation des tables :", error);
  }
}

startServer();
