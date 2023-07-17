const authMiddleware = (req, res, next) => {
  const { name, password } = req.body;
  if (name == "digitalMall" && password == "123456") {
    next();
  } else {
    return res.status(400).json({
      success: false,
      message: "userNamr or password not match",
    });
  }
};

module.exports = authMiddleware;
