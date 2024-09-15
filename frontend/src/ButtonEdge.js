// ButtonEdge.js
import React from 'react';
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from 'react-flow-renderer';

import './index.css';

const foreignObjectSize = 40;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
  onEdgeClick,
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const isPendingRemoval = data?.isPendingRemoval || false;

  // Apply red stroke if pending removal
  const pathStyle = isPendingRemoval
    ? { ...style, stroke: 'red', strokeWidth: 2 }
    : style;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>
          <button
            className="edgebutton"
            onClick={(event) => onEdgeClick(event, id)} // Use the passed onEdgeClick
            style={{
                // width: '100%',
                // height: '100%',
                borderRadius: '100%',
                border: 'none',
                background: isPendingRemoval ? 'red' : '#fff',
                color: isPendingRemoval ? '#fff' : '#000',
                cursor: 'pointer',
              }}
              title={isPendingRemoval ? "Click again to remove" : "Remove edge"}
          >
            ×
          </button>
        </body>
      </foreignObject>
    </>
  );
}
