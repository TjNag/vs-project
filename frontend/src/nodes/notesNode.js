import React, { useState } from "react";
import { NodeTemplate } from "./BaseNodeTemplate";
import { FormField } from "../utils/FormField";
import { FaNoteSticky } from "react-icons/fa6";

export const NotesNode = ({ id, data }) => {
  const [notesContent, setNotesContent] = useState(data?.notesContent || "");

  return (
    <NodeTemplate id={id} name="Notes" icon={<FaNoteSticky />}>
      <div>
        <FormField
          label=""
          type="textarea"
          value={notesContent}
          onChange={(e) => setNotesContent(e.target.value)}
          className="p-0 mb-0 border-none"
        />
      </div>
    </NodeTemplate>
  );
};
