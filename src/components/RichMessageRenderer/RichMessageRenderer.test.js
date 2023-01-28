import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RichMessageRenderer from './RichMessageRenderer';

describe("<RichMessageRenderer />", () => {
  const renderComponent = (textContent) => {
    render(<RichMessageRenderer content={textContent}/>);
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

  test('Should be able to render italic', () => {
      renderComponent('*italic*');
      const messageContainer = document.querySelector('p');
      expect(messageContainer).toBeInTheDocument();
      expect(messageContainer.style.margin).toBe('0px');
      const italicMessage = document.querySelector('em');
      expect(italicMessage).toBeInTheDocument();
      expect(italicMessage).toHaveTextContent('italic');
  });

  test('Should be able to render hyperlink', () => {
      renderComponent('[hyperlink](test-link)');
      const messageContainer = document.querySelector('p');
      expect(messageContainer).toBeInTheDocument();
      expect(messageContainer.style.margin).toBe('0px');
      const italicMessage = document.querySelector('a');
      expect(italicMessage).toBeInTheDocument();
      expect(italicMessage).toHaveTextContent('hyperlink');
  });

  test("Should be able to render numbered list", () => {
      renderComponent("1. item1 \n 1. item2");
      const messageContainer = document.querySelector("ol");
      expect(messageContainer).toBeInTheDocument();
      expect(messageContainer.style.margin).toBe("0px");
      const numberedMessages = document.querySelectorAll("li");
      expect(numberedMessages).toHaveLength(2);
      expect(numberedMessages[0]).toHaveTextContent("item1");
      expect(numberedMessages[1]).toHaveTextContent("item2");
  });


  test("Should be able to render bulleted list", () => {
      renderComponent("* item1 \n * item2");
      const messageContainer = document.querySelector("ul");
      expect(messageContainer).toBeInTheDocument();
      expect(messageContainer.style.margin).toBe("0px");
      const bulletedMessages = document.querySelectorAll("li");
      expect(bulletedMessages).toHaveLength(2);
      expect(bulletedMessages[0]).toHaveTextContent("item1");
      expect(bulletedMessages[1]).toHaveTextContent("item2");
  });

  test('Should not be able to render image', () => {
      renderComponent('![image](test-link)');
      const messageContainer = document.querySelector('img');
      expect(messageContainer).not.toBeInTheDocument();
  });

  test("Should be able to render emojis", () => {
      renderComponent('😊');
      const messageContainer = document.querySelector('p');
      expect(messageContainer).toBeInTheDocument();
      expect(messageContainer.style.margin).toBe('0px');
      expect(messageContainer).toHaveTextContent('😊');
  });
});
