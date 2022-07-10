const notNumber = (id, res) => {

//isNaN intenta convertir el parámetro pasado a un número. 
//Si el parámetro no se puede convertir, devuelve true; en caso contrario, devuelve false

    if (isNaN(Number(id))) {
        res.status(400).json({ message: "ID must be a positive integer" })
        return true
    } else {
        return false
    }
};
module.exports = notNumber;