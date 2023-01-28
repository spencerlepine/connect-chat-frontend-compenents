// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import ReactMarkdown from 'react-markdown';

const updateURLValue = (urlValue) => {
  let updatedUrlValue = urlValue;
  if (!/^https?:\/\//i.test(urlValue)) {
    updatedUrlValue = 'http://' + urlValue;
  }
  return updatedUrlValue;
};

const RichMessageRenderer = (props) => (
  <ReactMarkdown
    children={props.content}
    disallowedElements={["img"]}
    components={{
      p: ({ node, ...props }) => <p style={{ margin: '0' }} {...props} />,
      ol: ({ node, ...props }) => <ol style={{ margin: '0', padding: '0 30px', listStyleType: 'decimal' }} {...props} />,
      ul: ({ node, ...props }) => <ul style={{ margin: '0', padding: '0 30px', listStyleType: 'disc' }} {...props} />,
      a: ({ node, ...props }) => (
        <a style={{ margin: '0', textDecoration: 'none' }}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
            href={updateURLValue(props.href)}
          >
            {props.children}
          </a>
      )
    }}
  />
)

export default RichMessageRenderer;