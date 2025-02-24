"use client";
import { useState, useCallback } from "react";
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
  const [topic, setTopic] = useState(""); // Store user input
  const [nodes, setNodes] = useState([]); // Store nodes separately
  const [edges, setEdges] = useState([]); // Store edges separately
  const [loading, setLoading] = useState(false);

  // Handle node drag/move events
  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  // Handle edge updates
  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  // Handle edge connection (dragging from one node to another)
  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  // Handle renaming nodes
  const onNodeDoubleClick = useCallback((event, node) => {
    const newLabel = prompt("Enter new label for this node:", node.data.label);
    if (newLabel) {
      setNodes((nds) =>
        nds.map((n) => (n.id === node.id ? { ...n, data: { label: newLabel } } : n))
      );
    }
  }, []);

  // Handle edge removal on click
  const onEdgeClick = useCallback((event, edge) => {
    if (window.confirm("Delete this connection?")) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
  }, []);

  // Add a new node dynamically
  const addNewNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: "default",
      data: { label: `New Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      draggable: true,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Handle submit when the button is clicked
  const handleSubmit = async () => {
    if (!topic) return;

    console.log("Submitted topic:", topic);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3002/generate-mindmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Mind map data from server:", data);

        // CHECK IF IT'S IN THE RIGHT FORMAT

        let parsedData = data; // Default assumption

        // Check if data.nodes is a string, meaning the whole object is still stringified
        if (typeof data === "string") {
          parsedData = JSON.parse(data);
        } else if (typeof data.nodes === "string") {
          parsedData.nodes = JSON.parse(data.nodes);
          parsedData.edges = JSON.parse(data.edges);
        }

        // CHECK IF IT'S IN THE RIGHT FORMAT

        console.log("Parsed mind map data:", parsedData);

        // Convert nodes to a format ReactFlow understands
        const newNodes = parsedData.nodes.map((node) => ({ // parsedData
          id: node.id,
          type: "default",
          data: { label: node.data.label },
          position: node.position,
          draggable: true, // Enable dragging
        }));

        // Convert edges to ReactFlow format
        const newEdges = parsedData.edges.map((edge) => ({ // parsedData
          id: edge.id,
          source: edge.source,
          target: edge.target,
          animated: true, // Optional: makes edges animated
        }));

        setNodes(newNodes);
        setEdges(newEdges);
      } else {
        console.error("Failed to fetch mind map");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic for the mind map"
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        style={{ padding: "10px", backgroundColor: "blue", color: "black", marginRight: "10px" }}
      >
        {loading ? "Generating..." : "Generate Mind Map"}
      </button>

      <button
        type="button"
        onClick={addNewNode}
        style={{ padding: "10px", backgroundColor: "green", color: "white" }}
      >
        Add Node
      </button>

      {nodes.length > 0 && (
        <div style={{ marginTop: "20px", height: "500px", border: "1px solid black" }}>
          <h2>Mind Map for: {topic}</h2>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange} // Enable node updates
            onEdgesChange={onEdgesChange} // Enable edge updates
            onConnect={onConnect} // Enable new edge connections
            onNodeDoubleClick={onNodeDoubleClick} // Rename nodes on double click
            onEdgeClick={onEdgeClick} // Remove edges on click
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      )}
    </div>
  );
};

export default MindMap;
