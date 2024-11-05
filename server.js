const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const Ticker = require("./models/Ticker");
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/hodlinfo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function fetchData() {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const data = response.data;
    const tickers = Object.values(data)
      .slice(0, 10)
      .map((ticker) => ({
        name: ticker.name,
        last: ticker.last,
        buy: ticker.buy,
        sell: ticker.sell,
        volume: ticker.volume,
        base_unit: ticker.base_unit,
      }));

    await Ticker.deleteMany({});
    await Ticker.insertMany(tickers);
    console.log("Data fetched and stored successfully");
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

setInterval(fetchData, 60000);

app.get("/api/tickers", async (req, res) => {
  try {
    const tickers = await Ticker.find({});
    res.json(tickers);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  fetchData();
});
