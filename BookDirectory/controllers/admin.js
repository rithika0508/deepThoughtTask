const jwt = require("jsonwebtoken")
const adminLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if(process.env.ADMIN_USERNAME!=username || process.env.ADMIN_PASSWORD!=password) {
            throw new Error("Incorrect Credentials")
        }
        res.status(200).json({
            success: true,
            token: jwt.sign({id: process.env.id}, process.env.JWT_SECRET)
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}
module.exports = adminLogin