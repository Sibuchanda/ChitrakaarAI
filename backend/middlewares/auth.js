import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      sucsess: false,
      message: err.message,
    });
  }
};

export default userAuth;
