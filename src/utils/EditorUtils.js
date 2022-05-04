import { Editor } from "slate";

export const getActiveStyles = (editor) => {
  return new Set(Object.keys(Editor.marks(editor) ?? {}));
}

export const toggleStyle = (editor, style) => {
  const activeStyles = getActiveStyles(editor);
  if (activeStyles.has(style)) {
    Editor.removeMark(editor, style);
  } else {
    Editor.addMark(editor, style, true);
  }
}
