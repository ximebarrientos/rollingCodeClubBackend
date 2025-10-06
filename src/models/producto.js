import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
  nombreProducto: {
    type: String,
    required: true,
    maxLength: 100,
    minLength: 3,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 50,
    max: 1000000,
  },
  categoria: {
    type: String,
    required: true,
    enum: ["Indumentaria", "Accesorios"],
  },
  descripcion: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 500,
  },
  subcategoria: {
    type: String,
    required: true,
    enum: [
      "Botines",
      "Camisetas",
      "Shorts",
      "Kits de entrenamiento",
      "Pelotas",
    ],
  },
  imagen: {
    type: String,
    required: true,
    validate: {
      validator: (valor) => {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/.test(
          valor
        );
      },
    },
  },
  talles: {
    type: [String],
  },
  numeros: {
    type: [Number],
  },
});

const Producto = mongoose.model("producto", productoSchema);

export default Producto;
