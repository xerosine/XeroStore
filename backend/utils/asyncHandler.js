const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      res.status(500).json({ message: error.message });
    });
  };
};

export default asyncHandler;
