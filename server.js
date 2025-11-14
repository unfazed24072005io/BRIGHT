// Install dependencies: npm install express axios cors
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const ZENROWS_API_KEY = '9c2e1ae26fa9205e835a31186e4f538988c7846a';

app.get('/scrape', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing URL parameter' });

  try {
    const response = await axios.get('https://api.zenrows.com/v1/', {
      params: {
        url,
        apikey: ZENROWS_API_KEY,
        js_render: true,
      },
    });

    res.json({ html: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch page' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
