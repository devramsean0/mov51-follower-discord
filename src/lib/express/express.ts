// Setup Vars
import express from "express";
import { generateRoutes } from "./generateRoutes.js";
const app = express();
const port = process.env.PORT || 3000

generateRoutes(app);

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});