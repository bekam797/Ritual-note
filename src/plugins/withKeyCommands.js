import { Editor, Node, Path, Transforms } from "slate";

import { createParagraphNode } from "../utils/paragraph";

const withKeyCommands = (editor) => {
  const { deleteBackward, insertBreak, isVoid } = editor;

  editor.deleteBackward = (args) => {
    const [parentNode] = Editor.parent(
      editor,
      editor.selection.focus.path,
    );

    if (!editor.selection || editor.selection.anchor.offset !== 0) return deleteBackward(args);
    const prevNodePath = Path.previous(Path.parent(editor.selection.anchor.path));
    const prevNode = Node.get(editor, prevNodePath);
    if (Editor.isVoid(editor, prevNode) || !Node.string(parentNode).length) {
      return Transforms.removeNodes(editor);
    }

    deleteBackward(args);
  };

  editor.insertBreak = (...args) => {
    const [parentNode, parentPath] = Editor.parent(
      editor,
      editor.selection.focus.path,
    );

    if (isVoid(parentNode)) {
      const nextPath = Path.next(parentPath);
      Transforms.insertNodes(editor, createParagraphNode(), {
        at: nextPath,
        select: true,
      });
    } else {
      insertBreak(...args);
    }
  };

  return editor;
};

export default withKeyCommands;
