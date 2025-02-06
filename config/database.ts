import { Sequelize } from "sequelize";
import sqlite3 from "sqlite3";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
  dialectModule: sqlite3,
});

(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Failed to connect database", error);
  }
})();

export default sequelize;
