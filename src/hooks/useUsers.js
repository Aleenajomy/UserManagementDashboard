import { useState, useEffect, useCallback } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userService";
import { splitFullName, generateUniqueId, getRandomItem } from "../utils/helpers";
import { DEPARTMENTS, ROLE_OPTIONS, STATUS_OPTIONS } from "../utils/constants";

const STORAGE_KEY = "user_management_dashboard_users";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUsers(JSON.parse(stored));
        } else {
          const response = await getUsers();
          const mappedUsers = response.data.map((user, index) => {
            const { firstName, lastName } = splitFullName(user.name);
            // Cycle departments to make the dashboard look diverse and real
            const dept = DEPARTMENTS[index % DEPARTMENTS.length];
            const role = ROLE_OPTIONS[index % ROLE_OPTIONS.length].value;
            const status = STATUS_OPTIONS[index % STATUS_OPTIONS.length].value;

            return {
              id: user.id,
              firstName,
              lastName,
              email: user.email,
              department: dept,
              role,
              status
            };
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mappedUsers));
          setUsers(mappedUsers);
        }
      } catch (err) {
        console.error("API error fetching users:", err);
        setError("Failed to fetch users. Please check your network connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Sync state helper
  const saveUsersState = useCallback((newUsers) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsers));
    setUsers(newUsers);
  }, []);

  // Add User
  const addUser = useCallback(async (newUser) => {
    setError(null);
    try {
      // Assemble full user object to send
      const localId = generateUniqueId(users);
      const userPayload = {
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email
      };

      // Simulated API Post (normally JSONPlaceholder responds with id: 11)
      const response = await createUser(userPayload);
      
      // We use our local unique ID to ensure no duplicate key errors occur
      const createdUser = {
        ...newUser,
        id: localId
      };

      const updatedList = [createdUser, ...users];
      saveUsersState(updatedList);
      return createdUser;
    } catch (err) {
      console.error("API error creating user:", err);
      setError("Could not create user on the server. Local state was not updated.");
      throw err;
    }
  }, [users, saveUsersState]);

  // Edit User
  const editUser = useCallback(async (id, updatedFields) => {
    setError(null);
    try {
      const userPayload = {
        name: `${updatedFields.firstName} ${updatedFields.lastName}`,
        email: updatedFields.email
      };

      // Simulated API PUT (normally JSONPlaceholder requires numeric id)
      // If we created this user locally, we handle PUT gracefully (using try-catch or local simulation)
      try {
        await updateUser(id, userPayload);
      } catch (apiErr) {
        // Fallback for custom local IDs that jsonplaceholder doesn't recognize
        console.warn("API PUT failed (likely a new user ID), proceeding with local update:", apiErr);
      }

      const updatedList = users.map((user) =>
        user.id === id ? { ...user, ...updatedFields } : user
      );
      saveUsersState(updatedList);
    } catch (err) {
      console.error("API error updating user:", err);
      setError("Could not update user on the server. Local state was not updated.");
      throw err;
    }
  }, [users, saveUsersState]);

  // Delete User
  const removeUser = useCallback(async (id) => {
    setError(null);
    try {
      // Simulated API DELETE
      try {
        await deleteUser(id);
      } catch (apiErr) {
        console.warn("API DELETE failed, proceeding with local removal:", apiErr);
      }

      const updatedList = users.filter((user) => user.id !== id);
      saveUsersState(updatedList);
    } catch (err) {
      console.error("API error deleting user:", err);
      setError("Could not delete user on the server. Local state was not updated.");
      throw err;
    }
  }, [users, saveUsersState]);

  // Clear/Reset dashboard data
  const resetUsers = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    setLoading(true);
    try {
      const response = await getUsers();
      const mappedUsers = response.data.map((user, index) => {
        const { firstName, lastName } = splitFullName(user.name);
        const dept = DEPARTMENTS[index % DEPARTMENTS.length];
        const role = ROLE_OPTIONS[index % ROLE_OPTIONS.length].value;
        const status = STATUS_OPTIONS[index % STATUS_OPTIONS.length].value;

        return {
          id: user.id,
          firstName,
          lastName,
          email: user.email,
          department: dept,
          role,
          status
        };
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mappedUsers));
      setUsers(mappedUsers);
    } catch (err) {
      setError("Failed to reload default users.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    addUser,
    editUser,
    removeUser,
    resetUsers,
    setError
  };
}
