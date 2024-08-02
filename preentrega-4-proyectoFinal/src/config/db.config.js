import mongoose from "mongoose";
import { entorno } from "./entorno.config.js";
import logger from "../utils/logger.js";

//settings
const MONGO_URL = entorno.mongoUrl;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    logger.info(`Database is connected!`);
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export default dbConnection;
