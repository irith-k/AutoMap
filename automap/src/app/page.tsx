'use client'

import React, { useRef } from "react";

import Header from "@/components/header"
import MindMap from "@/components/mind-map"

export default function Home() {
  const mindMapRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Header mindMapRef={mindMapRef}></Header>
      <main>
        <div style={{ width: 'auto', height: '86vh', margin: '25px', padding: '10px', borderStyle: 'solid', borderColor: '#ccc', borderWidth: '1px'}}>
          <MindMap ref={mindMapRef}></MindMap>
        </div>
      </main>
    </div>
  );
}
