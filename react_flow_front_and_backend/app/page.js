"use client";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "reactflow";
import "reactflow/dist/style.css";

const MindMap = () => {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [topic, setTopic] = useState("");


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
    setTopic(topic);


  }

  async function updateMindmap() {
    let need = document.getElementById("need").value;
    if( need.length === 0 ) return;

    let response = await fetch("http://localhost:3002/update-mindmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {
        need: need,
        nodes: nodes,
        edges: edges,
        topic: topic,
      })

    });

    let response_correct = await response.json();
    let newnodes = response_correct.nodes;
    let newedges = response_correct.edges;
    setNodes(newnodes);
    setEdges(newedges);
  }

  // The following code was retrieved from official ReactFlow documentation:
  // https://reactflow.dev/examples/nodes/delete-middle-node
  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);
 
          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge),
          );
 
          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            })),
          );
 
          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [nodes, edges],
  );

   
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );


  return(
    <div style={
      {width: "80%",
      height:"80vh"}
      }>
      <text>Hello! Please enter a mind map topic...</text>
      <input id={"mindmap_topic"} placeholder="Enter topic here"/>
      <button onClick={submitMindmapTopic}>Submit</button>
      <input id={"need"} placeholder="What do you want changed?"></input>
      <button onClick={updateMindmap}>Update Mindmap</button>
      <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodesDelete={onNodesDelete}
      fitView
      style={{ backgroundColor: "#F7F9FB" }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );

};

export default MindMap;
