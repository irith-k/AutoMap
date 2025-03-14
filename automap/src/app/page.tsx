'use client'

import React from "react";
import { ReactFlowProvider } from "@xyflow/react"
import Header from "@/components/header"
import MindMap from "@/components/mind-map"

export default function Home() {
  return (
    <div>
      <main>
        <ReactFlowProvider>
          <Header></Header>
            <div style={{ width: 'auto', height: '91vh'}}>
              <MindMap></MindMap>
            </div>
        </ReactFlowProvider>
      </main>
    </div>
  );
}
