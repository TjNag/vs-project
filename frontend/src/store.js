// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge(
          {
            ...connection,
            type: 'buttonedge', // Use custom edge type
            animated: true,
            markerEnd: {
              type: MarkerType.Arrow,
              height: '20px',
              width: '20px'
            },
            data: { isPendingRemoval: false }, // Initialize flag
          },
          get().edges
        ),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    onElementsRemove: (elementsToRemove) => {
      const nodeIdsToRemove = elementsToRemove
        .filter((el) => el.type === 'node')
        .map((el) => el.id);
      const edgeIdsToRemove = elementsToRemove
        .filter((el) => el.type === 'edge')
        .map((el) => el.id);
    
      set({
        nodes: get().nodes.filter(
          (node) => !nodeIdsToRemove.includes(node.id)
        ),
        edges: get().edges.filter((edge) => {
          const isEdgeToRemove = edgeIdsToRemove.includes(edge.id);
          const isConnectedToRemovedNode =
            nodeIdsToRemove.includes(edge.source) ||
            nodeIdsToRemove.includes(edge.target);
          return !isEdgeToRemove && !isConnectedToRemovedNode;
        }),
      });
    },
    setEdgePendingRemoval: (id) => {
      set(state => ({
        edges: state.edges.map(edge => 
          edge.id === id 
            ? { ...edge, data: { ...edge.data, isPendingRemoval: true } } 
            : edge
        ),
      }));
    },
    resetEdgePendingRemoval: (id) => {
      set(state => ({
        edges: state.edges.map(edge => 
          edge.id === id 
            ? { ...edge, data: { ...edge.data, isPendingRemoval: false } } 
            : edge
        ),
      }));
    },
    selectedHandleType: null,
    setSelectedHandleType: (data) => set({ selectedHandleType: data }),

    connectingHandle: null,

    // Method to set the connecting handle
    setConnectingHandle: (data) => set({ connectingHandle: data }),

    // Method to reset the connecting handle
    resetConnectingHandle: () => set({ connectingHandle: null }),
  }));
