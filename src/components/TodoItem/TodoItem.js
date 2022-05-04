import React from "react";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";

const TodoItem = (props) => {
  const editor = useSlateStatic();
  const { attributes, children, element } = props;
  const { checked } = element;

  return (
    <div {...attributes}>
      <span contentEditable={false} className="mr-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            const newProperties = {
              checked: event.target.checked,
            };
            Transforms.setNodes(editor, newProperties);
          }}
        />
      </span>
      <span
        style={{
          opacity: `${checked ? 0.666 : 1}`,
          textDecoration: `${!checked ? "none" : "line-through"}`,
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default TodoItem;
