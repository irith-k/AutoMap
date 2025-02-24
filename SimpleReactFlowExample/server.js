// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Use middleware to parse JSON bodies

const LM_STUDIO_API = "http://localhost:1234/v1/chat/completions"; // LM Studio API


app.post('/generate-mindmap', async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  // Update the prompt to include the topic dynamically
  const prompt = `Generate a JSON object for a very simple React Flow mind map with 3 nodes on the topic '${topic}'. 
  Just return the JSON object, and no other text.
  The JSON should have nodes and edges, where:
  - Each node has id, position {x, y}, and data {label}.
  - Each edge has id, source, and target.
  Return it exactly in the following format, without adding extra quotation marks if not specified in the example format.
  Example Format:
  const mindMapData = {
    nodes: [
      { id: '1', position: { x: 250, y: 5 }, data: { label: 'NODE A' } },
      { id: '2', position: { x: 450, y: 100 }, data: { label: 'NODE B' } },
      { id: '3', position: { x: 650, y: 200 }, data: { label: 'NODE C' } }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' }
    ]
  };`;

  try {
    const response = await axios.post(LM_STUDIO_API, {
        model: "hermes-3-llama-3.2-3b", // Use Hermes model here
        messages: [
            { role: "system", content: "You are a helpful AI." },
            { role: "user", content: prompt },
        ],
        temperature: 0.7, 
    });

    const output = (response.data.choices[0].message.content); 
        
    res.json(output);


} catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to generate mind map" });
}

});

const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});