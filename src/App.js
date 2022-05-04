import { useEffect, useMemo, useState } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import Editor from "./components/Editor/Editor";
import InitialValue from "./utils/InitialValue";

import "./App.css";

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [inputValue, setInputValue] = useState("Untitled");
  const [value, updateValue] = useState(InitialValue);
  const [cursorPosition, setCursorPosition] = useState(null);

  useEffect(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    setCursorPosition(sel.getRangeAt(0).getBoundingClientRect());
  }, [value]);

  return (
    <div className="App">
      <div className="textfield-container">
        <input
          className="textfield"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <Editor
        editor={editor}
        value={value}
        onChange={updateValue}
        cursorPosition={cursorPosition}
      />
    </div>
  );
};

export default App;
