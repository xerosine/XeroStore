import path from "path"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "XeroStore",
    allowed_formats: ["jpeg", "png", "jpg", "webp", "avif"],
    public_id: (req, file) => {
      return `${file.fieldname}-${Date.now()}`;
    },
  },
});

export {
  cloudinary,
  storage,
};
