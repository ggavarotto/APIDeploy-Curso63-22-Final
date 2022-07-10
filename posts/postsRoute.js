const router = require("express").Router();
const { listAll, addOne, editProducto, removeProducto} = require("./postsController");
const { validatorCreateProducto, validatorEditarProducto } = require("../validators/productos");
const isAuth = require("../middlewares/isAuth");


const { fileUploadProducto } = require("../utils/handleStorage");

router.get("/", listAll);

router.post("/", fileUploadProducto.single("file"), isAuth, validatorCreateProducto, addOne);
//router.post("/", validatorCreateProducto, addOne);
//router.post("/", fileUploadProducto.single("file"), validatorCreateProducto, addOne);

router.patch("/:id", validatorEditarProducto, editProducto)

router.delete("/:id", removeProducto)

module.exports = router;