"use client";

import React, { forwardRef } from "react";
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
import {  } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' }
];

const MindMap = forwardRef<HTMLDivElement>((_, ref) => {

    return (
        <div style={{ width: '100%', height: '100%'}}>
            <ReactFlow 
                ref={ref}
                nodes={initialNodes}
                edges={initialEdges}
                proOptions={{hideAttribution: true}}
            >
                <Background 
                    color='#ccc' 
                    variant={BackgroundVariant.Dots} 
                />
            </ReactFlow>
        </div>
    );
});

export default MindMap;