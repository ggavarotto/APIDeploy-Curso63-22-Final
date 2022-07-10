const { check, validationResult } = require("express-validator")

const validatorCreateProducto = [
    check("producto") 
        .exists().withMessage("Producto es Requerido")
        .trim()
        .notEmpty().withMessage("Producto no puede ser vacio")
        .isLength({ min: 1, max: 200 }).withMessage("Contador de Caracteres: min 1; max 200"),    

    check("categoria") 
        .exists().withMessage("Categoria es Requerida")
        .trim()
        .notEmpty().withMessage("categoria no puede ser vacia")
        .isLength({ min: 1, max: 200 }).withMessage("Contador de Caracteres: min 1; max 200"),    

    check("descripcion") 
        .exists().withMessage("Descripcion es Requerido")
        .trim()
        .notEmpty().withMessage("Descripcion no puede ser vacia")
        .isLength({ min: 1, max: 200 }).withMessage("Contador de Caracteres: min 1; max 200"),    

   check("precio")
        .isInt({ min: 1, max: 2147483647 }).withMessage('Precio no es valido'),

    (req, res, next) => {
        //averiguamos si hay errores de validación en la request y los envolvemos en un objeto que tiene varias funciones útiles
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() })
        } else {
            next()
        }
    }
]

const validatorEditarProducto = [

    check("producto") 
    .exists().withMessage("Producto es Requerido")
    .trim()
    .notEmpty().withMessage("Producto no puede ser vacio")
    .isLength({ min: 1, max: 200 }).withMessage("Contador de Caracteres: min 1; max 200"),    

check("categoria") 
    .exists().withMessage("Categoria es Requerida")
    .trim()
    .notEmpty().withMessage("categoria no puede ser vacia")
    .isLength({ min: 1, max: 200 }).withMessage("Contador de Caracteres: min 1; max 200"),    

check("descripcion") 
    .exists().withMessage("Descripcion es Requerido")
    .trim()
    .notEmpty().withMessage("Descripcion no puede ser vacia")
    .isLength({ min: 1, max: 200 }).withMessage("Contador de Caracteres: min 1; max 200"), 
    
   check("precio")
        .isInt({ min: 1, max: 2147483647 }).withMessage('Precio no es valido'),

    (req, res, next) => {
        //averiguamos si hay errores de validación en la request y los envolvemos en un objeto que tiene varias funciones útiles
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() })
        } else {
            next()
        }
    }
]

module.exports = { validatorCreateProducto, validatorEditarProducto }