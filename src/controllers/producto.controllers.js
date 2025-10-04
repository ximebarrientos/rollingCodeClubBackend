

export const prueba= (req, res) => {
    res.status(200)
    res.send("Mensaje desde el controlador de productos")
}

export const crearProducto= async(req, res) => {
    try {
        console.log(req.body)
       
        res.send("desde la logica de crear producto")
    } catch (error) {
        console.error(error)
    }
}