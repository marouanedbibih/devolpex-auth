import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { PORT,MONGODB_URI } from "./config/env";
import router from "./routes/routes";

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_mongo_connection_string' with your actual connection string)
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any );

app.use('/', router);


app.listen(PORT ,()=>{
    console.log(`App run in http://localhost:${PORT}`);
})