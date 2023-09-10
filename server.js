const express = require("express");
const app = express();

const dotenv = require("dotenv");
const itemsPool = require("./DBConfig");
dotenv.config();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Simple API homepage");
});
app.listen(5070, () => {
  console.log("Server running on port 5070");
});
// app.get("/api/items", (req, res) => {
//   res.send("Sending a list of items from the DB ...");
// });
// app.post("/api/items", (req, res) => {
//   res.status(201).send("Sent the new data to the DB ...");
// });
app.get("/api/items", async (req, res) => {
  try {
    const allItems = await itemsPool.query("SELECT * FROM items");
    res.json(allItems.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
app.post("/api/items", async (req, res) => {
  const { description } = req.body;
  try {
    const newItem = await itemsPool.query(
      "INSERT INTO items (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json({
      message: "New item added!",
      item: newItem.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
