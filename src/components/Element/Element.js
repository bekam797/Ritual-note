import { Range } from "slate";
import { useSelected, useSlate } from "slate-react";
import { ElementType } from "../../types";
import TodoItem from "../TodoItem/TodoItem";

const Element = (props) => {
  const { element, children, attributes } = props;

  const editor = useSlate();
  const selection = editor.selection;

  let isSelectionCollapsed = true;
  if (selection !== null)
    isSelectionCollapsed = Range.isCollapsed(editor.selection);
  const selected = useSelected();

  const isEmpty =
    element.children[0].text === "" && element.children.length === 1;

  switch (element.type) {
    case ElementType.HEADING_ONE:
      return <h1 {...attributes}>{children}</h1>;
    case ElementType.HEADING_TWO:
      return <h2 {...attributes}>{children}</h2>;
    case ElementType.TODO_LIST_ITEM: {
      return <TodoItem {...props} />;
    }
    case ElementType.LIST_ITEM: {
      return <li {...attributes}>{children}</li>;
    }
    default:
      return (
        <p
          {...props}
          className={
            selected && isEmpty && isSelectionCollapsed
              ? "selected-empty-element"
              : ""
          }
        >
          {children}
        </p>
      );
  }
};

export default Element;
