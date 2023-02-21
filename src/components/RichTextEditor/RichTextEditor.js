// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import PT from 'prop-types';
import { EditorState, RichUtils, convertToRaw, CompositeDecorator, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { draftToMarkdown } from 'markdown-draft-js';
import { ErrorBoundary } from 'react-error-boundary';

import {
  AttachmentContainer,
  AttachmentOuterContainer,
  AttachmentInnerContainer,
  AttachmentsIcon,
  CloseIcon,
  EditorContainer,
  StyledEditor as Editor,
  IconButton,
  RichToolbarAttachmentsContainer,
  RichToolbarContainer,
  RichToolbarFormattingContainer,
  SendMessageButtonContainer,
  URLInput,
  URLInputLabel,
  URLInputContainer,
  URLLink,
  URLConfirmIcon,
  URLRemoveIcon
} from './styled';

import {
  blockTypeDisplayOrder,
  inlineFormatDisplayOrder,
  KEY_CODE,
  linkFormatDisplayOrder,
  emojisFormatDisplayOrder
} from './constants';

import {
  clearEditorContent,
  focusLastOrNextElement,
  removeSelectedBlocksStyle
} from './editorUtils';
import {
  RICH_FORMAT_ICONS,
  RICH_FORMAT_ICONS_SELECTED,
  ATTACHMENTS_ICON,
  REMOVE_LINK_ICON,
  CONFIRM_LINK_ICON
} from './assets';

import SendMessageButton from './SendMessageButton/SendMessageButton';
import RichToolbarButton from './RichToolbarButton/RichToolbarButton';
import EmojiPicker from '../Emojis/EmojiPicker';
import { isMobile, getEmojiPickerTopPosition } from '../Emojis/emojiUtils.js';

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return <URLLink href={url}>{props.children}</URLLink>;
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

/**
 * The error fall back UI that's not finalized
 * TODO: Revisit and update UI post launch https://app.asana.com/0/1201057534450490/1201587489851346/f
 */
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <button onClick={resetErrorBoundary}>Reload Editor</button>
    </div>
  );
}

/**
 * RichText toolbar and editor, intended to be used for input in a real-time chat application.
 * Supports markdown message and attachment sending, typing events, and additional configuration options.
 */
class RichTextEditor extends React.Component {
  // TODO: implement capturing typing events on content change
  // TODO: pull the toolbar out to a separate internal component to reduce bloat here
  // TODO: fix bug where multiple toggles in a row don't properly apply all styles
  // TODO: fix styling of the selected buttons
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ]);

    this.state = {
      editorState: EditorState.createEmpty(decorator),
      attachment: null,
      showURLInput: false,
      urlValue: '',
      showEmojiPicker: false
    };

    this.onChange = (editorState) => {
      if (this.state.editorState.getCurrentContent() !== editorState.getCurrentContent()) {
        this.props.onTyping();
      }
      this.setState((prevState) => {
        return { ...prevState, editorState };
      });
    };

    this.setDomEditorRef = (ref) => (this.domEditor = ref);
    this.focus = () => this.domEditor.focus();

    this.resetState = this._resetState.bind(this);
    this._handleReturn = this._handleReturn.bind(this);
    this.handleBeforeInput = this._handleBeforeInput.bind(this);
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
    this.promptForLink = this._promptForLink.bind(this);
    this.confirmLink = this._confirmLink.bind(this);
    this.removeLink = this._removeLink.bind(this);
    this.addTextToMessage = this._addTextToMessage.bind(this);
    this.onURLKeyInput = (e) => {
      if (!e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        this.confirmLink(e);
      }
    };
  }

  componentDidMount() {
    this.domEditor && this.domEditor.focus();
  }

  _onFormatToggled(formatType, toggleFn) {
    this.setState((prevState) => ({
      ...prevState,
      editorState: toggleFn(prevState.editorState, formatType)
    }));
  }

  /**
   * Handle the period added with double spaces
   * This is a workaround for known DraftJs bug - https://github.com/facebook/draft-js/issues/2422
   */
  _handleBeforeInput(chars, editorState, eventTimestamp) {
    if (chars === '. ') {
      const currentSelection = editorState.getSelection();
      this.setState({
        editorState: EditorState.set(editorState, {
          currentContent: Modifier.replaceText(
            editorState.getCurrentContent(),
            currentSelection,
            ' '
          )
        })
      });
      return 'handled';
    }
    return 'not-handled';
  }

  /**
   * Handle the "Return" key pressed. Sends message and attachment, and clears the editor state.
   */
  _handleReturn(event, isSendButtonClicked) {
    const currentContent = this.state.editorState.getCurrentContent();
    // Insert soft newline or split block without sending message if shift + return pressed
    if (event.shiftKey) {
      const selection = this.state.editorState.getSelection();
      const currentBlockStyle = currentContent.getBlockForKey(selection.getStartKey()).getType();
      if (currentBlockStyle === 'unstyled') {
        this.setState({ editorState: RichUtils.insertSoftNewline(this.state.editorState) });
      } else {
        const textWithEntity = Modifier.splitBlock(currentContent, selection);
        this.setState({
          editorState: EditorState.push(this.state.editorState, textWithEntity, 'split-block')
        });
      }
      return 'handled';
    }

    const rawContentState = convertToRaw(currentContent);

    const markdownString = draftToMarkdown(rawContentState);

    if (this.state.attachment) {
      this.props.sendAttachment(this.state.attachment);
    }

    this.props.sendMessage(markdownString);
    this.resetState();
    return 'handled';
  }

  _resetState() {
    let resetEditorState = clearEditorContent(this.state.editorState);
    resetEditorState = removeSelectedBlocksStyle(resetEditorState);
    this.setState({
      editorState: clearEditorContent(resetEditorState),
      attachment: null,
      showURLInput: false,
      urlValue: '',
      showEmojiPicker: false
    });
  }

  _promptForLink() {
    if (this.state.showURLInput) {
      this.setState({
        showURLInput: false
      });
      return;
    }
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState(
        {
          showURLInput: true,
          urlValue: url
        },
        () => {
          setTimeout(() => this.refs.url.focus(), 0);
        }
      );
    }
  }

  _confirmLink(e) {
    e.preventDefault();
    const { editorState } = this.state;
    let { urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    // Default protocol for hyperlinks
    if (!/^https?:\/\//i.test(urlValue)) {
      urlValue = 'http://' + urlValue;
    }
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState(
      {
        editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey),
        showURLInput: false,
        urlValue: ''
      },
      () => {
        setTimeout(() => this.domEditor.focus(), 0);
      }
    );
  }

  _removeLink(e) {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState(
        {
          editorState: RichUtils.toggleLink(editorState, selection, null),
          showURLInput: false
        },
        () => {
          setTimeout(() => this.domEditor.focus(), 0);
        }
      );
    }
  }

  _addTextToMessage(text) {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    let nextEditorState = EditorState.createEmpty();
    if (selection.isCollapsed()) {
      const nextContentState = Modifier.insertText(contentState, selection, text);
      nextEditorState = EditorState.push(editorState, nextContentState, 'insert-characters');
    } else {
      const nextContentState = Modifier.replaceText(contentState, selection, text);
      nextEditorState = EditorState.push(editorState, nextContentState, 'insert-characters');
    }
    this.onChange(nextEditorState);
  }

  _countRichFormatTypes(rawContentState) {
    // BOLD, ITALIC, NUMBER_LIST, BULLET_LIST are from blocks;
    // HYPER_LINK is from entityMap;
    const { blocks, entityMap } = rawContentState;
    const set = new Set();
    blocks.forEach((block) => {
      const { type, inlineStyleRanges } = block;
      if (type !== 'unstyled') {
        set.add(type);
      }
      inlineStyleRanges.forEach((range) => {
        set.add(range.style);
      });
    });
    if (Object.keys(entityMap).length > 0) {
      for (let entity in entityMap) {
        set.add(entityMap[entity].type);
      }
    }
  }

  render() {
    const { attachment, editorState } = this.state;
    const { allowedFileContentTypes, placeholder } = this.props;
    const editorStateSelection = editorState.getSelection();
    const currentBlockStyle = editorState
      .getCurrentContent()
      .getBlockForKey(editorStateSelection.getStartKey())
      .getType();
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <URLInputContainer>
          <URLInputLabel>Link</URLInputLabel>
          <URLInput
            onChange={this.onURLChange}
            ref="url"
            type="text"
            value={this.state.urlValue}
            onKeyPress={this.onURLKeyInput}
            onKeyDown={this.onURLKeyInput}
          />
          <URLConfirmIcon
            onClick={this.confirmLink}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.keyCode === KEY_CODE.SPACE || e.keyCode === KEY_CODE.ENTER) {
                e.preventDefault();
                e.target.click();
              }
            }}
          >
            {CONFIRM_LINK_ICON}
          </URLConfirmIcon>
          <URLRemoveIcon
            onClick={this.removeLink}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.keyCode === KEY_CODE.SPACE || e.keyCode === KEY_CODE.ENTER) {
                e.preventDefault();
                e.target.click();
              }
            }}
          >
            {REMOVE_LINK_ICON}
          </URLRemoveIcon>
        </URLInputContainer>
      );
    }

    return (
      <div>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={this.resetState}>
          <div
            id="emoji-picker"
            data-testid={'emoji-picker'}
            style={{ visibility: this.state.showEmojiPicker ? 'visible' : 'hidden' }}
          >
            <EmojiPicker
              closeEmojiPicker={() => this.setState({ showEmojiPicker: false })}
              style={{ top: getEmojiPickerTopPosition() }}
              onEmojiSelect={this.addTextToMessage}
            />
          </div>
          <RichToolbarContainer onClick={this.focus} data-testid="rich-tool-bar-container">
            <RichToolbarFormattingContainer>
              {inlineFormatDisplayOrder.map((richFormat, idx) => (
                <RichToolbarButton
                  id={`richToolbarButton_${idx}`}
                  key={idx}
                  index={idx}
                  isActiveButton={currentInlineStyle.has(richFormat)}
                  onFormatToggled={this._onFormatToggled.bind(
                    this,
                    richFormat,
                    RichUtils.toggleInlineStyle
                  )}
                  buttonSvg={
                    currentInlineStyle.has(richFormat)
                      ? RICH_FORMAT_ICONS_SELECTED[richFormat]
                      : RICH_FORMAT_ICONS[richFormat]
                  }
                />
              ))}
              {blockTypeDisplayOrder.map((blockType, idx) => (
                <RichToolbarButton
                  id={`richToolbarButton_${inlineFormatDisplayOrder.length + idx}`}
                  key={idx}
                  index={inlineFormatDisplayOrder.length + idx}
                  isActiveButton={blockType === currentBlockStyle}
                  onFormatToggled={this._onFormatToggled.bind(
                    this,
                    blockType,
                    RichUtils.toggleBlockType
                  )}
                  buttonSvg={
                    blockType === currentBlockStyle
                      ? RICH_FORMAT_ICONS_SELECTED[blockType]
                      : RICH_FORMAT_ICONS[blockType]
                  }
                />
              ))}
              {linkFormatDisplayOrder.map((linkFormat, idx) => (
                <RichToolbarButton
                  id={`richToolbarButton_${
                    inlineFormatDisplayOrder.length + blockTypeDisplayOrder.length + idx
                  }`}
                  key={idx}
                  index={inlineFormatDisplayOrder.length + blockTypeDisplayOrder.length + idx}
                  isActiveButton={this.state.showURLInput}
                  onButtonClicked={this.promptForLink}
                  buttonSvg={
                    this.state.showURLInput
                      ? RICH_FORMAT_ICONS_SELECTED[linkFormat]
                      : RICH_FORMAT_ICONS[linkFormat]
                  }
                />
              ))}
              {!isMobile() &&
                emojisFormatDisplayOrder.map((richFormat, idx) => (
                  <RichToolbarButton
                    id={`richToolbarButton_${
                      inlineFormatDisplayOrder.length +
                      blockTypeDisplayOrder.length +
                      linkFormatDisplayOrder.length +
                      idx
                    }`}
                    key={idx}
                    index={
                      inlineFormatDisplayOrder.length +
                      blockTypeDisplayOrder.length +
                      linkFormatDisplayOrder.length +
                      idx
                    }
                    isActiveButton={this.state.showEmojiPicker === true}
                    onButtonClicked={() => {
                      this.setState({ showEmojiPicker: !this.state.showEmojiPicker });
                      getEmojiPickerTopPosition();
                    }}
                    buttonSvg={
                      this.state.showEmojiPicker
                        ? RICH_FORMAT_ICONS_SELECTED[richFormat]
                        : RICH_FORMAT_ICONS[richFormat]
                    }
                  />
                ))}
            </RichToolbarFormattingContainer>
            <RichToolbarAttachmentsContainer>
              {this.props.attachmentsEnabled && (
                <AttachmentsIcon
                  id={`richToolbarButton_${
                    inlineFormatDisplayOrder.length +
                    blockTypeDisplayOrder.length +
                    linkFormatDisplayOrder.length +
                    emojisFormatDisplayOrder.length
                  }`}
                  tabIndex={-1}
                  onKeyDown={(e) => {
                    if (e.keyCode === KEY_CODE.SPACE || e.keyCode === KEY_CODE.ENTER) {
                      e.preventDefault();
                      document.getElementById('chat-file-select-attachments').click();
                    } else if (e.keyCode === KEY_CODE.LEFT) {
                      e.preventDefault();
                      const currentIndex =
                        inlineFormatDisplayOrder.length +
                        blockTypeDisplayOrder.length +
                        linkFormatDisplayOrder.length +
                        emojisFormatDisplayOrder.length;
                      focusLastOrNextElement(currentIndex, -1);
                    }
                  }}
                >
                  <label htmlFor={`chat-file-select-attachments`}>
                    {ATTACHMENTS_ICON}
                    <input
                      type="file"
                      id={`chat-file-select-attachments`}
                      data-testid={`chat-file-select-attachments`}
                      accept={allowedFileContentTypes.join(',')}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        this.setState((prevState) => ({
                          ...prevState,
                          attachment: file
                        }));
                      }}
                      tabIndex={-1}
                    />
                  </label>
                </AttachmentsIcon>
              )}
            </RichToolbarAttachmentsContainer>
          </RichToolbarContainer>
          {attachment != null && (
            <AttachmentOuterContainer>
              <AttachmentContainer>
                <AttachmentInnerContainer>
                  <span>{attachment.name}</span>
                  <IconButton
                    onClick={() => {
                      this.setState((prevState) => ({
                        ...prevState,
                        attachment: null
                      }));
                    }}
                    aria-label={'Remove attachment'}
                  >
                    <CloseIcon>
                      <svg
                        viewBox="0 0 13 13"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                      >
                        <path
                          d="M13 1.3L11.7 0 6.5 5.2 1.3 0 0 1.3l5.2 5.2L0 11.7 1.3 13l5.2-5.2 5.2 5.2 1.3-1.3-5.2-5.2z"
                          fillRule="evenodd"
                        />
                      </svg>
                    </CloseIcon>
                  </IconButton>
                </AttachmentInnerContainer>
              </AttachmentContainer>
            </AttachmentOuterContainer>
          )}
          {urlInput}
          <EditorContainer>
            <Editor
              placeholder={currentBlockStyle === 'unstyled' ? placeholder : undefined}
              editorState={editorState}
              onChange={this.onChange}
              handleReturn={this._handleReturn}
              ref={this.setDomEditorRef}
              handleBeforeInput={this.handleBeforeInput}
              // webDriverTestID is the data-testid for <Editor /> component
              webDriverTestID="rich-text-editor"
            />
            <SendMessageButtonContainer>
              <SendMessageButton
                isActive={!!editorState.getCurrentContent().getPlainText() || attachment}
                sendMessage={(e) => {
                  this._handleReturn(e, true);
                }}
              />
            </SendMessageButtonContainer>
          </EditorContainer>
        </ErrorBoundary>
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  /**
   * Whether or not to show attachments functionality.
   */
  attachmentsEnabled: PT.bool.isRequired,

  /**
   * Allowed file types for the attachment, e.g. ['.pdf', '.jpg']
   */
  allowedFileContentTypes: PT.array.isRequired,

  /**
   * Function to run on submit/enter, to send the message contents _as Markdown_
   */
  sendMessage: PT.func.isRequired,

  /**
   * Function to run on submit/enter, to send the attachment contents.
   */
  sendAttachment: PT.func.isRequired,

  /**
   * Function invoked when any of the text content in the editor is changed.
   */
  onContentChange: PT.func.isRequired,

  /**
   * Placeholder text for the rich text editor.
   */
  placeholder: PT.string.isRequired
};

export default RichTextEditor;
