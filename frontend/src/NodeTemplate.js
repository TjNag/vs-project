// NodeTemplate.js

import React, { useEffect, useState } from "react";
import { Handle, useUpdateNodeInternals } from "reactflow";
import { RxCrossCircled } from "react-icons/rx";
import { useStore } from "./store";

export const NodeTemplate = ({
  id,
  name,
  icon,
  handles = [],
  style,
  children,
}) => {
  const updateNodeInternals = useUpdateNodeInternals();

  const onElementsRemove = useStore((state) => state.onElementsRemove);

  // State to track hovered handle
  const [hoveredHandleId, setHoveredHandleId] = useState(null);

  // Access global store for handle selection and connection states
  const selectedHandleType = useStore((state) => state.selectedHandleType);
  const setSelectedHandleType = useStore(
    (state) => state.setSelectedHandleType
  );
  const connectingHandle = useStore((state) => state.connectingHandle);

  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, id, updateNodeInternals]);

  const handleClose = () => {
    onElementsRemove([{ id, type: "node" }]); // Remove the node by its ID
  };

  return (
    <div className="border border-black p-1 rounded-lg bg-light-color hover:shadow-[0_4px_10px_rgba(52,211,153,0.5)]">
      <div
        style={{
          border: "1px solid #10b981",
          ...style,
        }}
        className="w-[250px] h-fit rounded-[8px] bg-white"
      >
        {handles.map((handle, index) => {
          // Determine the background color based on the state
          let backgroundColor;

          // Highlight the starting handle and opposite-type handles in red
          if (
            connectingHandle &&
            (handle.id === connectingHandle.handleId ||
              handle.type ===
                (connectingHandle.handleType === "source"
                  ? "target"
                  : "source"))
          ) {
            backgroundColor = "DarkGreen";
          } else if (
            selectedHandleType &&
            (selectedHandleType.clickedHandleId === handle.id ||
              handle.type === selectedHandleType.selectedType)
          ) {
            // Highlight selected handles
            backgroundColor = "LawnGreen";
          } else if (hoveredHandleId === handle.id) {
            // Highlight hovered handle
            backgroundColor = "LimeGreen";
          } else {
            // Default colors based on handle position
            backgroundColor =
              handle.position === "left" ? "Aquamarine" : "Turquoise";
          }

          return (
            <div key={`${id}-${index}`}>
              <Handle
                type={handle.type}
                position={handle.position}
                id={handle.id}
                onMouseEnter={() => setHoveredHandleId(handle.id)}
                onMouseLeave={() => setHoveredHandleId(null)}
                onClick={() => {
                  const oppositeType =
                    handle.type === "source" ? "target" : "source";
                  if (
                    selectedHandleType &&
                    selectedHandleType.clickedHandleId === handle.id
                  ) {
                    setSelectedHandleType(null); // Deselect if clicked again
                  } else {
                    setSelectedHandleType({
                      clickedHandleId: handle.id,
                      selectedType: oppositeType,
                    });
                  }
                }}
                style={{
                  width: '14px', // Outer circle size
                  height: '14px',
                  borderRadius: '50%', // Make it round
                  backgroundColor: 'white', // Color of the outer circle
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${backgroundColor} `, // Border of the outer circle
                  ...handle.style,
                }}
              >
                <div style={{
                  width: '8px', // Inner circle size
                  height: '8px',
                  borderRadius: '50%', // Make it round
                  backgroundColor: backgroundColor, // Color of the inner circle
                  pointerEvents: 'none', // Ignore all mouse events on the inner div
                }} />
              </Handle>
              {handle.name && (
                <div
                  style={{
                    position: "absolute",
                    top: `${parseFloat(handle.style.top) - 15}px`,
                    left: `-${handle.name.length * 7}px`,
                    color: "rgba(60, 21, 115, 1)",
                    fontSize: "12px",
                  }}
                >
                  {handle.name}
                </div>
              )}
            </div>
          );
        })}
        <div
          style={{
            borderBottom: "0.5px #059669 solid",
          }}
          className=" p-1 text-[14px] font-bold py-2 pl-2"
        >
          <div className="flex gap-1 items-center text-text-dark-color">
            {icon}
            {name}
          </div>
        </div>
        <div className="mx-4 my-3 rounded-lg nodrag">{children}</div>
        <div
          className="absolute top-2 right-2 cursor-pointer text-light-red hover:text-red-500"
          onClick={handleClose}
        >
          <RxCrossCircled size={20} />
        </div>
      </div>
    </div>
  );
};
