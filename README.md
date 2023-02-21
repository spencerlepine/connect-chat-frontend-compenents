# Amazon Connect Chat Frontend Components [![Node.js CI](https://github.com/spencerlepine/connect-chat-frontend-compenents/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/spencerlepine/connect-chat-frontend-compenents/actions/workflows/node.js.yml) [![npm version](https://badge.fury.io/js/@spencerlepine%2Fconnect-chat-frontend-components.svg)](https://badge.fury.io/js/@spencerlepine%2Fconnect-chat-frontend-components)

This package houses the shared frontend components, used across the Amazon Connect messaging products.

Exports CommonJS bundle file, with React 16 components.

## Usage

```
npm install @spencer/amazon-connect-chat-frontend-components@^1.0.0
```

#### `<RichTextEditor />`

```js
import { RichTextEditor } from '@spencer/amazon-connect-chat-frontend-components';

export default function ChatComposer(props) {
  function sendMarkdownMessage(markdownMessage) {
    if (markdownMessage.trim()) {
      addMessage(contactId, {
        text: markdownMessage,
        type: ContentType.MESSAGE_CONTENT_TYPE.TEXT_MARKDOWN
      });
    }
  }

  return (
    <ChatComposerWrapper>
      <RichTextEditor
        allowedFileContentTypes={ATTACHMENT_ACCEPT_CONTENT_TYPES}
        attachmentsEnabled={composerConfig && composerConfig.attachmentsEnabled}
        sendMessage={sendMarkdownMessage}
        sendAttachment={sendAttachmentGivenFile}
        placeholder={placeholder}
        onTyping={throttledOnTyping}
      ></RichTextEditor>
    </ChatComposerWrapper>
  );
}
```

#### `<RichMessageRenderer />`

```js
import { RichMessageRenderer } from '@spencer/amazon-connect-chat-frontend-components';

export class ParticipantMessage extends PureComponent {
  renderContent(textContent, contentType) {
    // ...
    if (contentType === ContentType.MESSAGE_CONTENT_TYPE.TEXT_MARKDOWN) {
      return <RichMessageRenderer content={textContent} />;
    }
    return <PlainTextMessage content={textContent} />;
  }

  render() {
    return (
      <div data-testid="main-message">
        {this.renderContent('**bold message**', 'text/markdown')}
      </div>
    );
  }
}
```
