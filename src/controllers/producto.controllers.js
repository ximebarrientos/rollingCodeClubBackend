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
      
        res.status(201).json({mensaje:"Producto creado con exito"});
        
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Error al crear el producto", error:error.message})
    }
}

export const obtenerProductos= async(req, res) => {
    try {
        const listaProductos = await Producto.find();
        res.status(200).json(listaProductos);
        
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Error al obtener los productos", error:error.message})
    }
}