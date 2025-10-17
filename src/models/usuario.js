import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 30,
    trim: true,
    validate: {
      validator: (valor) => {
        return /^[\w]+$/.test(valor);
      },
      message:
        "El nombre de usuario solo puede contener letras, números y guiones bajos (_).",
    },
  },

  nombre: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  apellido: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },

  fechaNacimiento: {
    type: Date,
    required: true,
  },

  genero: {
    type: String,
    required: true,
    enum: ["Masculino", "Femenino", "No Binario", "Prefiero no decir"],
  },

  celular: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 20,
    validate: {
      validator: (valor) => {
        return /^\d+$/.test(valor);
      },
      message:
        "El número de celular solo puede contener dígitos numéricos (0-9).",
    },
  },

  correoElectronico: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (valor) => {
        return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(valor);
      },
      message: "El formato del correo electrónico no es válido.",
    },
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 150,
  },

  rol: {
    type: String,
    enum: ["usuario", "administrador"],
    default: "usuario",
  },

  estado: {
    type: String,
    required: true,
    enum: ["activo", "bloqueado"],
    default: "activo",
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
