import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  NodeChange,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    data: {
      label: (
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Child 1"
            className="w-16 h-16 rounded-full border"
          />
          <span className="text-sm font-bold mt-2">Grandfather</span>
        </div>
      ),
    },
    position: { x: 250, y: 0 },
    // style: { background: '#000000', border: '1px solid #ddd', width: 150, height: 50 },
  },
  {
    id: '2',
    data: {
      label: (
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Child 2"
            className="w-16 h-16 rounded-full border"
          />
          <span className="text-sm font-bold mt-2">Child 1</span>
        </div>
      ),
    },
    position: { x: 150, y: 150 },
    // style: { background: '#000000', border: '1px solid #ddd', width: 100, height: 40 },
  },
  {
    id: '3',
    data: {
      label: (
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Child 3"
            className="w-16 h-16 rounded-full border"
          />
          <span className="text-sm font-bold mt-2">Child 2</span>
        </div>
      ),
    },
    position: { x: 350, y: 150 },
    // style: { background: '#000000', border: '1px solid #ddd', width: 100, height: 40 },
  },
  {
    id: '4',
    data: {
      label: (
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Child 4"
            className="w-16 h-16 rounded-full border"
          />
          <span className="text-sm font-bold mt-2">Child 3</span>
        </div>
      ),
    },
    position: { x: 50, y: 350 },
    // style: { background: '#000000', border: '1px solid #ddd', width: 100, height: 40 },
  },
  {
    id: '5',
    data: {
      label: (
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Child 4"
            className="w-16 h-16 rounded-full border"
          />
          <span className="text-sm font-bold mt-2">Child 4</span>
        </div>
      ),
    },
    position: { x: 250, y: 350 },
    // style: { background: '#000000', border: '1px solid #ddd', width: 100, height: 40 },
  },
  {
    id: '6',
    data: {
      label: (
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Child 5"
            className="w-16 h-16 rounded-full border"
          />
          <span className="text-sm font-bold mt-2">Child 5</span>
        </div>
      ),
    },
    position: { x: 550, y: 450 },
    // style: { background: '#000000', border: '1px solid #ddd', width: 100, height: 40 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '2', target: '3' },
  { id: 'e1-4', source: '2', target: '5' },
  { id: 'e1-5', source: '2', target: '4' },
  { id: 'e1-6', source: '3', target: '5' },
  { id: 'e1-7', source: '2', target: '6' },
];

const FamilyTree: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  // Callback to handle position changes
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes); // Update node positions
      console.log('Node positions updated:', nodes); // Log updated positions
    },
    [onNodesChange, nodes]
  );

  return (
    <div className="h-[91vh] bg-gray-100 flex items-center justify-center">
      <div className="w-full h-full border bg-white shadow-md rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange} // Register the callback here
          fitView
        >
          <Background variant={BackgroundVariant.Cross} gap={12} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

export default FamilyTree;
