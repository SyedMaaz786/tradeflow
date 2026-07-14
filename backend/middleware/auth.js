const { getAuth } = require("firebase-admin/auth");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(token);

    // the token itself can have a stale email_verified value baked in
    // from when it was issued, so check the live user record instead
    const currentUser = await getAuth().getUser(decodedToken.uid);

    if (!currentUser.emailVerified) {
      return res.status(403).json({
        message: "Please verify your email before continuing",
      });
    }

    req.user = decodedToken;

    next();
  } catch (err) {
    console.log("Token verification failed:", err.code);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = verifyToken;
