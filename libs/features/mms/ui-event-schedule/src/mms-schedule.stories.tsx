import { EventScheduler, FlagsProviderMock } from '.';
import { eventStateMockEvents, eventTypesMock, eventsMock } from './mock-events';

import type { Meta } from '@storybook/react';

const Story: Meta<typeof EventScheduler> = {
  component: EventScheduler,
  title: 'Features/Calendar/MMS Event Scheduler',
  decorators: [
    (Story) => (
      <FlagsProviderMock>
        <Story />
      </FlagsProviderMock>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    eventTypes: eventTypesMock,
    events: eventsMock,
    backgroundEvents: eventStateMockEvents,
  },
};
