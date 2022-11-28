const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
//Connect to Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.use(cors());
//Define Routess
app.use("/api/departments", require("./routes/api/departments"));
const PORT = 5005;
console.log(process.env.NODE_ENV);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
