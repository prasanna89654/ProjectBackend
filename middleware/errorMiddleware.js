const errorHandler = (error, req, res, next) => {
  res.status(500).json({ sucess: false, message: error });
};

export { errorHandler };
