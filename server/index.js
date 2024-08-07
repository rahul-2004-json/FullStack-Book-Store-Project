import express from "express";
import { PORT, mongoDbURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
//This is to allow parsing request as json
app.use(express.json());

//Middleware for handling CORS Policy
//Option 1: Allow all Origins with default of cors(*)
app.use(cors());

//Option 2:Allow custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000", //Only the clients with this origin can access our server
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//     /*
//     Content-Type is an HTTP header that indicates the format of request and response body data. It specifies if the payload is JSON, XML, form data, etc
//     */
//   })
// );

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
