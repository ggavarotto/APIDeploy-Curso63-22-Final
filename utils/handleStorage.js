//Multer es un "middleware" de node.js para el manejo de multipart/form-data, 
//el cuál es usado sobre todo para la subida de archivos. 
//Está escrito sobre busboy para maximizar su eficiencia.
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const pathStorage = `${__dirname}/../public`
        callback(null, pathStorage)
    },
    filename: (req, file, callback) => {
        const ext = file.originalname.split(".").pop()
        const filename = `img-${Date.now()}.${ext}`
        callback(null, filename)
    }
});

const storageproducto = multer.diskStorage({
    destination: (req, file, callback) => {
        const pathStorage = `${__dirname}/../public/productos`
        callback(null, pathStorage)
    },
    filename: (req, file, callback) => {
        const ext = file.originalname.split(".").pop()
        const filename = `img-${Date.now()}.${ext}`
        callback(null, filename)
    }
});

//creamos el middleware
const fileUpload = multer({ storage })
const fileUploadProducto = multer({ storage: storageproducto })

module.exports = { fileUpload, fileUploadProducto }
