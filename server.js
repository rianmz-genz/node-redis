const express = require("express");
const measureExecutionTime = require("./middlewares/measureExecutionTime");
const speciesRoutes = require("./routes/speciesRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Use the middleware to measure execution time for all requests
app.use(measureExecutionTime);

// Use species routes
app.use("/fish", speciesRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
