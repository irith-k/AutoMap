"use client";

import React, { useCallback } from "react";
import MindMapNode from './mind-map-node';
import { Button } from "@/components/ui/button";
import {
    ReactFlow,
    Node,
    Edge,
    Background, 
    BackgroundVariant,
    Controls,
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

const initialNodes = [
    { id: getId(), type: 'mindMapNode', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: getId(), type: 'mindMapNode', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
    { id: getId(), type: 'mindMapNode', position: { x: 0, y: 200 }, data: { label: 'Node 3' } },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
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

    // const onConnectEnd = useCallback(
    //   (event: any, connectionState: any) => {
    //     if (!connectionState.isValid) {
    //       const newId = getId();
    //       const { clientX, clientY } =
    //         'changedTouches' in event ? event.changedTouches[0] : event;
    //       const newNode = {
    //         id: newId,
    //         type: 'mindMapNode',
    //         position: {
    //           x: clientX,
    //           y: clientY,
    //         },
    //         data: { label: `Node ${newId}` }
    //       };
   
    //       setNodes((nodes) => nodes.concat(newNode));
    //       setEdges((edges) =>
    //         edges.concat({ id: `e${connectionState.fromNode.id}-${newId}`, source: connectionState.fromNode.id, target: newId, }),
    //       );
    //     }
    //   },
    //   [screenToFlowPosition],
    // );

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
  
    return (
        <div style={{ width: '100%', height: '100%'}}>
            <ReactFlow 
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                defaultEdgeOptions={defaultEdgeOptions}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                //onConnectEnd={onConnectEnd}
                onNodesDelete={onNodesDelete}
                selectionMode={SelectionMode.Partial}
                selectNodesOnDrag={false}
                zoomOnDoubleClick={false}
                connectionLineType={ConnectionLineType.Straight}
                proOptions={{hideAttribution: true}}
                fitView
            >
                <Controls orientation='horizontal' showFitView={false} showInteractive={false} position='bottom-center' />
                <MiniMap position="bottom-left" />
                <Background color='#ccc' variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};

export default MindMap;