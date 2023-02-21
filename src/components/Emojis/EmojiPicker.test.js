// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { KEY_CODE } from '../RichTextEditor/constants.js';
import EmojiPicker from './EmojiPicker';

describe('<EmojiPicker />', () => {
  let mockEmojiPicker;
  let mockProps;

  const renderComponent = (props) => {
    mockEmojiPicker = render(<EmojiPicker {...props} />);
  };

  beforeEach(() => {
    mockProps = {
      onSelect: jest.fn().mockResolvedValue(undefined),
      closeEmojiPicker: jest.fn().mockResolvedValue(undefined)
    };
  });

  test('Should fire on emoji selected on mouse down', () => {
    renderComponent(mockProps);

    const grinningEmojiButton = mockEmojiPicker.getByTitle('grinning');
    fireEvent.click(grinningEmojiButton);

    expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
  });

  test('Should go to next button when tab is pressed', () => {
    renderComponent(mockProps);

    const grinningEmojiButton = mockEmojiPicker.getByTitle('grinning');
    const smileyEmojiButton = mockEmojiPicker.getByTitle('smiley');
    fireEvent.focus(grinningEmojiButton);

    expect(document.activeElement === grinningEmojiButton);

    fireEvent.keyDown(grinningEmojiButton, {
      key: 'Tab',
      code: 'Tab',
      keyCode: KEY_CODE.TAB,
      charCode: KEY_CODE.TAB
    });

    expect(document.activeElement === smileyEmojiButton);
  });

  test('Should not close emoji picker when clicking inside of it', () => {
    renderComponent(mockProps);

    const grinningEmojiButton = mockEmojiPicker.getByTitle('grinning');
    fireEvent.mouseDown(grinningEmojiButton);

    expect(mockProps.closeEmojiPicker).toHaveBeenCalledTimes(0);
  });

  test('Should close emoji picker when clicking outside of it', () => {
    renderComponent(mockProps);

    const documentBody = document.body;
    fireEvent.mouseDown(documentBody);

    expect(mockProps.closeEmojiPicker).toHaveBeenCalledTimes(1);
  });

  test('Should close emoji picker when escape key is clicked', () => {
    renderComponent(mockProps);

    const emojiPicker = mockEmojiPicker.getByLabelText('Pick an emoji...');
    fireEvent.keyDown(emojiPicker, {
      key: 'Escape',
      code: 'Escape',
      keyCode: KEY_CODE.ESCAPE,
      charCode: KEY_CODE.ESCAPE
    });

    expect(mockProps.closeEmojiPicker).toHaveBeenCalledTimes(1);
  });
});
