import React, { useState, useEffect, useRef } from 'react';
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
    <div
      className={`bg-white border transition-all ${selected ? "border-black" : "border-gray-300 hover:border-gray-400"} shadow-none rounded-md px-4 py-2 text-center cursor-pointer`}
      onDoubleClick={handleDoubleClick}
    >
      <Handle 
        type="target" 
        position={Position.Right}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          width: "10px",
          height: "10px",
          background: "transparent",
        }}
      />
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
      <Handle 
        type="source" 
        position={Position.Left}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          width: "10px",
          height: "10px",
          background: "transparent",
        }}
      />
    </div>
  );
};

export default MindMapNode;
