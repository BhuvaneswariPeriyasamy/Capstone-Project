
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
      console.log("auth middleware successful");
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
  };
  
  module.exports = authMiddleware;
  