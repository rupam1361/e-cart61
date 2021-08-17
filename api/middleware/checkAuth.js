const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (token) {
      const decode = jwt.verify(token, "secure");
      res.userData = decode;
    }
    next();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Authentication failed",
      error: err.message,
    });
  }
};

module.exports = checkAuth;
