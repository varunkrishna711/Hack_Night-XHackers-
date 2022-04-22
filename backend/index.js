const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api", require("./route"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("backend running ..."));
