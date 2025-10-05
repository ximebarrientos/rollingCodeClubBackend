import Producto from "../models/producto.js"

export const prueba= (req, res) => {
    res.status(200)
    res.send("Mensaje desde el controlador de productos")
}

export const crearProducto= async(req, res) => {
    try {
        console.log(req.body)
       
        const productoNuevo = new Producto(req.body)
        await productoNuevo.save()
        //mensaje de respuesta
        res.status(201).json({mensaje:"Producto creado con exito"});
        
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Error al crear el producto", error:error.message})
    }
}