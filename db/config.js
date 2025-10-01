import mongoose from "mongoose";

try {
  mongoose.connect(process.env.MONGODB).then(() => {
    console.info("Base de datos conectada");
  });
} catch (error) {
  console.error(error);
}

export default mongoose;
