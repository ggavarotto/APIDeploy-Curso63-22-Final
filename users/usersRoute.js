/*En este archivo pondremos la referencia a la ruta asociada y, si las hubiera, 
subrutas (por ejemplo, podríamos recibir todas las peticiones de /users, 
pero también de /users/otracosa... etc). 
Luego de recibir la petición diferenciando el verbo HTTP (GET, POST, etc), enviaríamos al controlador apropiado. 
Si hubiera middlewares, se aplicarían en este archivo, entre la petición y el controlador*/

const { listAll, listOne, editOne, removeOne, register, login, forgot, reset, saveNewPass } = require("./usersController")

const router = require("express").Router()
const { validatorCreateUser, validatorLoginUser, validatorResetPassword } = require("../validators/users");
const { fileUpload } = require("../utils/handleStorage");

//get all users -> http://localhost:3030/users/ con GET
router.get("/", listAll);

//get user by id -> http://localhost:3030/users/5 con GET (ejemplo 5)
router.get("/:id", listOne);

//patch user -> http://localhost:3030/users/5 con PATCH(ejemplo 5)
//{
//    "nombre": "Mario Tata",
//    "email": "msukata@sukata.com.ar"
//}
router.patch("/:id", editOne)

//delete user by ID -> http://localhost:3030/users/5 con DELETE
router.delete("/:id", removeOne)

//Register new user -> http://localhost:3030/users/register con POST
//{
//    "nombre": "gaston gabba",
//    "email": "gaston-sk8@yahoo.com",
//    "password": "12345678jjj"
//}

//router.post("/register", validatorCreateUser, register)
router.post("/register", fileUpload.single("file"), validatorCreateUser, register)

//Login user -> http://localhost:3030/users/login con POST
//{
//    "email": "gaston-sk8@yahoo.com",
//    "password": "12345678"
//}
router.post("/login", validatorLoginUser, login)

//Forgot password -> http://localhost:3030/users/forgot-password con POST
//Create and send magic link
// {
//     "email": "gaston@yahoo.com"
// }
router.post("/forgot-password", forgot) //desde el front entra el mail del usuario quen olvidó password

//http://localhost:3030/users/reset/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiZ2FzdG9uQHlhaG9vLmNvbSIsImlhdCI6MTY1MjkxNDgzOSwiZXhwIjoxNjUyOTE1NzM5fQ.udUaDznm4ZxXO4iQSd5bD1hGw3u-w94D8SNuNwvd4O0
router.get("/reset/:token", reset) //mostramos el formulario de recuperación de contraseña
router.post("/reset/:token", validatorResetPassword, saveNewPass)//recibimos la nueva contraseña desde el formulario

module.exports = router