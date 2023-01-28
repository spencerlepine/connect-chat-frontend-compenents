// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { KEY_CODE } from "../constants";
import { focusLastOrNextElement } from "../editorUtils";

const RichToolbarButtonContainer = styled.div`
  border: none;
  background: ${props => props.active ? '#676767' : 'none'};
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 1px;
  margin-bottom: 1px;

  display: flex;
  justify-content: center;
  flex-direction: column;

  cursor: pointer;

  &:hover {
    background: ${props => props.active ? '#676767' : '#C4C4C4'};
  }
`;

const RichToolbarButton = ({ id, index, buttonSvg, onFormatToggled, onButtonClicked, isActiveButton }) => {
    const [isActive, setIsActive] = useState(false);

    const firstToggle = useRef(true);

    useEffect(() => {
        console.log('RichToolbarButton useEffect')
        if (firstToggle.current) {
            firstToggle.current = false;
            return;
        }

        if (onFormatToggled) {
            onFormatToggled(isActive);
        }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    function clickButton() {
        setIsActive(!isActive);
        if (onButtonClicked) {
            onButtonClicked();
        }
    }

    // TODO: Fix bug with un-focusing toolbar initially requires two clicks to register button selection
    //  https://app.asana.com/0/1201057534450490/1201449806518231/f
    return (
        <RichToolbarButtonContainer
            id={id}
            active={isActiveButton}
            tabIndex={index === 0 ? 0 : -1}
            data-testid={`chat-rich-toolbar-button_${index}`}
            onMouseDown={(e) => {
                e.preventDefault();
                clickButton();
            }}
            onKeyDown={(e) => {
                if (e.keyCode === KEY_CODE.SPACE || e.keyCode === KEY_CODE.ENTER) {
                    e.preventDefault();
                    clickButton();
                } else if (e.keyCode === KEY_CODE.LEFT) {
                    e.preventDefault();
                    focusLastOrNextElement(index, -1);
                } else if (e.keyCode === KEY_CODE.RIGHT) {
                    e.preventDefault();
                    focusLastOrNextElement(index, 1);
                }
            }}
        >
            {buttonSvg}
        </RichToolbarButtonContainer>
    )
};

export default RichToolbarButton;