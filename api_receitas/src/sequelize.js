
import { Sequelize } from "sequelize";
export const conn = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.sqlite",
});
