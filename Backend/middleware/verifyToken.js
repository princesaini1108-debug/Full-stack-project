import jsonwebtoken from "jsonwebtoken"

const JWT_SECRET = "hospital_super_secret_key_2026";
const verifyToken = (req, res, next) => {
    try {
        // const token = req.headers.authorization?.split("")[1]
        // let token =req.headers.authorization?.split(" ")[1]
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "no token provided..."
            });
        }

        // let payload = await jsonwebtoken.verify(token,"studentkey")
        // console.log(payload.userid)

        // req.userid=payload.userid
        // next();

        jsonwebtoken.verify(token, JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    success: false,
                    message: "invalid or expired token"
                });
            }

            req.user = decoded;
            next();
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error...",
            error
        });
    }
}

export default verifyToken;