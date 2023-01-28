import {EMOJI_PICKER_CLASS, RICH_TOOLBAR_EMOJI_BUTTON_ID} from "./emojiConstants.js";

let EMOJI_PICKER_TOP_POSITION = "17.1875rem";

function convertPixelsToRem(pixels) {
    let fontSize = parseInt(getComputedStyle(document.documentElement).fontSize);

    if(fontSize === 0){
        return 0;
    }

    return pixels/fontSize;
}

export function getEmojiPickerTopPosition() {
    let emojiButton = document.querySelector('#' + RICH_TOOLBAR_EMOJI_BUTTON_ID);
    let emojiPicker = document.querySelector('.' + EMOJI_PICKER_CLASS);

    if(emojiPicker && emojiButton) {
        let emojiPickerHeight = emojiPicker.getBoundingClientRect().height;
        let topPositionInPixels = emojiButton.offsetTop - emojiPickerHeight;
        let topPositionInRem = convertPixelsToRem(topPositionInPixels);
        EMOJI_PICKER_TOP_POSITION = topPositionInRem + "rem";
        emojiPicker.style.top = EMOJI_PICKER_TOP_POSITION;
    }

    return EMOJI_PICKER_TOP_POSITION;
}

export function isMobile(){
    return /Android|webOS|Mobi|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}