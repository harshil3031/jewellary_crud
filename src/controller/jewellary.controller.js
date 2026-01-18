// // create create, read, update, delete jewellary controller functions
// import pool from '../config/db.js';

// // Create a new jewellary
// export const createJewellary = async (jewellaryData) => {
//   const { name, type, price, material, weight, image_url } = jewellaryData;
//   console.log(jewellaryData);
//   const queryText = `
//     INSERT INTO jewellaries (name, type, price, material, weight, image_url)
//     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
//   `;
//   const values = [name, type, price, material, weight, image_url];
//   try {
//     const result = await pool.query(queryText, values);
//     console.log(result);
//     return result.rows[0];
//   } catch (err) {
//     throw new Error('Error creating jewellary: ' + err.message);
//   }
// };

// // Get jewellary by ID
// export const getJewellaryById = async (id) => {
//   const queryText = 'SELECT * FROM jewellaries WHERE id = $1';
//   try {
//     const result = await pool.query(queryText, [id]);
//     console.log(result);
//     return result.rows[0];
//   } catch (err) {
//     throw new Error('Error fetching jewellary: ' + err.message);
//   }
// };

// // Update jewellary by ID
// export const updateJewellaryById = async (id, updateData) => {
//   const { name, type, price, material, weight, image_url } = updateData;
//   const queryText = `
//     UPDATE jewellaries
//     SET name = $1, type = $2, price = $3, material = $4, weight = $5, image_url = $6
//     WHERE id = $7 RETURNING *
//   `;
//   const values = [name, type, price, material, weight, image_url, id];
//   try {
//     const result = await pool.query(queryText, values);
//     console.log(result);
//     return result.rows[0];
//   } catch (err) {
//     throw new Error('Error updating jewellary: ' + err.message);
//   }
// };

// // Delete jewellary by ID
// export const deleteJewellaryById = async (id) => {
//   const queryText = 'DELETE FROM jewellaries WHERE id = $1 RETURNING *';
//   try {
//     const result = await pool.query(queryText, [id]);
//     console.log(result);
//     return result.rows[0];
//   } catch (err) {
//     throw new Error('Error deleting jewellary: ' + err.message);
//   }
// };

// // Get all jewellaries by pagination
// export const getAllJewellaries = async (page = 1, limit = 10) => {
//   const offset = (page - 1) * limit;
//   const queryText = 'SELECT * FROM jewellaries ORDER BY id LIMIT $1 OFFSET $2';
//   try {
//     const result = await pool.query(queryText, [limit, offset]);
//     console.log(result);
//     return result.rows;
//   } catch (err) {
//     throw new Error('Error fetching jewellaries: ' + err.message);
//   }
// };

// // search jewellaries by name or type
// export const searchJewellaries = async (searchTerm) => {
//     const queryText = `SELECT * FROM jewellaries WHERE name ILIKE $1 OR type ILIKE $1`;
//     const values = [`%${searchTerm}%`];
//     try {
//       const result = await pool.query(queryText, values);
//       console.log(result);
//       return result.rows;
//     } catch (err) {
//       throw new Error('Error searching jewellaries: ' + err.message);
//     }
//   };

// create jewellary controller functions using sequelize
import Jewellary from '../model/jewellary.model.js';

// Create a new jewellary
export const createJewellary = async (jewellaryData) => {
  try {
    const newJewellary = await Jewellary.create(jewellaryData);
    return newJewellary;
  } catch (err) {
    throw new Error('Error creating jewellary: ' + err.message);
  }
};

// Get jewellary by ID
export const getJewellaryById = async (id) => { 
  try {
    const jewellary = await Jewellary.findByPk(id);
    return jewellary;
  } catch (err) {
    throw new Error('Error fetching jewellary: ' + err.message);
  }
};

// Update jewellary by ID
export const updateJewellaryById = async (id, updateData) => {
  try {
    const jewellary = await Jewellary.findByPk(id);
    if (!jewellary) {
      throw new Error('Jewellary not found');
    }
    console.log("update data:",updateData)
    const [updatedRowsCount, [updatedJewellary]] = await Jewellary.update(updateData, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return null;
    }
    console.log("update done",updatedJewellary)
    return updatedJewellary;
  } catch (err) {
    throw new Error('Error updating jewellary: ' + err.message);
  }
};

// Delete jewellary by ID
export const deleteJewellaryById = async (id) => {
  try {
    const jewellary = await Jewellary.findByPk(id);
    if (!jewellary) {
      throw new Error('Jewellary not found');
    }
    await jewellary.destroy();
    return jewellary;
  } catch (err) {
    throw new Error('Error deleting jewellary: ' + err.message);
  }
};

// Get all jewellaries by pagination
export const getAllJewellaries = async (page = 1, limit = 5) => {
  const offset = (page - 1) * limit;
  try {
    const jewellaries = await Jewellary.findAll({
      limit,
      offset,
      order: [['id', 'ASC']],
    });
    return jewellaries;
  } catch (err) {
    throw new Error('Error fetching jewellaries: ' + err.message);
  }
};

// search jewellaries by name or type
export const searchJewellaries = async (searchTerm) => {
  try {
    const jewellaries = await Jewellary.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchTerm}%` } },
          { type: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
    });
    return jewellaries;
  } catch (err) {
    throw new Error('Error searching jewellaries: ' + err.message);
  }
};