const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const db = require("./config/db");
const userRoutes = require("./routes/users");
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use("/users", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

