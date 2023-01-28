import { blockTypeDisplayOrder, inlineFormatDisplayOrder, linkFormatDisplayOrder } from "../RichTextEditor/constants";

export const DEFAULT_TITLE = "Pick an emoji...";
export const DEFAULT_EMOJI = 'point_up';
export const DEFAULT_SHOULD_DISPLAY_EMOJI_TOOLTIP = true;
export const DEFAULT_INCLUDE = ['people'];
export const DEFAULT_SHOULD_USE_NATIVE_EMOJIS = true;
export const DEFAULT_THEME = "light";
export const DEFAULT_SHOULD_SHOW_SKIN_TONES = false;
export const EMOJI_PICKER_CLASS = "emoji-mart";
export const RICH_TOOLBAR_EMOJI_BUTTON_ID = `richToolbarButton_${inlineFormatDisplayOrder.length+blockTypeDisplayOrder.length+linkFormatDisplayOrder.length}`;