// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useRef, useEffect } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { EmojiPickerWrapper } from '../RichTextEditor/styled.js';
import {
  DEFAULT_EMOJI,
  DEFAULT_INCLUDE,
  DEFAULT_SHOULD_DISPLAY_EMOJI_TOOLTIP,
  DEFAULT_SHOULD_SHOW_SKIN_TONES,
  DEFAULT_SHOULD_USE_NATIVE_EMOJIS,
  DEFAULT_THEME,
  DEFAULT_TITLE,
  RICH_TOOLBAR_EMOJI_BUTTON_ID
} from './emojiConstants.js';
import { KEY_CODE } from '../RichTextEditor/constants.js';

/**
 * Emoji Picker component for the RichTextEditor
 *
 * @param {Object} props
 */
function EmojiPicker(props) {
  const ref = useRef(null);

  useEffect(() => {
    console.log('EmojiPicker useEffect');
    const handleEscKey = (event) => {
      if (event.keyCode === KEY_CODE.ESCAPE) {
        props.closeEmojiPicker();
      }
    };
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest('#' + RICH_TOOLBAR_EMOJI_BUTTON_ID)
      ) {
        props.closeEmojiPicker();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props]);

  return (
    <EmojiPickerWrapper ref={ref}>
      <Picker
        onSelect={props.onSelect || ((emojiObject) => props.onEmojiSelect(emojiObject.native))}
        emoji={props.emoji || DEFAULT_EMOJI}
        emojiTooltip={props.emojiTooltip || DEFAULT_SHOULD_DISPLAY_EMOJI_TOOLTIP}
        include={props.include || DEFAULT_INCLUDE}
        native={props.native || DEFAULT_SHOULD_USE_NATIVE_EMOJIS}
        showSkinTones={props.showSkinTones || DEFAULT_SHOULD_SHOW_SKIN_TONES}
        title={props.title || DEFAULT_TITLE}
        theme={props.theme || DEFAULT_THEME}
      />
    </EmojiPickerWrapper>
  );
}
export default EmojiPicker;
