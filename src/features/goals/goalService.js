import axios from "axios";

const API_URL = "https://to-do-backend-palb.onrender.com/api/goals/";

// Create New Goals
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config); // We have to also pass config which also have Headers
  return response.data;
};

// Get User Goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config); // We have to also pass config which also have Headers
  return response.data;
};

// Delete User Goal

const deleteGoals = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalId, config); // We have to also pass config which also have Headers
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoals,
};

export default goalService;
