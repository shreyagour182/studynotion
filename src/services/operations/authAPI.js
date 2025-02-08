import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

// ye saare funtion frontend me backend k function ko use krne k liye define kiye gaye h 

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try 
      {
      const response = await apiConnector( "POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response?.data?.success)

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR...........", error)
      toast.error("Could Not Send OTP  ,  this email is already registered")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } 
    catch (error)
     {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
     }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      // API Request
      const response = await apiConnector("POST", LOGIN_API, { email, password });

      console.log("LOGIN API RESPONSE:", response);

      // Check if the response exists and is successful
      if (!response || !response.data || !response.data.success) {
        throw new Error(response?.data?.message || "Unexpected API Error");
      }

      // Success Toast
      toast.success("Login Successful");

      // Store Token in Redux
      dispatch(setToken(response.data.token));

      // Set User Image (Fallback if no image exists)
      const userData = response.data.user;
      const userImage = userData?.image
        ? userData.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userData?.firstName || "User"} ${userData?.lastName || ""}`;
      
      // Store User in Redux
      dispatch(setUser({ ...userData, image: userImage }));

      // Store in LocalStorage
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect to Profile
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("LOGIN API ERROR:", error.response?.data || error.message || error);
      
      // Show error message from API if available
      toast.error(error.response?.data?.message || "Login Failed. Please try again.");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out BRO")
    navigate("/")
  }
}



export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    const toastId = toast.loading("Loading...")

    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true); // ab iske bd check up email vala page render ho jayega
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN ERROR", error);
      toast.error("Failed to send email for resetting password");
    }
    toast.dismiss(toastId)

    dispatch(setLoading(false));
  }
}



export function resetPassword(password, confirmPassword, token , navigate) {
  return async(dispatch) => {
    const toastId = toast.loading("Loading...")

    dispatch(setLoading(true));
   
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
      navigate("/login")

    }
    catch(error) {

      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");

    }
    toast.dismiss(toastId)

    dispatch(setLoading(false));

  }
}