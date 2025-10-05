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
        res.status(500).json({mensaje:"Error al crear el producto"})
    }
}

export const obtenerProductos = async (req, res) => {
  try {
    const { categoria, subcategoria } = req.query;

    const filtro = {};

    if (categoria) filtro.categoria = categoria;
    if (subcategoria) filtro.subcategoria = subcategoria;

    console.log("Filtro usado:", filtro);

    const listaProductos = await Producto.find(filtro);

    res.status(200).json(listaProductos);
  } catch (error) {
    console.error("Error en obtenerProductos:", error);
    res.status(500).json({
      mensaje: "Error al obtener los productos"});
  }
}