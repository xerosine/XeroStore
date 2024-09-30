import path from "path";
import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const router = express.Router();

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpe?g|png|webp|avif/;
  const mimeTypes = /image\/jpe?g|image\/png|image\/webp|image\/avif/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;

  if (fileTypes.test(extname) && mimeTypes.test(mimeType)) {
    cb(null, true);
  } else {
    cb(new Error("Upload images only!"));
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully!",
        image: `${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided!" });
    }
  });
});

export default router;
