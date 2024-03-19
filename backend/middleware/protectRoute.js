import  Jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// protectRoute middleware
const protectRoute = async (req, res, next) => {
    try {
        // Ensure the cookie name matches what you've set during login/signup
        const token = req.cookies.jwt; // Changed from 'Jwt' to 'jwt'
        if(!token) {
            return res.status(401).json({error:"Unauthorized - No Token Provided"}); // Corrected typo in the error message
        }

        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded) {
            return res.status(401).json({error:"Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(404).json({error:"User not found"});
        }

        req.user = user;

        next();
    } catch(error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({
            error:"Internal server error" // Corrected typo in the error message
        });
    }
}

export default protectRoute;
