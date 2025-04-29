const multer = require("multer");
const uuid = require("uuid/v1");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000, // 500kb
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      //   cb(null, file.fieldname + "-" + Date.now() + "." + ext);
      cb(null, uuid() + "." + ext); // uuid() => unique id for each file
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype]; // !! => convert to boolean

    let error = isValid ? null : new Error("Invalid image type!");
    cb(error, isValid); // cb(error, isValid) => error is null if valid, isValid is true if valid
  },
});

module.exports = fileUpload;
