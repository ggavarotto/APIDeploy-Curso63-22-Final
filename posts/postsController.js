const { addNewPost, getAllPosts, getPostsWith, editProductobyId, deleteProductoById } = require("./postsModel");
const { matchedData } = require("express-validator");
const url = process.env.public_url;
const notNumber = require("../utils/notNumber");

const listAll = async (req, res, next) => {
  let dbResponse = null;
  if (req.query.producto) { //http://localhost:3030/posts?producto=XXX este endpoint indica: req.query.producto = JavaScript
    dbResponse = await getPostsWith(req.query.producto);
  } else {
    dbResponse = await getAllPosts();
  }
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

const addOne = async (req, res, next) => {

  const categoria = req.body.categoria;
  const producto = req.body.producto;
  const descripcion = req.body.descripcion;
  const precio = req.body.precio;
  const imagen = url + "productos/" + req.file.filename;  
  const usuario = req.token.id;

  const dbResponse = await addNewPost({ categoria, producto, descripcion, precio, imagen, usuario });
  //const dbResponse = await addNewPost({ categoria, producto, descripcion, precio, imagen });
  
  dbResponse instanceof Error
    ? next(dbResponse)
    //: res.status(201).json({ message: `Producto posteado por ${req.token.email}` });
    : res.status(201).json({ message: `Producto posteado` });
};

const editProducto = async (req, res, next) => {
  
  if (notNumber(req.params.id, res)) return; //sino es numerico se sale... 
  
  const dbResponse = await editProductobyId(+req.params.id, req.body);//edita el producto en la base...
  
  if (dbResponse instanceof Error) return next(dbResponse);//si es error, se sale...
  
  dbResponse.affectedRows ? res.status(200).json(req.body) : next();
};


//delete producto by ID
const removeProducto = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await deleteProductoById(+req.params.id);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(204).end() : next();
};

module.exports = { listAll, addOne, editProducto, removeProducto };