import client from "../../server/mercadopago.js";
import { Preference, Payment } from "mercadopago";
import Producto from "../models/producto.js";
import Pedido from "../models/pedido.js";

export const crearOrdenCarrito = async (req, res) => {
  try {
    const { productosCarrito } = req.body;

    if (!productosCarrito || productosCarrito.length === 0) {
      return res.status(400).json({ mensaje: "El carrito está vacío" });
    }

    const idsProductos = productosCarrito.map((p) => p.id);
    const productosDB = await Producto.find({ _id: { $in: idsProductos } });
    const productosMap = new Map(productosDB.map((p) => [p._id.toString(), p]));

    let totalPedido = 0;
    const itemsParaMP = [];
    const productosDelPedido = [];

    for (const itemCarrito of productosCarrito) {
      const productoDB = productosMap.get(itemCarrito.id);
      if (productoDB) {
        itemsParaMP.push({
          title: productoDB.nombreProducto,
          quantity: itemCarrito.quantity,
          currency_id: "ARS",
          unit_price: productoDB.precio,
        });
        productosDelPedido.push({
          producto: productoDB._id,
          cantidad: itemCarrito.quantity,
        });
        totalPedido += productoDB.precio * itemCarrito.quantity;
      }
    }

    if (itemsParaMP.length === 0) {
      return res.status(404).json({
        mensaje: "Ninguno de los productos del carrito fue encontrado.",
      });
    }

    const nuevoPedido = new Pedido({
      productos: productosDelPedido,
      total: totalPedido,
      estado: "Pendiente",
    });
    await nuevoPedido.save();

    const preference = {
      items: itemsParaMP,
      back_urls: {
        success: `${process.env.FRONTEND_URL || "http://localhost:5173"}/pago/exitoso`,
        failure: `${process.env.FRONTEND_URL || "http://localhost:5173"}/pago/fallido`,
        pending: `${process.env.FRONTEND_URL || "http://localhost:5173"}/pago/pendiente`,
      },
      auto_return: "approved",
      external_reference: nuevoPedido._id.toString(),
    };

    const preferenceClient = new Preference(client);
    const respuesta = await preferenceClient.create({ body: preference });

    res.status(201).json({ init_point: respuesta.init_point });
  } catch (error) {
    res.status(500).json({
      mensaje: "Ocurrió un error al procesar el pago del carrito",
      error: error.message,
    });
  }
};

export const recibirWebhook = async (req, res) => {
  const notification = req.body;

  try {
    if (notification.type === "payment") {
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: notification.data.id });

      if (payment && payment.status === "approved") {
        const pedidoId = payment.external_reference;
        const pedido = await Pedido.findById(pedidoId);

        if (!pedido) return res.sendStatus(404);

        if (pedido.estado === "Pendiente") {
          pedido.estado = "Aprobado";
          pedido.paymentId = payment.id;
          await pedido.save();
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error interno del servidor al procesar el webhook",
    });
  }
};
