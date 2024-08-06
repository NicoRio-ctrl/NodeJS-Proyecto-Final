import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const token = {
  async generate(user) {
    console.log(user);
    const userForToken = {
      id: user._id, 
      fullName: user.fullName,
      email: user.email,
      admin: user.admin, 
    };
    console.log(userForToken);
    return jwt.sign(userForToken, secret, { expiresIn: "1h" });
  },

  async validate(req, res, next) {
    
    const authHeader = req.headers?.authorization;
    const token = authHeader && authHeader.split(" ")[1]; 

    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid or Expired token" });
        }

        req.user = decoded;
        next();
      });
    } else {
      res.status(401).json({ success: false, message: "No token provided" });
    }
  },
};
