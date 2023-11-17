const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer", "") ||
    req.cookies.token ||
    req.body.token;

  if (!token) {
    return res
      .status(403)
      .json({ error: "Token is missing", code: "TOKEN_MISSING" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    // If needed, you can attach the decoded information to the request for later use
    req.user = decoded;
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Invalid token", code: "INVALID_TOKEN" });
  }

  return next();
};

module.exports = auth;
