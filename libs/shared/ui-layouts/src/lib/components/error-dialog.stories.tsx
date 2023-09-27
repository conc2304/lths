import { faker } from '@faker-js/faker';
import { StoryFn, Meta } from '@storybook/react';
import { HashRouter } from 'react-router-dom';

import { ErrorDialog } from './error-dialog';

const Story: Meta<typeof ErrorDialog> = {
  component: ErrorDialog,
  title: 'Feedback/Error Boundary Dialog',
  decorators: [
    (Story: StoryFn) => (
      <HashRouter>
        <Story />
      </HashRouter>
    ),
  ],
};

export default Story;

const Template: StoryFn<typeof ErrorDialog> = (args) => {
  return <ErrorDialog {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  message: undefined,
};

export const CustomMsg = Template.bind({});
CustomMsg.args = {
  message: (
    <>
      <h3>Custom Error HTML</h3>
      <p>{faker.lorem.words(15)}</p>
      <img
        src={faker.image.urlLoremFlickr({ width: 150, height: 150, category: 'oops' })}
        width={150}
        height={150}
        style={{ display: 'block', margin: '0 auto' }}
        alt={'Storybook Comp'}
      />
    </>
  ),
};
