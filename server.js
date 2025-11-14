const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors()); // allow requests from any origin

// Use your Bright Data API key in an environment variable
const API_KEY = process.env.BRIGHTDATA_API_KEY;

// POST endpoint to search for jobs
app.post("/api/jobs", async (req, res) => {
  const { keyword, location } = req.body;

  if (!keyword || !location) {
    return res.status(400).json({ error: "keyword and location are required" });
  }

  try {
    // Build LinkedIn search URL (or use the Bright Data endpoint)
    const searchUrl = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(
      keyword
    )}&location=${encodeURIComponent(location)}`;

    // Call Bright Data API
    const response = await fetch("https://api.brightdata.com/linkedin/jobs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: [{ url: searchUrl }]
      }),
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
