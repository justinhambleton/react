const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

require('dotenv').config();

const generateCurlCommand = (url, headers, data) => {
  const headerString = Object.entries(headers).map(([key, value]) => `-H "${key}: ${value}"`).join(' ');
  const dataString = data ? `-d '${JSON.stringify(data)}'` : '';
  return `curl -X POST ${headerString} ${dataString} '${url}'`;
};

app.post('/api/user-progress', async (req, res) => {
  const { retailer_id, user_id, ids, culture } = req.body;
  const url = `${process.env.CONNECT_HOST}/incentives/api/1.0/progress/rule_tree/user_progress`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Basic ${process.env.AUTH_TOKEN}`
  };
  const data = {
    retailer_id,
    user_id,
    ids,
    culture
  };
  console.log('cURL request:', generateCurlCommand(url, headers, data));
  try {
    const response = await axios.post(url, data, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user progress:', error.response ? error.response.data : error.message);
    res.status(500).send(error.message);
  }
});

app.post('/api/get-user-offers', async (req, res) => {
  const { retailer_id, user_id, skip, take, include_pending_extended_data, culture } = req.body;
  const url = `${process.env.CONNECT_HOST}/offers/api/2.0/offers/get_user_offers`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${process.env.AUTH_TOKEN}`
  };
  const data = {
    retailer_id,
    user_id,
    skip,
    take,
    include_pending_extended_data,
    culture
  };
  console.log('cURL request:', generateCurlCommand(url, headers, data));
  try {
    const response = await axios.post(url, data, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user offers:', error.response ? error.response.data : error.message);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
