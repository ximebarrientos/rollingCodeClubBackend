import mongoose, { Schema } from "mongoose";

const turnoSchema = new Schema(
  {
    canchaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cancha",
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    horario: {
      type: String,
      enum: ["18:30-20:00", "20:00-21:30", "21:30-23:00", "23:30-00:30"],
      required: true,
    },
    // campos adicionales opcionales
    // clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "client" },
    // estado: { type: String, enum: ["reservado", "cancelado"], default: "reservado" }
  },
  { timestamps: true }
);

// indice compuesto para asegurar unicidad de turnos por cancha, fecha y horario
turnoSchema.index({ canchaId: 1, fecha: 1, horario: 1 }, { unique: true });

const Turno = mongoose.model("turno", turnoSchema);

export default Turno;
