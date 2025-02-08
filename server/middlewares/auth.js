const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


//auth
exports.auth = async (req, res, next) => {
    try{

        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
        console.log("AFTER ToKEN EXTRACTION");

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded;
          } catch (err) {
            // Handle token verification failure
            if (err.name === 'TokenExpiredError') {
              console.error("Token expired:", err.message);
              return res.status(401).json({
                success: false,
                message: 'Token has expired, please log in again.',
              });
            } else {
              console.error("Token verification failed:", err.message);
              return res.status(401).json({
                success: false,
                message: 'Token is invalid',
              });
            }
          }
        next();
    }
    catch(error) {  
        console.error("Error in isInstructor middleware:", error.message);
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
 try{
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Student") {
        return res.status(401).json({
            success: false,
            message: "This is a Protected Route for Students",
        });
    }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
        const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
    }
    catch(error) {
        console.error("Error in isInstructor middleware:", error.message);
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{    
        const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
    }
    catch(error) {      
          console.error("Error in isAdmin middleware:", error.message);
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }