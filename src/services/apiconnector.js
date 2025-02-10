import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,  // Ye backend ke sath match hona chahiye
});

export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      data: bodyData || null,
      headers: headers || {},
      params: params || null,  withCredentials: true,
    });
    return response; // ye correct h 

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
