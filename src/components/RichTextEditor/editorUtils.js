import {
  EditorState,
  Modifier,
  RichUtils,
} from "draft-js";
import { NUM_OF_BUTTONS } from "./constants";

/**
 * Clear all content from the editor.
 */
export function clearEditorContent(editorState) {
  const blocks = editorState.getCurrentContent().getBlockMap().toList();
  const updatedSelection = editorState.getSelection().merge({
    anchorKey: blocks.first().get("key"),
    anchorOffset: 0,
    focusKey: blocks.last().get("key"),
    focusOffset: blocks.last().getLength(),
  });
  const newContentState = Modifier.removeRange(
    editorState.getCurrentContent(),
    updatedSelection,
    "forward"
  );
  return EditorState.push(editorState, newContentState, "remove-range");
}

/**
 * Remove block styles from the editor if any are selected.
 */
export function removeSelectedBlocksStyle(editorState) {
  const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
  if (newContentState) {
    return EditorState.push(editorState, newContentState, 'change-block-type');
  }
  return editorState;
}

/**
 * Set focus to the last or next element in rich tool bar
 */
export function focusLastOrNextElement(currentIndex, delta) {
  if (currentIndex + delta >= NUM_OF_BUTTONS || currentIndex + delta < 0) {
    return;
  }
  const currentElement = document.getElementById(`richToolbarButton_${currentIndex}`);
  currentElement.tabIndex = -1;
  const targetElement = document.getElementById(`richToolbarButton_${currentIndex+delta}`);
  targetElement.tabIndex = 0;
  targetElement.focus();
}
