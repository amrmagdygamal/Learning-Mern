import app from './app';
import env from './Util/validateEnv'
import mongoose from "mongoose";







const PORT: number = parseInt((process.env.PORT || "4000") as string, 10)

mongoose.connect(env.MONGO_CONNETCTION).then(() => {
  console.log("Mongoose connected");
  app.listen(PORT, () => {
    console.log("Server runing on PORT: " + PORT);
  });
})
.catch(console.error);
