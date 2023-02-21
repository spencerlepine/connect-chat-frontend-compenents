// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { KEY_CODE } from '../constants';
import RichToolbarButton from './RichToolbarButton';

describe('<RichToolbarButton />', () => {
  let mockRichToolbarButton;
  let mockProps;

  const renderComponent = (props) => {
    mockRichToolbarButton = render(<RichToolbarButton {...props} />);
  };

  beforeEach(() => {
    mockProps = {
      id: 'id',
      index: '0',
      buttonSvg: 'button-svg',
      onFormatToggled: jest.fn().mockResolvedValue(undefined),
      onButtonClicked: jest.fn().mockResolvedValue(undefined),
      isActiveButton: true
    };
  });

  test('Style should match the snapshot', () => {
    renderComponent(mockProps);
    expect(mockRichToolbarButton).toMatchSnapshot();
  });

  test('Should fire button click on mouse down', () => {
    renderComponent(mockProps);

    const richToolbarButton = mockRichToolbarButton.getByTestId('chat-rich-toolbar-button_0');
    fireEvent.mouseDown(richToolbarButton);

    expect(mockProps.onFormatToggled).toHaveBeenCalledTimes(1);
    expect(mockProps.onButtonClicked).toHaveBeenCalledTimes(1);
  });

  test('Should fire sendMessage onClick on Enter pressed', () => {
    renderComponent(mockProps);

    const richToolbarButton = mockRichToolbarButton.getByTestId('chat-rich-toolbar-button_0');
    fireEvent.focus(richToolbarButton);
    fireEvent.keyDown(richToolbarButton, {
      key: 'Enter',
      code: 'Enter',
      keyCode: KEY_CODE.ENTER,
      charCode: KEY_CODE.ENTER
    });

    expect(mockProps.onFormatToggled).toHaveBeenCalledTimes(1);
    expect(mockProps.onButtonClicked).toHaveBeenCalledTimes(1);
  });

  test('Should fire sendMessage onClick on Space pressed', () => {
    renderComponent(mockProps);

    const richToolbarButton = mockRichToolbarButton.getByTestId('chat-rich-toolbar-button_0');
    fireEvent.focus(richToolbarButton);
    fireEvent.keyDown(richToolbarButton, {
      key: ' ',
      code: 'Space',
      keyCode: KEY_CODE.SPACE,
      charCode: KEY_CODE.SPACE
    });

    expect(mockProps.onFormatToggled).toHaveBeenCalledTimes(1);
    expect(mockProps.onButtonClicked).toHaveBeenCalledTimes(1);
  });
});
