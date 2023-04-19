import app from './app';
import env from './Util/validateEnv'
import mongoose from "mongoose";







const port = env.PORT;

mongoose.connect(env.MONGO_CONNETCTION).then(() => {
  console.log("Mongoose connected");
  app.listen(port, () => {
    console.log("Server runing on port: " + port);
  });
})
.catch(console.error);
