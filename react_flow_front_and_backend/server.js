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
  Your goal is to create a mind map that will leave the user satisfied.

  The completion must:
  - Be EXTREMELY insightful and detailed, with at least 5 "subpoints" for the main topic,
  - Have each subpoint containing at least 3 "sub-sub points". Thus, you should produce at least 16 nodes, one for the topic, which branches into five subtopics, and
  each subtopic has 3 points.
  - Have the subpoint nodes "branch" evenly around the center node, rather than just spreading in one direction. Also, each of the 3 "sub-sub points" should
  be distributed evenly around each "subpoint". Please also ensure
  - Ensure there is NO overlap in nodes themselves, and nodes that "branch" should ALWAYS be in close proximity to each other.
  - Ensure that nodes in differing "subtopics" are FAR from each other.
  - Ensure the overall "ReactFlow" diagram is HUGE, taking up AMPLE space.
  - Return the JSON object, and no other text.
  The JSON should have two arrays, nodes and edges, where:
  * Each node has id, position {x, y}, and data {label}.
  * Each edge has id, source, and target.
  Your response must be EXACTLY in the following format:

  Example Format of an IDEAL response:
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
    { id: '12', position: [Object], data: [Object] },
    { id: '13', position: [Object], data: [Object] },
    { id: '14', position: [Object], data: [Object] },
    { id: '15', position: [Object], data: [Object] },
    { id: '16', position: [Object], data: [Object] },
    { id: '17', position: [Object], data: [Object] },
    { id: '18', position: [Object], data: [Object] },
    { id: '19', position: [Object], data: [Object] },
    { id: '20', position: [Object], data: [Object] },
    { id: '21', position: [Object], data: [Object] }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e1-4', source: '1', target: '4' },
    { id: 'e1-5', source: '1', target: '5' },
    { id: 'e1-6', source: '1', target: '6' },
    { id: 'e2-7', source: '2', target: '7' },
    { id: 'e2-8', source: '2', target: '8' },
    { id: 'e2-9', source: '2', target: '9' },
    { id: 'e3-10', source: '3', target: '10' },
    { id: 'e3-11', source: '3', target: '11' },
    { id: 'e3-12', source: '3', target: '12' },
    { id: 'e4-13', source: '4', target: '13' },
    { id: 'e4-14', source: '4', target: '14' },
    { id: 'e4-15', source: '4', target: '15' },
    { id: 'e5-16', source: '5', target: '16' },
    { id: 'e5-17', source: '5', target: '17' },
    { id: 'e5-18', source: '5', target: '18' },
    { id: 'e6-19', source: '6', target: '19' },
    { id: 'e6-20', source: '6', target: '20' },
    { id: 'e6-21', source: '6', target: '21' }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "o3-mini",
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
  res.json(jsonData);

});

const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
