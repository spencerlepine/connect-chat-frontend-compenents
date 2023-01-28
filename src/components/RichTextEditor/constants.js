export const RICH_FORMATS = {
  BOLD: 'BOLD',
  ITALICS: 'ITALIC',
  HYPERLINK: 'HYPERLINK',
  NUMBERED_LIST: 'ordered-list-item',
  BULLETED_LIST: 'unordered-list-item',
  EMOJIS: 'EMOJIS'
};

export const inlineFormatDisplayOrder = [RICH_FORMATS.BOLD, RICH_FORMATS.ITALICS];

export const blockTypeDisplayOrder = [
  RICH_FORMATS.NUMBERED_LIST,
  RICH_FORMATS.BULLETED_LIST,
];

export const linkFormatDisplayOrder = [RICH_FORMATS.HYPERLINK];

export const emojisFormatDisplayOrder = [RICH_FORMATS.EMOJIS];

export const KEY_CODE = {
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  ENTER: 13,
  ESCAPE : 27,
  TAB : 9,
};


export const NUM_OF_BUTTONS = 7;

export const RICH_MESSAGE_EVENT = {
  BOLD: 'USE_BOLD_STYLE',
  ITALIC: 'USE_ITALIC_STYLE',
  LINK: 'USE_HYPERLINK',
  'ordered-list-item': 'USE_NUMBERED_LIST',
  'unordered-list-item': 'USE_BULLETED_LIST',
  SEND_MESSAGE_BY_ENTER_KEY: 'SEND_MESSAGE_BY_ENTER_KEY',
  SEND_MESSAGE_BY_SEND_BUTTON: 'SEND_MESSAGE_BY_SEND_BUTTON'
}

export const RICH_MESSAGE_ERROR = 'RICH_MESSAGE_ERROR';