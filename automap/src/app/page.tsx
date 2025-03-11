'use client'

import React from "react";
import { ReactFlowProvider } from "@xyflow/react"
import Header from "@/components/header"
import MindMap from "@/components/mind-map"

export default function Home() {
  return (
    <div>
      <ReactFlowProvider>
        <Header></Header>
        <main>
            <div style={{ width: 'auto', height: '86vh', margin: '25px', borderStyle: 'solid', borderColor: '#ccc', borderWidth: '1px'}}>
              <MindMap></MindMap>
            </div>
        </main>
      </ReactFlowProvider>
    </div>
  );
}
