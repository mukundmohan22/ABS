import jwt from "jsonwebtoken";

// Doctor Authentication middleware

const authDoctor = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized login again" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.doctor = { docId: token_decode.id };
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
