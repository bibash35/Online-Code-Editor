const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { ConnectToDb } = require("./db/Connection");
const authRoutes = require("./routes/user");

const cors = require("cors");

dotenv.config();

ConnectToDb();

app.use(cors());

app.use(express.json()); 

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
