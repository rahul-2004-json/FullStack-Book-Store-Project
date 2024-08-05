import express from "express";
import { PORT, mongoDbURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
//This is to allow parsing request as json
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello User");
});

app.use("/books", bookRoutes);

mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
