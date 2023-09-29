import jwt from "jsonwebtoken";

const generateToken = (user) => {
    const token = jwt.sign({ 
        _id: user._id ,
        name: user.name,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })

    return token
}

export default generateToken;