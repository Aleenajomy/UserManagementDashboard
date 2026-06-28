/**
 * Splits a full name string by the first space character.
 * @param {string} name Full name (e.g., "Leanne Graham")
 * @returns {Object} Object containing firstName and lastName
 */
export const splitFullName = (name = "") => {
  const trimmed = name.trim();
  const index = trimmed.indexOf(" ");
  if (index === -1) {
    return { firstName: trimmed, lastName: "" };
  }
  const firstName = trimmed.substring(0, index);
  const lastName = trimmed.substring(index + 1);
  return { firstName, lastName };
};

/**
 * Generates a unique, incremental ID based on existing users list.
 * @param {Array} users List of current users
 * @returns {number} A unique ID
 */
export const generateUniqueId = (users = []) => {
  if (users.length === 0) return 1;
  const ids = users.map((u) => Number(u.id)).filter((id) => !isNaN(id));
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

/**
 * Generates a random element from an array. Used for seeding departments/status.
 * @param {Array} arr Target array
 * @returns {*} Random item
 */
export const getRandomItem = (arr = []) => {
  if (arr.length === 0) return null;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
