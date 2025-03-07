"use client";

import React, { forwardRef, useCallback, useState } from "react";
import { FloatButton } from "antd";
import {
    ReactFlow,
    Background, 
    BackgroundVariant,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    applyNodeChanges,
    addEdge,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
    ControlButton,
  } from '@xyflow/react';  
import {  } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: '3', position: { x: 0, y: 200 }, data: { label: '3' } },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
];

const MindMap = forwardRef<HTMLDivElement>((_, ref) => {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [editingNodeId, setEditingNodeId] = useState(null);
    const [editText, setEditText] = useState("");

    const onConnect = useCallback(
        (params: any) => {
          if (params.source !== params.target) setEdges((eds) => addEdge(params, eds));
        },
        [setEdges],
    );

    const onNodesChange = useCallback((changes: any) => {
      setNodes((nodes) => applyNodeChanges(changes, nodes));
    }, []);
    
    const onNodesDelete = useCallback(
        (deleted: any[]) => {
          setEdges(
            deleted.reduce((acc: any[], node: any) => {
              const incomers = getIncomers(node, nodes, edges);
              const outgoers = getOutgoers(node, nodes, edges);
              const connectedEdges = getConnectedEdges([node], edges);
     
              const remainingEdges = acc.filter(
                (edge: { id: string; source: string; target: string; }) => !connectedEdges.includes(edge),
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

    const onNodeDoubleClick = useCallback((event: any, node: any) => {
      setEditingNodeId(node.id);
      setEditText(node.data.label);
    }, []);
  
    const onChange = (event: any) => {
      setEditText(event.target.value);
    };

    const onBlur = () => {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === editingNodeId ? { ...node, data: { ...node.data, label: editText } } : node
        )
      );
      setEditingNodeId(null);
    };

    return (
        <div style={{ width: '100%', height: '100%'}}>
            <ReactFlow 
                ref={ref}
                nodes={nodes.map((node) => ({
                  ...node,
                  data: {
                    ...node.data,
                    label: editingNodeId === node.id ? (<input
                      type="text"
                      value={editText}
                      onChange={onChange}
                      onBlur={onBlur}
                      autoFocus
                    />) : (node.data.label),
                  },
                }))}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesDelete={onNodesDelete}
                onNodeDoubleClick={onNodeDoubleClick}
                zoomOnDoubleClick={false}
                proOptions={{hideAttribution: true}}
            >
                <Controls orientation='horizontal' showInteractive={false} position='bottom-center'>
                </Controls>
                <MiniMap position="top-right" />
                <Background color='#ccc' variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
});

export default MindMap;