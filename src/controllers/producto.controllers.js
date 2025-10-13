import subirImagenCloudinary from "../helpers/cloudinaryUploader.js"
import Producto from "../models/producto.js"

export const prueba= (req, res) => {
    res.status(200)
    res.send("Mensaje desde el controlador de productos")
}

export const crearProducto= async(req, res) => {
    try {
        let imagenUrl= '';
        if (req.file){
            const resultado = await subirImagenCloudinary(req.file.buffer)
            console.log(resultado);
            imagenUrl = resultado.secure_url;
        }else{
            imagenUrl = 'https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'            
        }

        const productoNuevo = new Producto({
            ...req.body,
            imagen: imagenUrl
        })

        await productoNuevo.save()
        res.status(201).json({mensaje:"Producto creado con exito", producto: productoNuevo});
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

export const obtenerProductoPorId = async (req, res) => {
    try {
        const productoBuscado = await Producto.findById(req.params.id)
        if(!productoBuscado){
            return res.status(404).json({mensaje:"El producto no existe"})
        }
        res.status(200).json(productoBuscado);
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje:"Error al obtener el producto por el Id"})
    }  
}

export const borrarProductoPorId = async (req, res) => {
    try {
        const productoBorrado = await Producto.findByIdAndDelete(req.params.id)
        if(!productoBorrado){
            return res.status(404).json({mensaje:"El producto no existe."})
        }
        res.status(200).json({mensaje:"Producto borrado con exito."})
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje:"Error al borrar el producto por el Id."})
    }
}

export const editarProductoPorId = async (req, res) => {
    try {
        const productoBuscado = await Producto.findById(req.params.id)
        if(!productoBuscado){
            return res.status(404).json({mensaje:"El producto no encontrado."});
        }
        let imagenUrl = productoBuscado.imagen;

        if (req.file){
            const resultado = await subirImagenCloudinary(req.file.buffer);
            imagenUrl = resultado.secure_url;
        }

        const productoEditado = await Producto.findByIdAndUpdate(req.params.id,
            {
            ...req.body,
            imagen: imagenUrl,
        });
        res.status(200).json({mensaje:"Producto editado con éxito.", producto: productoEditado})
        } catch (error) {
        console.error(error);
        res.status(500).json({mensaje:"Error al editar el producto por el Id."})
    }
}