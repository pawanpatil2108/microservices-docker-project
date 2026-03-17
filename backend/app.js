const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5001;

/* Connect to MongoDB */
mongoose.connect("mongodb://mongodb:27017/devopsdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* Schema */
const UserSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model("User", UserSchema);

/* Insert sample data */
app.get("/init", async (req, res) => {
  await User.deleteMany({});
  await User.insertMany([
    { name: "Pawan" },
    { name: "DevOps Engineer" }
  ]);
  res.send("Data Inserted");
});

/* Fetch users */
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* Root */
app.get("/", (req, res) => {
  res.send("Backend running with MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

