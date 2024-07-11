import multer from "multer";
import __dirname from "../utils.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationFolder = "";
    if (req.originalUrl.includes("documents")) {
      destinationFolder = "/documents";
    }

    cb(null, `${__dirname}/../public/uploads${destinationFolder}`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });
