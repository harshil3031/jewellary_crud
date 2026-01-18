// // create create, read, update, delete user functions
// import pool from '../config/db.js';

// // Create a new user
// export const createUser = async (userData) => {
//   const { name, email, password, age, phoneno, role } = userData;
//   const queryText = `
//     INSERT INTO users (name, email, password, age, phoneno, role)
//     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
//   `;
//   const values = [name, email, password, age, phoneno, role || 'user'];
//   try {
//     const result = await pool.query(queryText, values);
//     console.log(result);
//     return result.rows[0];
//   } catch (err) {
//     throw new Error('Error creating user: ' + err.message);
//   }
// };

// // Get user by ID
// export const getUserById = async (id) => {
//   const queryText = 'SELECT * FROM users WHERE id = $1';
//   try {
//     const result = await pool.query(queryText, [id]);
//     console.log(result);
//     return result.rows[0];
//   } catch (err) {
//     throw new Error('Error fetching user: ' + err.message);
//   }
// };

// // Update user by ID
// export const updateUserById = async (id, updateData) => {
//   const { name, email, password, age, phoneno, role } = updateData;
//   const queryText = `
//     UPDATE users
//     SET name = $1, email = $2, password = $3, age = $4, phoneno = $5, role = $6
//     WHERE id = $7 RETURNING *
//   `;
//   const values = [name, email, password, age, phoneno, role, id];
//   try {
//     const result = await pool.query(queryText, values);
//     console.log(result);
//     return result.rows[0];
//   } catch (err) {
//     throw new Error('Error updating user: ' + err.message);
//   }
// };

// // Delete user by ID
// export const deleteUserById = async (id) => {
//   const queryText = 'DELETE FROM users WHERE id = $1 RETURNING *';
//   try {
//     const result = await pool.query(queryText, [id]);
//     console.log(result);
//     return result.rows[0];
//   } catch (err) {
//     throw new Error('Error deleting user: ' + err.message);
//   }
// };

// sequelize based user controller functions
import User from '../model/user.model.js';

// Create a new user
export const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    console.log(newUser);
    return newUser;
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
};
// Get user by ID
export const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    console.log(user);
    return user;
  } catch (err) {
    throw new Error('Error fetching user: ' + err.message);
  }
};
// Update user by ID
export const updateUserById = async (id, updateData) => {
  try {
    const [updatedRowsCount, [updatedUser]] = await User.update(updateData, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return null;
    }
    console.log(updatedUser);
    return updatedUser;
  } catch (err) {
    throw new Error('Error updating user: ' + err.message);
  }
};
// Delete user by ID
export const deleteUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    await user.destroy();
    console.log(user);
    return user;
    } catch (err) {
    throw new Error('Error deleting user: ' + err.message);
  }
};