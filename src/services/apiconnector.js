// import axios from "axios";

// export const axiosInstance = axios.create({
//   withCredentials: true,  // Ye backend ke sath match hona chahiye
// });

// export const apiConnector = async (method, url, bodyData, headers, params) => {
//   try {
//     const response = await axiosInstance({
//       method: method,
//       url: url,
//       data: bodyData || null,
//       headers: headers || {},
//       params: params || null,  withCredentials: true,
//     });
//     return response; // ye correct h

//   } catch (error) {
//     console.error("API Error:", error);
//     throw error;
//   }
// };
import axios from "axios";

// Create an axios instance
export const axiosInstance = axios.create({
  withCredentials: true, // Ensure that cookies (if any) are sent with requests
});

// API connector function
export const apiConnector = async (method, url, bodyData, headers = {}, params = {}) => {
  try {
    // Add the Authorization token to the headers dynamically
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      headers['Authorization'] = `Bearer ${token}`; // Add the token to headers if it exists
    }

    // Make the request
    const response = await axiosInstance({
      method: method,
      url: url,
      data: bodyData || null,
      headers: headers, // Use the dynamic headers
      params: params || null,
      withCredentials: true, // Include credentials (cookies, etc.) if necessary
    });

    return response; // Return the response data

  } catch (error) {
    console.error("API Error:", error); // Log the error for debugging
    throw error; // Throw error to be handled elsewhere
  }
};
