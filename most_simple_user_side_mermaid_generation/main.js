import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

function MermaidEditor() {
  const [code, setCode] = useState(`graph TD
A[Start] --> B{Decision}
B -->|Yes| C[Action]
B -->|No| D[Another Action]`);
  const [error, setError] = useState('');
  const diagramRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'default',
    });

    const renderDiagram = async () => {
      try {
        if (diagramRef.current) {
          const { svg } = await mermaid.mermaidAPI.render('mermaid-svg', code);
          diagramRef.current.innerHTML = svg;
          setError('');
        }
      } catch (err) {
        setError(err.message);
        if (diagramRef.current) diagramRef.current.innerHTML = '';
      }
    };

    renderDiagram();
  }, [code]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '50%', padding: '20px', borderRight: '1px solid #ccc' }}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ width: '100%', height: '90%', fontFamily: 'monospace' }}
          placeholder="Enter Mermaid code here..."
        />
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </div>
      
      <div 
        ref={diagramRef}
        style={{ 
          width: '50%', 
          padding: '20px',
          overflow: 'auto',
          backgroundColor: '#f5f5f5'
        }}
      ></div>
    </div>
  );
}

export default MermaidEditor;