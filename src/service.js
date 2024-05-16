const express = require("express");
const connectDB = require("./db"); // Import the function to connect to MongoDB
const mobilesRouter = require("./routes/mobiles"); // Import the router for mobiles
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs

// Middleware
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/pakmobiles", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB connection
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define Mobile schema and model
const mobileSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  image: String,
  rating: Number,
  description: String,
  specs: Object,
});

const Mobile = mongoose.model("mobiles", mobileSchema);

// Routes
app.use("", mobilesRouter); // Mount the mobiles router

// Endpoint to get distinct brands
app.get("/api/brands", async (req, res) => {
  try {
    const brands = await Mobile.distinct("brand");
    res.json(brands);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint to get models by brand
app.get("/api/models/:brand", async (req, res) => {
  try {
    const { brand } = req.params;
    const models = await Mobile.find({ brand }).select("name");
    res.json(models.map((model) => model.name));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

// Endpoint to get model details by name
app.get("/api/model/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const model = await Mobile.findOne({ name });
    if (!model) {
      return res.status(404).json({ error: "Model not found" });
    }
    res.json(model);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch model details" });
  }
});

const ListingSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  pictures: { type: [String], required: true },
});

const Listing = mongoose.model("listings", ListingSchema);

app.post("/api/listings", async (req, res) => {
  try {
    const { brand, model, description, condition, price, pictures } = req.body;
    const listing = new Listing({
      id: uuidv4(),
      username: "dummyUser", // Use a dummy username for now
      brand,
      model,
      description,
      condition,
      price,
      pictures,
    });
    await listing.save();
    res.status(201).json({ message: "Listing created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create listing" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
