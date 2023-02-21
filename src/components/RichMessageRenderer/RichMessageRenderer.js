// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeAttrs from 'rehype-attr';

export const updateURLValue = (urlValue) => {
  let updatedUrlValue = urlValue;
  if (!/^https?:\/\//i.test(urlValue)) {
    updatedUrlValue = 'http://' + urlValue;
  }
  return updatedUrlValue;
};

/**
 * RichMessage renderer detecting and formatting markdown syntax
 * Supports styledWrapper prop to render within styled-component
 */
const RichMessageRenderer = ({ styledWrapper, content }) => {
  const StyledWrapper = styledWrapper || React.Fragment;

  const ParaRenderer = ({ node, ...props }) => {
    // Outputs the final formatted element
    const REHYPE_ATTRIBUTE_RE = /<!--.+-->/;
    const parsedChildren = props.children
      ? props.children.filter((child) =>
          typeof child === 'string' ? !REHYPE_ATTRIBUTE_RE.test(child) : true
        )
      : [];

    if (styledWrapper) {
      return <StyledWrapper style={{ margin: '0' }}>{parsedChildren}</StyledWrapper>;
    }

    return (
      <p style={{ margin: '0' }} {...props}>
        {parsedChildren}
      </p>
    );
  };
  const LinkRenderer = (props) => {
    return (
      <a
        style={{ margin: '0', textDecoration: 'none' }}
        href={updateURLValue(props.href)}
        {...(props.target === '_self' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {props.children}
      </a>
    );
  };
  const OrderedListRenderer = ({ node, ...props }) => (
    <ol style={{ margin: '0', padding: '0 30px', listStyleType: 'decimal' }} {...props} />
  );
  const UnorderedListRenderer = ({ node, ...props }) => (
    <ul style={{ margin: '0', padding: '0 30px', listStyleType: 'disc' }} {...props} />
  );

  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeAttrs, { properties: 'attr' }]]}
      disallowedElements={['img']}
      components={{
        p: ParaRenderer,
        a: LinkRenderer,
        ol: OrderedListRenderer,
        ul: UnorderedListRenderer
      }}
    />
  );
};

export default RichMessageRenderer;
