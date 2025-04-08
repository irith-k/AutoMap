'use client'

import React from "react";
import { ReactFlowProvider } from "@xyflow/react"
import Header from "@/components/header"
import MindMap from "@/components/mind-map"
import ChatSupport from "@/components/chat-support"

export default function Home() {
  return (
    <div>
      <main>
        <ReactFlowProvider>
          <Header></Header>
            <div style={{ width: 'auto', height: '91vh'}}>
              <MindMap></MindMap>
            </div>
            <ChatSupport />
        </ReactFlowProvider>
      </main>
    </div>
  );
}
