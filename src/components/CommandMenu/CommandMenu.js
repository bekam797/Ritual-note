import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Transforms } from "slate";
import { useSlate } from "slate-react";

import "./CommandMenuStyles.css";

const allowedTags = [
  {
    type: "h1",
    label: "Heading 1",
    children: [{ text: "" }],
  },
  {
    type: "h2",
    label: "Heading 2",
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [{ text: "" }],
    label: "Text",
  },
  {
    type: "todo-list-item",
    children: [{ text: "" }],
    checked: false,
    label: "To-do list",
  },
  {
    type: "list-item",
    label: "List item",
    children: [{ text: "" }],
  },
];

const CommandMenu = ({
  cursorPosition,
  isCommandMenuOpen,
  setIsCommandMenuOpen,
}) => {
  const editor = useSlate();
  const [items] = useState(allowedTags);

  const handleAddMenuItem = (item) => {
    editor.deleteBackward("character");
    Transforms.insertNodes(editor, [item]);

    setIsCommandMenuOpen(false);
    editor.removeMark("/");
  };

  if (!isCommandMenuOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        left: cursorPosition
          ? cursorPosition.left + window.pageXOffset - 5
          : -10000,
        top: cursorPosition
          ? cursorPosition.bottom + window.pageYOffset + 4
          : -10000,
      }}
    >
      <div className="SelectMenu">
        <div className="Items">
          {items.map((item, key) => {
            return (
              <div
                key={key}
                role="button"
                tabIndex="0"
                onMouseDown={() => handleAddMenuItem(item)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CommandMenu;
