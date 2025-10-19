import Pedido from "../models/pedido.js";

export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("productos.producto", "nombreProducto precio")
      .sort({ createdAt: -1 });

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los pedidos",
      error: error.message,
    });
  }
};

export const obtenerPedidosAprobados = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ estado: "Aprobado" })
      .populate("productos.producto", "nombreProducto precio")
      .sort({ createdAt: -1 });

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los pedidos aprobados",
      error: error.message,
    });
  }
};
