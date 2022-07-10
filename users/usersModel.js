/* Aquí va el modelo de datos... consultas a bases de datos*/
const pool = require("../data/config")

const getAllUsers = () => {
    const query = "SELECT * FROM usuarios"
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const getUserById = (id) => {
    const query = `SELECT * FROM usuarios WHERE id = ${id} LIMIT 1`
    try {
        return pool.query(query)
        } 
    catch (error) {
        error.message = error.code
        return error
        }
}

const editUserById = async (id, user) => {
  const query = `UPDATE usuarios SET ? WHERE id = ${id}`;
    try {
        return await pool.query(query, user)
        } 
    catch (error) {
        error.message = error.code
        return error
    }
}

const registerUser = async (user) => {
    const query = `INSERT INTO usuarios SET ?`
    try {
        return await pool.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const deleteUserById = (id) => {
    const query = `DELETE FROM usuarios WHERE id = ${id}`
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const loginUser = async (email) => {
    const query = `SELECT * FROM usuarios WHERE email = '${email}'`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

module.exports = { getAllUsers, getUserById, editUserById, deleteUserById, registerUser, loginUser }