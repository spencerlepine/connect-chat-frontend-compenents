import React from 'react';
import { render, fireEvent } from "@testing-library/react"
import { KEY_CODE } from "../constants";
import SendMessageButton from './SendMessageButton';

describe("<SendMessageButton />", () => {
  let mockSendMessageButton;
  let mockProps;

  const renderComponent = (props) => {
    mockSendMessageButton = render(<SendMessageButton {...props} />);
  }

  beforeEach(() => {
    const sendMessage = jest.fn().mockResolvedValue(undefined);
    mockProps = { sendMessage };
  });

  test("Style should match the snapshot", () => {
    renderComponent(mockProps);
    expect(mockSendMessageButton).toMatchSnapshot();
  });

  test("Should fire sendMessage onClick", () => {
    renderComponent(mockProps);

    const sendMessageButton = mockSendMessageButton.getByTestId('chat-send-message-button');
    fireEvent.click(sendMessageButton);

    expect(mockProps.sendMessage).toHaveBeenCalledTimes(1);
  });

  test("Should fire sendMessage onClick on Enter pressed", () => {
    renderComponent(mockProps);

    const sendMessageButton = mockSendMessageButton.getByTestId('chat-send-message-button');
    fireEvent.focus(sendMessageButton);
    fireEvent.keyDown(sendMessageButton, {
      key: "Enter",
      code: "Enter",
      keyCode: KEY_CODE.ENTER,
      charCode: KEY_CODE.ENTER,
    });

    expect(mockProps.sendMessage).toHaveBeenCalledTimes(1);
  });

  test("Should fire sendMessage onClick on Space pressed", () => {
    renderComponent(mockProps);

    const sendMessageButton = mockSendMessageButton.getByTestId('chat-send-message-button');
    fireEvent.focus(sendMessageButton);
    fireEvent.keyDown(sendMessageButton, {
      key: " ",
      code: "Space",
      keyCode: KEY_CODE.SPACE,
      charCode: KEY_CODE.SPACE,
    });

    expect(mockProps.sendMessage).toHaveBeenCalledTimes(1);
  });
});
