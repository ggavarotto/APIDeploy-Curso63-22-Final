const pool = require("../data/config");

const getPostsWith = async (string) => {
  const query = `SELECT * FROM productos WHERE producto LIKE '%${string}%'`;
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const getAllPosts = async () => {
  const query = "SELECT * FROM productos";
  try {
    return await pool.query(query);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const addNewPost = async (post) => {
  const query = "INSERT INTO productos SET ?";
  try {
    return await pool.query(query, post);
  } catch (error) {
    error.message = error.code;
    return error;
  }
};

const editProductobyId = async (id, producto) => {
  const query = `UPDATE productos SET ? WHERE id = ${id}`;
    try {
        return await pool.query(query, producto)
        } 
    catch (error) {
        error.message = error.code
        return error
    }
}

const deleteProductoById = (id) => {
  const query = `DELETE FROM productos WHERE id = ${id}`
  try {
      return pool.query(query)
  } catch (error) {
      error.message = error.code
      return error
  }
}

module.exports = { getPostsWith, getAllPosts, addNewPost, editProductobyId, deleteProductoById };