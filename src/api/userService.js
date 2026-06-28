import axios from "axios";
import { API_URL } from "../utils/constants";

// Create custom Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

/**
 * Fetch all users from API.
 * @returns {Promise} Axios response promise
 */
export const getUsers = () => {
  return apiClient.get("");
};

/**
 * Create a new user.
 * @param {Object} user User data structure
 * @returns {Promise} Axios response promise
 */
export const createUser = (user) => {
  return apiClient.post("", user);
};

/**
 * Update an existing user's data.
 * @param {number|string} id The user ID to target
 * @param {Object} user Modified user details
 * @returns {Promise} Axios response promise
 */
export const updateUser = (id, user) => {
  return apiClient.put(`/${id}`, user);
};

/**
 * Delete a user by ID.
 * @param {number|string} id Unique identifier
 * @returns {Promise} Axios response promise
 */
export const deleteUser = (id) => {
  return apiClient.delete(`/${id}`);
};

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
