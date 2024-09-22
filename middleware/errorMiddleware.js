import multer from "multer";

const errorHandler = (error, req, res, next) => {
  res.status(500).json({ sucess: false, message: error });
};

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

export { errorHandler, upload };
