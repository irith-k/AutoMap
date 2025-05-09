"use client";

import React, { useCallback } from "react";
import MindMapNode from './mind-map-node';
import { useNewNodeStore } from './store';

import {
    ReactFlow,
    Background, 
    BackgroundVariant,
    MiniMap,
    useReactFlow,
    useNodesState,
    useEdgesState,
    applyNodeChanges,
    addEdge,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
    ConnectionLineType,
    SelectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  mindMapNode: MindMapNode,
};

let id = 1;
const getId = () => `${id++}`;

const initialNodes: any[] = [
    // { id: getId(), type: 'mindMapNode', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    // { id: getId(), type: 'mindMapNode', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
    // { id: getId(), type: 'mindMapNode', position: { x: 0, y: 200 }, data: { label: 'Node 3' } },
    // { id: getId(), type: 'mindMapNode', position: { x: 0, y: 300 }, data: { label: 'Node 4' } },
    // { id: getId(), type: 'mindMapNode', position: { x: 0, y: 400 }, data: { label: 'Node 5' } },
    // { id: getId(), type: 'mindMapNode', position: { x: 0, y: 500 }, data: { label: 'Node 6' } },
    // { id: getId(), type: 'mindMapNode', position: { x: 0, y: 600 }, data: { label: 'Node 7' } },
    // { id: getId(), type: 'mindMapNode', position: { x: 0, y: 700 }, data: { label: 'Node 8' } },
    // { id: getId(), type: 'mindMapNode', position: { x: 0, y: 800 }, data: { label: 'Node 9' } },
];
const initialEdges: any[] = [
    // { id: 'e1-2', source: '1', target: '2' },
    // { id: 'e2-3', source: '2', target: '3' },
    // { id: 'e1-4', source: '1', target: '4' },
    // { id: 'e1-5', source: '1', target: '5' },
    // { id: 'e4-6', source: '4', target: '6' },
    // { id: 'e4-7', source: '4', target: '7' },
    // { id: 'e2-8', source: '2', target: '8' },
    // { id: 'e5-9', source: '5', target: '9' },
];

const defaultEdgeOptions = {
  type: 'straight',
  elevateEdgesOnSelect: true,
};

const MindMap = () => {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();    

    const onConnect = useCallback(
        (params: any) => {
          if(params.source !== params.target) {
            // if(!edges.some((edge) =>
            //     (edge.source === params.target && edge.target === params.source)
            // )) {      
              setEdges((eds) => addEdge(params, eds));
            // }
          }
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

    const setOpenDialog = useNewNodeStore((state) => state.setOpenDialog);
    const setNewNodePosition = useNewNodeStore((state) => state.setNewNodePosition);

    const onDoubleClick = useCallback((event: any) => {
      const { clientX, clientY } = event;
      if (!event.target.closest('.react-flow__node')) {
        const position = screenToFlowPosition({ x: clientX, y: clientY });
        setNewNodePosition(position);
        setOpenDialog(true);
      }
    }, [screenToFlowPosition]);
  
    return (
        <div style={{ width: '100%', height: '100%'}}>
            <ReactFlow 
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeOrigin={[0.5, 0.5]}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesDelete={onNodesDelete}
                onDoubleClick={onDoubleClick}
                selectionMode={SelectionMode.Partial}
                selectNodesOnDrag={false}
                zoomOnDoubleClick={false}
                connectionLineType={ConnectionLineType.Straight}
                proOptions={{hideAttribution: true}}
                fitView
            >
                <MiniMap position="bottom-left" />
                <Background color='#ccc' variant={BackgroundVariant.Dots} gap={12} size={1} />
                
            </ReactFlow>
        </div>
    );
};

export default MindMap;