const jwt = require("jsonwebtoken");
exports.adminAccess = (req, res, next) => {
    let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!req.headers.authorization) {
    return throwError(res, "Token not Provided")
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) return throwError(res,"Invalid token")
    next()
  } catch(error) {
      return throwError(res, error.message)
  }
}

const throwError = (res, message) => {
    res.status(400).json({
        success: false,
        error: message
    })
}