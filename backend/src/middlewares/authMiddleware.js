const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }
  const actualToken = token.split(" ")[1];
  jwt.verify(actualToken, jwtConfig.secret, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};
