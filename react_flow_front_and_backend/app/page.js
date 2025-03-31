"use client";
import React, { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const MindMap = () => {
  const [edges, setEdges] = useState([]);
  const [nodes, setNodes] = useState([]);


  async function submitMindmapTopic() {
    let topic = document.getElementById("mindmap_topic").value;
    if( topic.length === 0 ) return;

    let response = await fetch("http://localhost:3002/generate-mindmap", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({topic})
    })

    let response_correct = await response.json();
    let newnodes = response_correct.nodes;
    let newedges = response_correct.edges;
    setNodes(newnodes);
    setEdges(newedges);


  }

  return(
    <div style={
      {width: "1500px",
      height:"1000px"}
      }>
      <text>Hello! Please enter a mind map topic...</text>
      <input id={"mindmap_topic"} placeholder="Enter topic here"/>
      <button onClick={submitMindmapTopic}>Submit</button>
      <ReactFlow
          nodes={nodes}
          edges={edges}
      fitView
      style={{ backgroundColor: "#F7F9FB" }}
      >
      </ReactFlow>
    </div>
  );

};

export default MindMap;
