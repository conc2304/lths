import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

import { PageDetail } from '@lths/features/mms/data-access';
import { useEditorActions } from '@lths/features/mms/ui-editor';

import EventConstraints from './events';
import LocationConstraints from './locations';
import UserConstraints from './users';
import { BaseContainer, InfoContainer } from '../core';

type Props = {
  onUpdate: (data: PageDetail) => void;
};

const Constraints = ({ onUpdate }: Props) => {
  const { data } = useEditorActions();
  const page_data = data as PageDetail;
  const {
    constraints: {
      _id,
      events: eventConstraints,
      locations: locationConstraints,
      user_segments: userSegmentConstraints,
    },
  } = page_data;

  const navigate = useNavigate();

  const updatedEventConstraints = useRef([]);

  const [updatedConstraints, setUpdatedConstraints] = useState({
    user_segments: [],
    locations: [],
  });

  const handleConstraintsSave = () => {
    const data = {
      constraints: {
        _id,
        events: updatedEventConstraints.current,
        locations: updatedConstraints.locations,
        user_segments: updatedConstraints.user_segments,
      },
    } as PageDetail;
    onUpdate(data);
  };

  const handleUpdateUserConstraints = (us: string[]) => {
    setUpdatedConstraints((prevState) => {
      return { ...prevState, user_segments: us };
    });
  };

  const handleUpdateLocationConstraints = (locs: string[]) => {
    setUpdatedConstraints((prevState) => {
      return { ...prevState, locations: locs };
    });
  };

  const handleUpdateEventConstraints = (constraints: Record<string, any>[]) => {
    updatedEventConstraints.current = constraints;
  };

  useEffect(() => {
    updatedEventConstraints.current = eventConstraints;
  }, [eventConstraints]);

  return (
    <BaseContainer>
      <InfoContainer>
        This information is only required when you want the page to only display for specific event states, locations,
        and/or users.
      </InfoContainer>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        marginY={6}
        sx={{ minHeight: '250px' }}
      >
        <Grid item xs>
          <EventConstraints data={eventConstraints} onUpdate={handleUpdateEventConstraints} />
        </Grid>
        <Grid item xs>
          <LocationConstraints data={locationConstraints} onUpdate={handleUpdateLocationConstraints} />
        </Grid>
        <Grid item xs>
          <UserConstraints data={userSegmentConstraints} onUpdate={handleUpdateUserConstraints} />
        </Grid>
      </Grid>
      <Divider sx={{ borderBottomWidth: 2 }} />
      <Stack direction="row" justifyContent={'flex-end'} padding={2}>
        <Button variant="outlined" sx={{ marginRight: 2 }} onClick={() => navigate('/pages')}>
          CANCEL
        </Button>
        <LoadingButton variant="contained" onClick={handleConstraintsSave} loading={false}>
          SAVE
        </LoadingButton>
      </Stack>
    </BaseContainer>
  );
};

export default Constraints;
