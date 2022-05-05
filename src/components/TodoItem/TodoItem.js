import React, { useState } from "react";

const TodoItem = (props) => {
  const [checked, setChecked] = useState(false);
  const { attributes, children } = props;

  return (
    <div {...attributes}>
      <span contentEditable={false} className="mr-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          style={{ marginRight: 10 }}
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
