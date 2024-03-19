import Jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = Jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d",
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // milisecond format
        httpOnly: true, //prevet XSS attacks cross-site scriting attacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
}   

export default generateTokenAndSetCookie
// generateTokenAndSetCookie function
// const generateTokenAndSetCookie = (userId, res) => {
//     const token = Jwt.sign({userId}, process.env.JWT_SECRET, {
//         expiresIn: "15d",
//     });

//     res.cookie("jwt", token, { // This should match with the cookie name used in protectRoute
//         maxAge: 15 * 24 * 60 * 60 * 1000, // millisecond format
//         httpOnly: true,
//         sameSite: "strict",
//         secure: process.env.NODE_ENV !== "development"
//     });
// }

// export default generateTokenAndSetCookie;
