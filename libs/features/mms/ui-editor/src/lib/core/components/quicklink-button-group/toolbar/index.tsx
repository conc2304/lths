import { ChangeEvent, useEffect } from 'react';

import { OutlinedTextField, ActionInput, GroupLabel, ToolbarLabel } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useEditorActions } from '../../../../context';
import { useToolbarChange } from '../../hooks';
import { QuicklinkButtonGroupComponentProps } from '../../types';
import { MenuItem } from '@mui/material';

const QuicklinkButtonGroupToolbar = (props: QuicklinkButtonGroupComponentProps) => {
  const {
    __ui_id__: id,
    data: { first_button, second_button },
  } = props;

  const { updateComponentProp } = useToolbarChange();
  const { selectedComponent } = useEditorActions();

  const handleFirstButtonChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    updateComponentProp('first_button', { ...first_button, [key]: event.target.value });
  };

  const handleSecondButtonChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    updateComponentProp('second_button', { ...second_button, [key]: event.target.value });
  };

  const handleButtonActionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    buttonName: string
  ) => {
    updateComponentProp(buttonName, {
      ...selectedComponent.data[buttonName],
      action: { ...selectedComponent.data[buttonName].action, [key]: event.target.value },
    });
  };

  const icons = [
    { label: 'Medical', value: 'https://i.im.ge/2022/12/05/S82BeW.Group.png' },
    { label: 'Shooter', value: 'https://i.im.ge/2022/12/05/S824gr.Group.png' },
    { label: 'Fire', value: 'https://i.im.ge/2022/12/05/S82n0m.Group.png' },
    { label: 'Fight', value: 'https://i.im.ge/2022/12/05/S82Jlf.Group.png' },
    { label: 'Bomb', value: 'https://i.im.ge/2022/12/05/S82pV1.Group.png' },
    { label: 'Other', value: 'https://i.im.ge/2022/12/05/S82z2p.Group.png' },
  ];

  return (
    <ToolContainer id={id} aria-label={'Quicklink Button Group Toolbar'}>
      <ToolbarLabel label={'Quick Link'} />

      <GroupLabel label={'First'} />
      <OutlinedTextField
        aria-label="First Label"
        label={'Label'}
        value={first_button.label}
        onChange={(e) => {
          handleFirstButtonChange(e, 'label');
        }}
      />
      <OutlinedTextField
        aria-label="First Icon"
        label={'Icon'}
        value={first_button.icon}
        onChange={(e) => {
          handleFirstButtonChange(e, 'icon');
        }}
        select
      >
        {icons.map((icon) => (
          <MenuItem key={icon.value} value={icon.value}>
            {icon.label}
          </MenuItem>
        ))}
      </OutlinedTextField>
      <ActionInput
        action={first_button.action}
        index={0}
        handleActionChange={(event, key) => handleButtonActionChange(event, key, 'first_button')}
      />

      <GroupLabel label={'Second'} />
      <OutlinedTextField
        aria-label="Second Label"
        label={'Label'}
        value={second_button.label}
        onChange={(e) => {
          handleSecondButtonChange(e, 'label');
        }}
      />
      <OutlinedTextField
        aria-label="Second Icon"
        label={'Icon'}
        value={second_button.icon}
        onChange={(e) => {
          handleSecondButtonChange(e, 'icon');
        }}
        select
      >
        {icons.map((icon) => (
          <MenuItem key={icon.value} value={icon.value}>
            {icon.label}
          </MenuItem>
        ))}
      </OutlinedTextField>
      <ActionInput
        action={second_button.action}
        index={1}
        handleActionChange={(event, key) => handleButtonActionChange(event, key, 'second_button')}
      />
    </ToolContainer>
  );
};
export default QuicklinkButtonGroupToolbar;
