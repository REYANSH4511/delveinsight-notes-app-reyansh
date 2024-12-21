const express = require("express");
const app = express();
const helmet = require("helmet");
const { dbConnection } = require("./dbConnection");
const bodyParser = require("body-parser");
const PORT = 8080 || 8000;
const server = require("http").createServer(app);
const router = require("./src/index");
const cors = require("cors");
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
    console.log("JWT_SECRET_KEY",process.env.JWT_SECRET_KEY)
  res.send("Hello World!");
});

app.use("/api", router);
dbConnection().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
