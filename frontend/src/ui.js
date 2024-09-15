// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, addEdge } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { CheckboxNode } from './nodes/checkboxNode';
import { FileUploadNode } from './nodes/fileUploadNode';
import { MultiSelectNode } from './nodes/multiSelectNode';
import { DateNode } from './nodes/dateNode';
import { NotesNode } from './nodes/notesNode';

import ButtonEdge from './ButtonEdge'; // Import ButtonEdge

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  checkbox: CheckboxNode,
  fileUpload: FileUploadNode,
  select: MultiSelectNode,
  multiSelect: MultiSelectNode,
  customDate: DateNode,
  notes: NotesNode,
};

// Selector for Zustand store
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onElementsRemove: state.onElementsRemove,
  setEdgePendingRemoval: state.setEdgePendingRemoval,
  resetEdgePendingRemoval: state.resetEdgePendingRemoval,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onElementsRemove, // Destructure onElementsRemove
    setEdgePendingRemoval,
    resetEdgePendingRemoval,
  } = useStore(selector, shallow);

  // Handler to remove edges
  const handleEdgeRemove = useCallback(
    (event, id) => {
      event.stopPropagation(); // Prevent event bubbling
      const edge = edges.find(e => e.id === id);
      if (edge.data?.isPendingRemoval) {
        // If already pending removal, remove it
        onElementsRemove([{ id, type: 'edge' }]);
      } else {
        // Set edge to pending removal
        setEdgePendingRemoval(id);
        // Reset the pending state after 5 seconds
        setTimeout(() => {
          resetEdgePendingRemoval(id);
        }, 3000);
      }
    },
    [edges, onElementsRemove, setEdgePendingRemoval, resetEdgePendingRemoval]
  );

  // Define edgeTypes inside the component to access handleEdgeRemove
  const edgeTypes = {
    buttonedge: (edgeProps) => (
      <ButtonEdge
        {...edgeProps}
        onEdgeClick={handleEdgeRemove} // Pass the handler directly
      />
    ),
  };

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(
          event.dataTransfer.getData('application/reactflow')
        );
        const type = appData?.nodeType;

        // Check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='simplebezier'
        >
          <Background color='#aaa' gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};
