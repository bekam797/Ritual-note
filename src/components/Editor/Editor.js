import { useCallback } from "react";
import { Slate, Editable } from "slate-react";
import useEditorConfig from "../../hooks/EditorConfig";
import useCommandMenu from "../../hooks/useCommandMenu";
import CommandMenu from "../CommandMenu/CommandMenu";
import Element from "../Element/Element";

import "./Editor.css";

const Editor = ({ editor, value, onChange, cursorPosition }) => {
  const { renderLeaf, onKeyDown } = useEditorConfig(editor);
  const [isCommandMenuOpen, setIsCommandMenuOpen, checkKeyForMenu] =
    useCommandMenu();

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const handleOnKeyDown = (event) => {
    onKeyDown(event);
    checkKeyForMenu(event);
  };

  return (
    <div className="editor-container">
      <Slate editor={editor} value={value} onChange={onChange}>
        <Editable
          placeholder="Type / for commands"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleOnKeyDown}
          className="editor"
        />
        <CommandMenu
          cursorPosition={cursorPosition}
          isCommandMenuOpen={isCommandMenuOpen}
          setIsCommandMenuOpen={setIsCommandMenuOpen}
          editorObj={value}
        />
      </Slate>
    </div>
  );
};

export default Editor;
