// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Editor } from 'draft-js';
import styled from 'styled-components';
import DraftCSS from 'draft-js/dist/Draft.css';

export const RichToolbarContainer = styled.div`
  height: 30px;
  width: 100%;
  background: #ffffff;

  border-top: 1px solid rgba(196, 196, 196, 0.5);
  border-bottom: 1px solid rgba(196, 196, 196, 0.5);
`;

export const StyledEditor = styled(Editor)`
  ${DraftCSS}
`;

export const EditorContainer = styled.div`
  position: relative;
  max-height: 70px;
  line-height: 1.5rem;
  overflow: auto;
  word-break: break-word;
  padding: 10px;
  padding-left: 0;
  padding-right: 10px 44px 10px 0px;
  resize: none;
  margin-left: 10px;
  min-height: 44px;
  z-index: 2;
  font-family: inherit;
  border-left: 0;
  border-right: 0;
  padding-right: 45px;
`;

export const SendMessageButtonContainer = styled.div`
  position: absolute;
  padding: 10px 10px 0px 10px;
  top: 0;
  right: 0;
  z-index: 2;
`;

export const RichToolbarFormattingContainer = styled.div`
  float: left;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const RichToolbarAttachmentsContainer = styled.div`
  float: right;
  height: 100%;
`;

export const AttachmentsIcon = styled.div`
  border: none;
  background: none;

  margin-left: 2px;
  margin-right: 2px;
  margin-top: 1px;
  margin-bottom: 1px;

  cursor: pointer;

  &:hover {
    background: #c4c4c4;
  }

  label {
    cursor: pointer;
  }

  input {
    display: none;
  }
`;

export const IconButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  position: relative;
  padding: 0;
  margin: 0;
  height: 100%;
  display: block !important;
  height: 10px;
  width: 10px;
`;

export const CloseIcon = styled.div`
  display: flex;
  font-size: 0;
  svg {
    width: '0.75rem';
    height: '0.75rem';
  }
`;

export const AttachmentOuterContainer = styled.div`
  height: 46px;

  border-bottom: 1px solid rgba(196, 196, 196, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AttachmentInnerContainer = styled.div`
  display: flex;
`;

export const AttachmentContainer = styled.div`
  display: flex;
  background-color: #aadfb4;
  border-radius: 5px;
  margin: 5px;
  padding: 6px;
  min-width: 0;

  width: fit-content;

  & > div {
    span {
      overflow-wrap: break-word;
    }

    button {
      align-items: center;
      display: inline-flex;
      cursor: pointer;
      margin-left: 5px;
    }
  }

  & + div {
    padding-left: 0;
  }
`;

export const URLInputContainer = styled.div`
  position: relative;
  background: #ffffff;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Amazon Ember;
  font-size: 14px;
  line-height: 16px;
  margin-left: 5%;
  width: 90%;
  height: 70px;
`;

export const URLInput = styled.input`
  width: 90%;
  height: 25px;
  margin-left: 5%;
  margin-top: 3px;
  padding: 0px;
  border: 0px;
  outline: none;
  color: #000000;
`;

export const URLInputLabel = styled.div`
  height: 17px;
  margin-left: 5%;
  margin-top: 12px;
  color: #000000;
`;

export const URLLink = styled.a`
  color: #3b5998;
  text-decoration: none;
`;

export const URLConfirmIcon = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  left: calc(90% - 20px);
  top: 7px;
  opacity: 0.68;
  cursor: pointer;
`;

export const URLRemoveIcon = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  left: 90%;
  top: 7px;
  opacity: 0.68;
  cursor: pointer;
`;

export const EmojiPickerWrapper = styled.div`
  .emoji-mart-anchors,
  .emoji-mart-search,
  .emoji-mart-category-label,
  .emoji-mart-preview-shortnames,
  .emoji-mart-preview-emoticons {
    display: none;
  }
  & .emoji-mart-preview {
    height: 30px;
  }
  & .emoji-mart-scroll {
    height: 70px;
    padding: 0px !important;
  }
  & .emoji-mart-title-label {
    font-size: 26px;
  }
  & .emoji-mart-preview-emoji span {
    font-size: 27px !important;
  }
  & .emoji-mart {
    position: absolute;
    button[title|='man-kiss-man'],
    button[title|='woman-kiss-man'],
    button[title|='woman-kiss-woman'],
    button[title|='man-heart-man'],
    button[title|='woman-heart-man'],
    button[title|='woman-heart-woman'] {
      display: none;
    }
    @media (max-width: 640px) {
      width: auto !important;
    }
  }
`;
