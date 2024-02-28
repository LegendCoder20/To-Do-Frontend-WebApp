import axios from "axios";

const API_URL = "https://to-do-backend-palb.onrender.com/api/users/";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// LOGIN User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData); // It will be like or Become const API_URL = "/api/users/login";  [its from the top code Check it ]
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// LOGOUT USER

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
