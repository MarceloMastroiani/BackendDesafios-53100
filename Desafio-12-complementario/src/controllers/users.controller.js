import { userService } from "../repositories/service.js";
import logger from "../utils/logger.js";

export const getUsers = async (req, res) => {
  let limit = req.query.limit || 10;

  let result = await userService.getAll(limit);
  res.json({ result });
};

export const getUserById = async (req, res) => {
  let id = req.params.id;

  let result = await userService.getById(id);
  logger.info(`Obteniendo el usuario con id: ${id}`);
  res.json({ result });
};

export const updateUser = async (req, res) => {
  let id = req.params.id;
  let userData = req.body;

  let result = await userService.update(id, userData);
  logger.info(`Actualizado el usuario con id: ${id}`);
  res.json({ result });
};

export const deleteUser = async (req, res) => {
  let id = req.params.id;
  let result = await userService.delete(id);
  logger.info(`Eliminado el usuario con id: ${id}`);
  res.json({ result });
};

export const premiumUser = async (req, res) => {
  let id = req.params.id;

  let user = await userService.getById(id);
  if (user.role === "usuario") {
    user.role = "premium";

    let result = await userService.update(id, { $set: { role: user.role } });
    logger.info(`Actualizado el usuario a premium con id: ${id}`);
    res.json({ result });
  }
};

export const getDocuments = async (req, res) => {
  try {
    console.log("entro");
    let id = req.params.id;
    let files = req.files;
    console.log(id);
    console.log(files);

    const user = await userService.getById(id);
    console.log(user);
    let documents = user.documents || [];

    documents = [
      ...documents,
      ...files.map((file) => {
        return {
          name: file.originalname,
          reference: file.path.split("public")[1].replace(/\\/g, "/"),
        };
      }),
    ];

    let result = await this.update(id, { documents: documents });

    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
