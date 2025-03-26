import React, { useState, useLayoutEffect, useRef } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';

interface MindMapNodeProps extends NodeProps {
  data: {
    label: string;
  };
}

const MindMapNode: React.FC<MindMapNodeProps> = ({ id, data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "Node");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: any) => {
    setLabel(event.target.value);
  };

  const handleBlur = () => {
    if(label.trim()) {
      setIsEditing(false);
      data.label = label;
    } else {
      if(inputRef.current) inputRef.current.focus();
    }
  };

  return (
    <div className={`bg-white border relative transition-all ${selected ? "border-black" : "border-gray-300 hover:border-gray-400"} shadow-none rounded-md text-center`} onDoubleClick={handleDoubleClick}>
      <div
        className={`flex relative pr-3 py-2 h-10 text-center`}
      >
        <div className="cursor-grab left-px z-10 active:cursor-grabbing">
          <img src="drag-handle.png" className="w-full h-full pointer-events-none"></img>
        </div>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="border-none outline-none w-full text-center"
            value={label}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <span className="text-center">{label}</span>
        )}
      </div>
      <Handle 
        type="target" 
        position={Position.Top}
        style={{
          top: "50%",
          height: '100%',
          width: '100%',
          opacity: 0,
          pointerEvents: "none"
        }}
      />
      <Handle 
        type="source" 
        position={Position.Top}
        style={{
          top: 0,
          left: 0,
          transform: 'none',
          background: 'transparent',
          height: '100%',
          width: '100%',
          borderRadius: '4px',
          border: 'none',
        }}
      />
    </div>
  );
};

export default MindMapNode;
