// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RichMessageRenderer, { updateURLValue } from './RichMessageRenderer';
import styled from 'styled-components';
import 'jest-styled-components';

describe('RichMessageRenderer', () => {
  const renderComponent = (textContent, styledComponent) => {
    render(<RichMessageRenderer content={textContent} styledWrapper={styledComponent} />);
  };

  test('Should be able to render bold', () => {
    renderComponent('**bold**');
    const messageContainer = document.querySelector('p');
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer.style.margin).toBe('0px');
    const boldMessage = document.querySelector('strong');
    expect(boldMessage).toBeInTheDocument();
    expect(boldMessage).toHaveTextContent('bold');
  });

  const MOCK_PLAIN_TEXT = 'Hello, World!';
  it.each([
    [`**${MOCK_PLAIN_TEXT}**`, `<strong>${MOCK_PLAIN_TEXT}</strong>`],
    [`__${MOCK_PLAIN_TEXT}__`, `<strong>${MOCK_PLAIN_TEXT}</strong>`],
    [`*${MOCK_PLAIN_TEXT}*`, `<em>${MOCK_PLAIN_TEXT}</em>`],
    [`_${MOCK_PLAIN_TEXT}_`, `<em>${MOCK_PLAIN_TEXT}</em>`]
  ])('should detect and render bold and italics text: [%s]', (richText, expectedHTML) => {
    renderComponent(richText);

    const formattedElem = screen.getByText(MOCK_PLAIN_TEXT, { exact: false });
    expect(formattedElem.parentElement.innerHTML).toEqual(expectedHTML);
    const messageContainer = document.querySelector('p');
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer.style.margin).toBe('0px');
  });

  test('Should be able to render hyperlink', () => {
    renderComponent('[hyperlink](test-link)');
    const messageContainer = document.querySelector('p');
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer.style.margin).toBe('0px');
    const hyperlinkMessage = document.querySelector('a');
    expect(hyperlinkMessage).toBeInTheDocument();
    expect(hyperlinkMessage).toHaveTextContent('hyperlink');
    expect(hyperlinkMessage.parentElement.innerHTML).toBe(
      '<a style="margin: 0px; text-decoration: none;" href="http://test-link" target="_blank" rel="noopener noreferrer">hyperlink</a>'
    );
  });

  test('Should be able to render hyperlink w/ custom rehype attribute', () => {
    renderComponent('[hyperlink](test-link)<!--rehype:target=_self-->');
    const messageContainer = document.querySelector('p');
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer.style.margin).toBe('0px');
    const hyperlinkMessage = document.querySelector('a');
    expect(hyperlinkMessage).toBeInTheDocument();
    expect(hyperlinkMessage).toHaveTextContent('hyperlink');
    expect(hyperlinkMessage.parentElement.innerHTML).toBe(
      '<a style="margin: 0px; text-decoration: none;" href="http://test-link">hyperlink</a>'
    );
  });

  test('Should be able to render plain text link', () => {
    renderComponent('https://amazon.com');
    const messageContainer = document.querySelector('p');
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer.style.margin).toBe('0px');
    const textLinkMessage = document.querySelector('a');
    expect(textLinkMessage).toBeInTheDocument();
    expect(textLinkMessage).toHaveTextContent('https://amazon.com');
  });

  test('Should be able to render numbered list', () => {
    renderComponent('1. item1 \n 1. item2');
    const messageContainer = document.querySelector('ol');
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer.style.margin).toBe('0px');
    const numberedMessages = document.querySelectorAll('li');
    expect(numberedMessages).toHaveLength(2);
    expect(numberedMessages[0]).toHaveTextContent('item1');
    expect(numberedMessages[1]).toHaveTextContent('item2');
  });

  test('Should be able to render bulleted list', () => {
    renderComponent('* item1 \n * item2');
    const messageContainer = document.querySelector('ul');
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer.style.margin).toBe('0px');
    const bulletedMessages = document.querySelectorAll('li');
    expect(bulletedMessages).toHaveLength(2);
    expect(bulletedMessages[0]).toHaveTextContent('item1');
    expect(bulletedMessages[1]).toHaveTextContent('item2');
  });

  test('Should not be able to render image', () => {
    renderComponent('![image](test-link)');
    const messageContainer = document.querySelector('img');
    expect(messageContainer).not.toBeInTheDocument();
  });

  test('Should be able to render emojis', () => {
    renderComponent('😊');
    const messageContainer = document.querySelector('p');
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer.style.margin).toBe('0px');
    expect(messageContainer).toHaveTextContent('😊');
  });

  test('Should support rendering nested in styled-component', () => {
    const StyledPara = styled.p`
      color: orange;
      border: 1px solid green;
    `;
    renderComponent('colorful paragraph', StyledPara);

    const messageContainer = screen.getByText('colorful paragraph');
    expect(messageContainer.style.margin).toBe('0px');
    expect(messageContainer).toHaveStyleRule('color', 'orange');
    expect(messageContainer).toHaveStyleRule('border', '1px solid green');
  });
});

describe('updateURLValue', () => {
  test('Should add missing http protocol to url text', () => {
    expect(updateURLValue('amazon.com')).toBe('http://amazon.com');
    expect(updateURLValue('aws.amazon.com')).toBe('http://aws.amazon.com');
  });
});
