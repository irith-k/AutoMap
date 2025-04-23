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
    { id: '1', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '2', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '3', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '4', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '5', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '6', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '7', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '8', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '9', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '10', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '11', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '12', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '13', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '14', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '15', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '16', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '17', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '18', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '19', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '20', type: 'mindMapNode', position: [Object], data: [Object] },
    { id: '21', type: 'mindMapNode', position: [Object], data: [Object] }
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

app.post('/update-mindmap', async (req, res) => {
  const { need, nodes, edges, topic } = req.body;

  if ( !need || !nodes || !edges || !topic ) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  // Update the prompt to include the topic dynamically
  const prompt = `You are an expert in generating mind maps, specifically, taking certain topics and breaking them down into multiple subtopics to generate extremely detailed,
  in-depth graphs for users.

  You are given an already existing ReactFlow mind map about the topic: '${topic}' with the following nodes and edges:
  - given nodes: ${JSON.stringify(nodes, null, 2)}
  - given edges: ${JSON.stringify(edges, null, 2)}
  
  Your goal is to UPDATE the above ReactFlow nodes and edges based on the following user need/change, again still relating the diagram's content to the overall topic: '${topic}':
  - need: '${need}'

  The completion must:
  - *** EXTREMELY IMPORTANT: RETURN THE COMPLETE REACT FLOW CODE, NOT JUST THE CHANGES REQUESTED. AS IN, RETURN THE "given nodes" and "given edges" and any associated changes (additions, deletions, etc.)
  - Preserve all already existing nodes and edges exactly as-is (including their positions) IF they are unrelated to the change

  - *** EXTREMELY IMPORTANT: KEEP THE 'position' OF ALL NODES IN THE OUTPUT(EXLUDING NEW CHANGES) THE SAME AS THE "given nodes" ABOVE ***

  - If new nodes/subtopics are requested to be added by the user, have them branch "centrally" around the center node/topic: '${topic}'
  - Make the minimal number of changes possible to the given nodes and edges
  - If the user change involves REMOVAL, remove the associated "node(s)" and "edge(s)" from the above list
  - If the user change involves ADDITION, add new "node(s)" and/or "edge(s)" to the above list, ensuring that their "positions" values are relevant to their related nodes.
  - NOT MODIFY ANY OTHER PART OF THE EXISTING MINDMAP.
  - After making the relevant changes, combine the "nodes" and "edges" arrays into a JSON object, formatted EXACTLY as shown below:
{
  nodes: [
    { "id": "1", "position": { "x": 100, "y": 100 }, "data": { "label": "Machine Learning" } },
    { "id": "2", "position": { "x": 300, "y": 100 }, "data": { "label": "Model Evaluation" } },
    { "id": "3", "position": { "x": 500, "y": 100 }, "data": { "label": "Training Data" } }
  ],
  edges: [
    { "id": "e1-2", "source": "1", "target": "2" },
    { "id": "e1-3", "source": "1", "target": "3" },
    { "id": "e2-4", "source": "2", "target": "4" }
  ]
}

  The JSON should have two arrays, nodes and edges, where:
  * Each node has id, position {x, y}, and data {label}.
  * Each edge has id, source, and target.  
  
  Here is an example of a PERFECT response:
  GIVEN: 
  - topic: Machine Learning
  - nodes: [
    { "id": "1", "position": { "x": 100, "y": 100 }, "data": { "label": "Machine Learning" } },
    { "id": "2", "position": { "x": 300, "y": 100 }, "data": { "label": "Model Evaluation" } },
    { "id": "3", "position": { "x": 500, "y": 100 }, "data": { "label": "Training Data" } }
  ]
  - edges: [
    { "id": "e1-2", "source": "1", "target": "2" },
    { "id": "e1-3", "source": "1", "target": "3" }
  ]
  - need: Add a new subtopic "Overfitting" under the node "Model Evaluation"

  PERFECT RESPONSE:
  {
  "nodes": [
    { "id": "1", "position": { "x": 100, "y": 100 }, "data": { "label": "Machine Learning" } },
    { "id": "2", "position": { "x": 300, "y": 100 }, "data": { "label": "Model Evaluation" } },
    { "id": "3", "position": { "x": 500, "y": 100 }, "data": { "label": "Training Data" } },
    { "id": "4", "position": { "x": 300, "y": 200 }, "data": { "label": "Overfitting" } }
  ],
  "edges": [
    { "id": "e1-2", "source": "1", "target": "2" },
    { "id": "e1-3", "source": "1", "target": "3" },
    { "id": "e2-4", "source": "2", "target": "4" }
  ]
}

`;

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