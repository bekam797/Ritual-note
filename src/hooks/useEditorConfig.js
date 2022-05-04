import { useCallback } from "react";
import { toggleStyle } from "../utils/EditorUtils";
import isHotkey from "is-hotkey";

export default function useEditorConfig(editor) {
  const onKeyDown = useCallback(
    (event) => KeyBindings.onKeyDown(editor, event),
    [editor],
  );
  return { renderLeaf, onKeyDown };
}

const renderLeaf = ({ attributes, children, leaf }) => {
  let el = <>{children}</>;

  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (leaf.code) {
    el = <code>{el}</code>;
  }

  if (leaf.italic) {
    el = <em>{el}</em>;
  }

  if (leaf.underline) {
    el = <u>{el}</u>;
  }

  return <span {...attributes}>{el}</span>;
};

const KeyBindings = {
  onKeyDown: (editor, event) => {
    if (isHotkey("mod+b", event)) {
      toggleStyle(editor, "bold");
      return;
    }
    if (isHotkey("mod+i", event)) {
      toggleStyle(editor, "italic");
      return;
    }
    if (isHotkey("mod+c", event)) {
      toggleStyle(editor, "code");
      return;
    }
    if (isHotkey("mod+u", event)) {
      toggleStyle(editor, "underline");
      return;
    }
  },
};
