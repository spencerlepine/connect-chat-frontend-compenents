// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { triggerCustomEvent } from './testHelper.js';
import * as styledComponents from './styled';
import RichTextEditor from './RichTextEditor';
import '@testing-library/jest-dom';

describe('<RichTextEditor />', () => {
  let mockProps;
  let mockEditor;

  const renderComponent = (props) => {
    mockEditor = render(<RichTextEditor {...props} />);
  };

  beforeEach(() => {
    mockProps = {
      allowedFileContentTypes: ['.doc'],
      attachmentsEnabled: false,
      sendMessage: jest.fn(),
      sendAttachment: jest.fn(),
      placeholder: 'placeholder',
      onTyping: jest.fn(),
      onContentChange: jest.fn()
    };
  });

  it('should render error boundary page when UI error is catched', () => {
    const originalFn = styledComponents.RichToolbarContainer;
    styledComponents.RichToolbarContainer = jest.fn().mockImplementationOnce(() => {
      const ThrowError = () => {
        throw new Error('Test');
      };
      return <ThrowError />;
    });
    renderComponent(mockProps);
    styledComponents.RichToolbarContainer = originalFn;
    const errorBoundary = screen.findByText('Something went wrong');
    expect(errorBoundary).not.toBeNull();
  });

  it('should render rich test editor component successfully', () => {
    renderComponent(mockProps);
    const toolbar = mockEditor.getByTestId('rich-tool-bar-container');
    expect(toolbar).not.toBeNull();
  });

  it('should able to send message by pressing enter key', () => {
    renderComponent(mockProps);
    const editor = screen.getByTestId('rich-text-editor');
    const boldButton = document.querySelector('#richToolbarButton_0');
    fireEvent.click(boldButton);

    triggerCustomEvent({
      element: editor,
      eventName: 'focus'
    });
    triggerCustomEvent({
      element: editor,
      eventName: 'onInput',
      detail: { detail: { data: 'aaa' } }
    });
    const sendButton = screen.getByTestId('chat-send-message-button');
    fireEvent.click(sendButton);
    expect(mockProps.sendMessage).toHaveBeenCalledTimes(1);
  });

  it('Should open emoji picker when clicking emoji button', () => {
    renderComponent(mockProps);

    const richToolbarEmojiButton = mockEditor.getByTestId('chat-rich-toolbar-button_5');
    const emojiPicker = mockEditor.getByTestId('emoji-picker');

    fireEvent.mouseDown(richToolbarEmojiButton);

    expect(emojiPicker).toBeVisible();
  });

  it('Should close emoji picker when clicking emoji button', () => {
    renderComponent(mockProps);

    const richToolbarEmojiButton = mockEditor.getByTestId('chat-rich-toolbar-button_5');
    const emojiPicker = mockEditor.getByTestId('emoji-picker');

    fireEvent.mouseDown(richToolbarEmojiButton);

    expect(emojiPicker).toBeVisible();

    fireEvent.mouseDown(richToolbarEmojiButton);

    expect(emojiPicker).not.toBeVisible();
  });

  it('Should add emoji to message when clicked', () => {
    renderComponent(mockProps);

    const smilingEmojiButton = mockEditor.getByTitle('grinning');
    let messagingField = mockEditor.queryByText('😀😀😀');

    expect(messagingField).toBeNull();

    fireEvent.click(smilingEmojiButton);
    fireEvent.click(smilingEmojiButton);
    fireEvent.click(smilingEmojiButton);

    messagingField = mockEditor.queryByText('😀😀😀');

    expect(messagingField).toBeTruthy();
  });
});
