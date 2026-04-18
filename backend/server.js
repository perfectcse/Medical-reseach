const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
const searchRoutes = require("./routes/search");
app.use("/search", searchRoutes);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});