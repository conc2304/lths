import { BaseRowBuilder } from '@lths/shared/ui-elements';

import { LTHSCalendar } from './calendar';
import { DEFAULT_LIST_VIEW_COL_HEADER } from '../../constants';
import { eventsMock } from '../mock-events';
import { BaseColumnValue } from '../views/list-view/column-to-event-prop';

import type { Meta } from '@storybook/react';

const Story: Meta<typeof LTHSCalendar> = {
  component: LTHSCalendar,
  title: 'Features/Calendar/Calendar Main',
};
export default Story;

export const Primary = {
  args: {
    events: eventsMock,
    headerToEventValueMap: BaseColumnValue,
    headerCells: DEFAULT_LIST_VIEW_COL_HEADER,
    rowBuilder: BaseRowBuilder,
  },
};
