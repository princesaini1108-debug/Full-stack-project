const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!allowedRoles.includes(req.user.Role)) {
                return res.status(403).json({
                    success: false,
                    message: "access denied for this role"
                });
            }
            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "server error...",
                error
            });
        }
    };
};

export default verifyRole;