import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });
        jwt.verify(token, process.env.mysecrettoken, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "wrong credentials" });
            }
            req.user = user;
        });
        next();

    } catch (error) {

    }
}