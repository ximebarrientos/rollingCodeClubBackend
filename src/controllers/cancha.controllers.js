

export const prueba= (req, res) => {
    res.status(200)
    res.send("Mensaje desde el controlador de canchas")
}

export const crearCancha= async(req, res) => {
    try {
        console.log(req.body)
        res.send("desde la logica de crear producto")
    } catch (error) {
        console.error(error)
    }
}