// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import styled from 'styled-components';
import { KEY_CODE } from '../constants';

const ACTIVE_COLOR = '#222222';
const INACTIVE_COLOR = '#EDEDED';

const SendButton = styled.div`
  cursor: ${(props) => (props.isActive ? 'pointer' : 'default')};

  & > svg {
    fill: ${(props) => (props.isActive ? ACTIVE_COLOR : INACTIVE_COLOR)};
  }
`;

/**
 * Send message button for the RichTextEditor.
 *
 * @param {Object} props
 * @param {boolean} props.isActive
 * @param {Function} props.sendMessage
 */
function SendMessageButton({ isActive, sendMessage }) {
  return (
    <SendButton
      isActive={isActive}
      onClick={sendMessage}
      data-testid={'chat-send-message-button'}
      aria-label={'Send Message'}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.keyCode === KEY_CODE.SPACE || e.keyCode === KEY_CODE.ENTER) {
          e.preventDefault();
          sendMessage(e);
        }
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    </SendButton>
  );
}

export default SendMessageButton;
