const { check, validationResult } = require("express-validator")

const validatorCreateUser = [
    check("nombre") //name
        .exists().withMessage("Nombre es requerido")
        .trim()
        .isAlpha('es-ES', { ignore: ' ' }).withMessage("Solo letras")
        .notEmpty().withMessage("Nombres no puede ser vacio")
        .isLength({ min: 2, max: 90 }).withMessage("Contador Caracteres: min 2; max 90"),
    check("email")
        .exists().withMessage("Email es requerido")
        .isEmail().withMessage("Email debe ser valido")
        .normalizeEmail(),
    check("password")
        .exists().withMessage("Password es requerida")
        .isLength({ min: 8 }).withMessage("Password debe tener al menos 8 caracteres")
        .trim(),

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

validatorLoginUser = [
    check("email")
        .exists().withMessage("Email es requerido")
        .isEmail().withMessage("Email debe ser valido")
        .normalizeEmail(),

    check("password")
        .exists().withMessage("Password es requerida")
        .isLength({ min: 8 }).withMessage("Password debe tener al menos 8 caracteres")
        .trim(),

    (req, res, next) => {
//averiguamos si hay errores de validación en la request y los envolvemos en un objeto que tiene varias funciones útiles
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            //console.log("IF")
            return res.status(400).json({ errores: errors.array() })
        } else {
                    next()
            }
     }
]

const validatorResetPassword = [
    check("password_1")
        .exists()
        .isLength({ min: 8, max: 15 }).withMessage("Contador Caracteres: min 8, max 15")
        .trim(),
    check("password_2")
        .custom(async (password_2, { req }) => {
            if (req.body.password_1 !== password_2) {
                throw new Error("Ambas Password deben ser iguales")
            }
        }),
    (req, res, next) => {
        const { token } = req.params
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const arrWarnings = errors.array()
            res.render("reset", { arrWarnings, token })
        } else {
            return next()
        }
    }
]

module.exports = { 
    validatorCreateUser,
    validatorLoginUser,
    validatorResetPassword 
}