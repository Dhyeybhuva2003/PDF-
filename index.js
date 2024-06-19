const express = require("express");
const cors = require("cors");
const expressFileUploader = require("express-fileupload");
const loginroutes =require("./routes/authRoutes")

const pdfRoutes = require("./routes/pdfDocumentRoutes");
const { connectCloudinary } = require("./config/cloudinary");

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cors()); // Enable CORS for all origins

// File upload middleware
app.use(
  expressFileUploader({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Connect to MongoDB
require("./config/db")();

// Connect to Cloudinary
connectCloudinary();

// Routes
app.use("/pdf", pdfRoutes);
app.use("/",loginroutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
