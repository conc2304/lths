import { ChangeEvent } from 'react';
import { Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { useContainerScroll } from '@lths-mui/shared/ui-hooks';

import { PageDetail } from '@lths/features/mms/data-access';
import { EditorProps } from '@lths/features/mms/ui-editor';

import { PAGE_CONTAINER_SCROLL, PAGE_SETTINGS_CONTAINER } from '../constants';
import { BaseContainer, HeaderContainer } from '../container';
import { PageStatus } from '../types';

import '../index.scss';

const labelStyles = {
  color: 'black',
  fontWeight: 500,
  fontSize: '0.825rem',
};

type Props = {
  data: PageDetail;
  onUpdateSettings: (data: Partial<EditorProps>) => void;
};

export const PageSettings = (props: Props) => {
  const { data, onUpdateSettings } = props;
  const { page_id, name, description, status, default_page_name } = data;

  useContainerScroll([`.${PAGE_SETTINGS_CONTAINER}`], [PAGE_CONTAINER_SCROLL]);

  const isPublished = status === PageStatus.PUBLISHED;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdateSettings({ name: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdateSettings({ description: e.target.value });
  };

  return (
    <BaseContainer className="page-settings-container">
      <Grid container direction="row" alignItems="stretch" marginY={3} sx={{ minHeight: '250px', gap: 15 }}>
        <Grid item xs={3}>
          <HeaderContainer
            title="Page details"
            description="Explain how this setting works and what the user can specify."
            infoText="Explain how this setting works and what the user can specify."
          />
          <Stack marginTop={4}>
            <InputLabel sx={labelStyles}>PAGE NAME</InputLabel>
            {isPublished ? (
              <Typography sx={{ marginTop: 2, height: '1.75rem' }}>{name}</Typography>
            ) : (
              <OutlinedInput
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                sx={{ background: 'white', marginTop: 2 }}
              />
            )}
          </Stack>
          <Stack marginTop={5}>
            <InputLabel sx={labelStyles}>DESCRIPTION (optional)</InputLabel>
            <OutlinedInput
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              multiline={true}
              rows={4}
              sx={{ background: 'white', marginTop: 2 }}
            />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <HeaderContainer
            title="System"
            description="Explain how this setting works and what the user can specify."
            infoText="Explain how this setting works and what the user can specify."
          />
          <Stack marginTop={4}>
            <InputLabel sx={labelStyles}>DEFAULT PAGE</InputLabel>
            <Typography sx={{ marginTop: 2, height: '1.75rem' }}>{default_page_name || 'N/A'}</Typography>
          </Stack>
          <Stack marginTop={isPublished ? 5 : 8}>
            <InputLabel sx={labelStyles}>PAGE ID</InputLabel>
            <Typography sx={{ marginTop: 2 }}>/{page_id}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </BaseContainer>
  );
};
