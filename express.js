require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router")
const cors = require("cors");
const port = process.env.PORT 
 
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",router)  

 
app.listen(port || 5001, '0.0.0.0', () => {
    console.log("Server is running.",port);
  });