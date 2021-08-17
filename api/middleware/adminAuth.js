const isUserAdmin = (role) => {
  try {
    return (req, res, next) => {
      if (req.headers.currentUserRole != role) {
        res.status(401).json({
          message: "Not allowed",
        });
      }
      next();
    };
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      message: "User is not admin",
      error: err.message,
    });
  }
};

module.exports = isUserAdmin;
