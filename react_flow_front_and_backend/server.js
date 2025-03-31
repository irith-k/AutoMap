import 'dotenv/config';
import OpenAI from "openai";
import express from "express";
import cors from "cors";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
  projectId: process.env.OPENAI_PROJECT_ID
});

const app = express();
app.use(cors());
app.use(express.json());


app.post('/generate-mindmap', async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  // Update the prompt to include the topic dynamically
  const prompt = `You are an expert in generating mind maps, specifically, taking certain topics and breaking them down into multiple subtopics to generate extremely detailed,
  in-depth graphs for users.
  
  You will generate a JSON object for a detailed React Flow mind map with ample nodes on the topic: '${topic}'. 
  Your goal is to create a mind map that will leave the user satisfied. Please make it insightful and detailed.

  Just return the JSON object, and no other text.
  The JSON should have two arrays, nodes and edges, where:
  * Each node has id, position {x, y}, and data {label}.
  * Each edge has id, source, and target.
  Your response must be EXACTLY in the following format:

  Example Format:
  {
    nodes: [
      { id: '1', position: { x: 250, y: 5 }, data: { label: 'NODE A' } },
      { id: '2', position: { x: 450, y: 100 }, data: { label: 'NODE B' } },
      { id: '3', position: { x: 650, y: 200 }, data: { label: 'NODE C' } }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' }
    ]
  }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
              role: "user",
              content: prompt,
          },
      ],
      response_format: {"type":"json_object"}
  });

  const jsonData = JSON.parse(completion.choices[0].message.content);
  console.log(jsonData);

  /*
  Hello! If you are testing this out and don't want to do API requests, here is an example API response:

  {
  nodes: [
    { id: '1', position: [Object], data: [Object] },
    { id: '2', position: [Object], data: [Object] },
    { id: '3', position: [Object], data: [Object] },
    { id: '4', position: [Object], data: [Object] },
    { id: '5', position: [Object], data: [Object] },
    { id: '6', position: [Object], data: [Object] },
    { id: '7', position: [Object], data: [Object] },
    { id: '8', position: [Object], data: [Object] },
    { id: '9', position: [Object], data: [Object] },
    { id: '10', position: [Object], data: [Object] },
    { id: '11', position: [Object], data: [Object] },
    { id: '12', position: [Object], data: [Object] }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e1-4', source: '1', target: '4' },
    { id: 'e1-5', source: '1', target: '5' },
    { id: 'e1-6', source: '1', target: '6' },
    { id: 'e1-7', source: '1', target: '7' },
    { id: 'e2-10', source: '2', target: '10' },
    { id: 'e2-8', source: '2', target: '8' },
    { id: 'e3-9', source: '3', target: '9' },
    { id: 'e4-6', source: '4', target: '6' },
    { id: 'e5-11', source: '5', target: '11' },
    { id: 'e5-12', source: '5', target: '12' }
  ]
}

You can simple return the above ^^^ as a JSON and comment out the API calls above to openai. Thanks!
  */
  res.json(jsonData);

});

const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});