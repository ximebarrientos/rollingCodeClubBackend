import mongoose, {Schema}from "mongoose";

const canchaSchema = new Schema({
  nombreCancha: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
    unique:true
  },
  categoriaCancha: {
    type: String,
    enum: [
      "Fútbol 7 techada",
      "Fútbol 7 descubierta",
      "Fútbol 5 techada",
      "Fútbol 5 descubierta"
    ],
    required: true
  },
  precioCancha: {
    type: Number,
    required: true,
    min: 1000,
    max: 1000000,
  },
  horariosCancha: {
    type: [String],
    enum: [
      "18:30-20:00",
      "20:00-21:30",
      "21:30-23:00",
      "23:30-00:30"
    ],
    required: true
  },
  descripcionCancha: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 250
  },
    imagenCancha: {
    type: String,
    required: true,
    validate: {
      validator: (valor) => {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/.test(
          valor
        );
      },
    },
  }
  
}, { timestamps: true });

const Cancha = mongoose.model("cancha", canchaSchema);

export default Cancha