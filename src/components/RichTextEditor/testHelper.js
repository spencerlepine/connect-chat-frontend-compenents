import { createEvent, fireEvent } from '@testing-library/react';

export function triggerCustomEvent({ element, eventName, detail = {}, path = [{}] }) {
  const event = createEvent(eventName, element, detail, { EventType: 'CustomEvent' });
  event['path'] = path;
  fireEvent(element, event);
}