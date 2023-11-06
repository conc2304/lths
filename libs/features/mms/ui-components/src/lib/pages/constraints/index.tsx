import { Grid } from '@mui/material';

import { EventConstraint, PageDetail } from '@lths/features/mms/data-access';
import { useEditorActions } from '@lths/features/mms/ui-editor';

import EventConstraints from './events';
import LocationConstraints from './locations';
import UserConstraints from './users';
import { useEventStates, useLocations, useUpcomingEvents, useUserSegments } from '../../hooks';
import { BaseContainer, InfoContainer } from '../container';

export const PageConstraints = () => {
  const { data, updateExtended } = useEditorActions();
  const page_data = data as PageDetail;
  const {
    constraints: { events: eventConstraints, locations: locationConstraints, user_segments: userSegmentConstraints },
    constraints,
  } = page_data;

  const { locations } = useLocations();
  const { userSegments } = useUserSegments();
  const { eventStates } = useEventStates();
  const { upcomingEvents } = useUpcomingEvents();

  const handleSelectAllUserSegments = () => {
    updateExtended({ constraints: { ...constraints, user_segments: [] } });
  };

  const handleUpdateUserConstraints = (id: string, isSelected: boolean) => {
    let updatedUserSegementConstraints = [...userSegmentConstraints];
    if (isSelected) {
      const selectedUserSegment = userSegments.find((u) => u._id === id);
      if (selectedUserSegment) updatedUserSegementConstraints.push(selectedUserSegment);
    } else {
      updatedUserSegementConstraints = updatedUserSegementConstraints.filter((u) => u._id !== id);
    }
    updateExtended({ constraints: { ...constraints, user_segments: updatedUserSegementConstraints } });
  };

  const handleSelectAllLocations = () => {
    updateExtended({ constraints: { ...constraints, locations: [] } });
  };

  const handleUpdateLocationConstraints = (id: string, isSelected: boolean) => {
    let updatedLocationConstraints = [...locationConstraints];
    if (isSelected) {
      const selectedLocation = locations.find((u) => u._id === id);
      if (selectedLocation) updatedLocationConstraints.push(selectedLocation);
    } else {
      updatedLocationConstraints = updatedLocationConstraints.filter((u) => u._id !== id);
    }
    updateExtended({ constraints: { ...constraints, locations: updatedLocationConstraints } });
  };

  const handleUpdateEventConstraints = (updatedData: EventConstraint[]) => {
    updateExtended({ constraints: { ...constraints, events: updatedData } });
  };

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
          <EventConstraints
            eventStates={eventStates}
            upcomingEvents={upcomingEvents}
            data={eventConstraints}
            onUpdate={handleUpdateEventConstraints}
          />
        </Grid>
        <Grid item xs>
          <LocationConstraints
            data={locationConstraints}
            locations={locations}
            onUpdate={handleUpdateLocationConstraints}
            onSelectAll={handleSelectAllLocations}
          />
        </Grid>
        <Grid item xs>
          <UserConstraints
            data={userSegmentConstraints}
            userSegments={userSegments}
            onUpdate={handleUpdateUserConstraints}
            onSelectAll={handleSelectAllUserSegments}
          />
        </Grid>
      </Grid>
    </BaseContainer>
  );
};
