import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import {
  EnumValue,
  useLazyGetEnumListQuery,
  useLazyGetUpcomingEventsQuery,
  useSavePageConstraintsMutation,
} from '@lths/features/mms/data-access';

import AlertDialog from './AlertDialog';
import DateTimeRangePicker from './DateTimeRangePicker';
import Title from './Title';

const Constraints = () => {
  const [getEnumList] = useLazyGetEnumListQuery();

  const navigate = useNavigate();

  const [showWhen, setShowWhen] = useState('always');
  const [showWhere, setShowWhere] = useState('everywhere');
  const [showWhom, setShowWhom] = useState('everyone');

  const [eventStates, setEventStates] = useState<EnumValue[]>(null);
  const [locations, setLocations] = useState<EnumValue[]>(null);
  const [userSegments, setUserSegments] = useState<EnumValue[]>(null);

  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [isNotSavedAlertOpen, setIsNotSavedAlertOpen] = useState(false);

  const [savePageConstraints, { isLoading }] = useSavePageConstraintsMutation();

  const [getUpcomingEvents, { data: upcomingEvents }] = useLazyGetUpcomingEventsQuery();

  const fetchAndSetEnumListById = async (
    enum_id: string,
    setState: React.Dispatch<React.SetStateAction<EnumValue[]>>
  ) => {
    try {
      const response = await getEnumList(enum_id);
      setState(response?.data?.data?.enum_values);
    } catch (error) {
      console.error(`Error in fetching enum list for ${enum_id}`);
    }
  };

  useEffect(() => {
    fetchAndSetEnumListById('EventState', setEventStates);
    fetchAndSetEnumListById('Location', setLocations);
    fetchAndSetEnumListById('UserSegments', setUserSegments);
    getUpcomingEvents();
  }, []);

  const handleTimeConstraintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowWhen(e.target.value);
  };

  const handlePlaceConstraintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowWhere(e.target.value);
  };

  const handleUserConstraintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowWhom(e.target.value);
  };

  const handleAlertDialogClose = () => setIsAlertOpen(false);

  const AlertDialogAction = () => (
    <Button variant="contained" onClick={handleAlertDialogClose}>
      OK
    </Button>
  );

  const NotSavedAlertDialogActions = () => (
    <>
      <Button variant="outlined" onClick={() => navigate('/pages')}>
        DON'T SAVE
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setIsNotSavedAlertOpen(false);
          handleConstraintsSave();
        }}
      >
        SAVE
      </Button>
    </>
  );

  const handleConstraintsSave = () => {
    const isVariationAlreadyExists = false;

    if (
      showWhen === 'always' &&
      showWhere === 'everywhere' &&
      showWhom === 'everyone' /* TODO: && Check if this page is a variant */
    ) {
      setAlertTitle('Variation constraints required');
      setAlertDescription(
        'You have not specified any constraints on this page variation.  You must select at least one unique constraint to create a variation.'
      );
      setIsAlertOpen(true);
    } else if (isVariationAlreadyExists) {
      setAlertTitle('This variation already exists');
      setAlertDescription(
        `A variation of this page with the same constraints already exists.  You cannot create two variations with the same constraints.  
        Update your constraints to save this page.`
      );
      setIsAlertOpen(true);
    } else {
      savePageConstraints({ page_id: '123' });
    }
  };

  const handleCancel = () => {
    setIsNotSavedAlertOpen(true);
  };

  const formatDate = (date) => format(new Date(date), 'MMM dd, yyyy');

  return (
    <Box style={{ backgroundColor: '#F3F3F3', padding: 16 }}>
      <Typography sx={{ fontStyle: 'italic', color: '#6A6A6B', fontWeight: '400' }}>
        This information is only required when you want the page to only display for specific event states, locations,
        and/or users.
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        marginY={6}
        sx={{ minHeight: '250px' }}
      >
        <Grid item xs>
          <Title
            title="When do you want this page to display?"
            description="This page will only display during these times."
            infoText="These are derived from the dynamic schedule. If you want to add more dates or event states to be available go to the schedule to add them."
          />
          <FormControl sx={{ marginTop: 6 }}>
            <RadioGroup defaultValue={'always'} onChange={handleTimeConstraintChange}>
              <FormControlLabel value="always" control={<Radio />} label="Always show this page" />
              <FormControlLabel
                value="all-events"
                control={<Radio />}
                label="Show this page before/after/during all events"
                sx={{
                  marginTop: 1,
                }}
              />
              {showWhen === 'all-events' && (
                <FormGroup sx={{ marginLeft: 4, marginY: 2 }}>
                  {eventStates?.map((es) => (
                    <FormControlLabel label={es?.name} key={es?.value} value={es?.value} control={<Checkbox />} />
                  ))}
                </FormGroup>
              )}
              <FormControlLabel
                value="one-or-more-events"
                control={<Radio />}
                label="Show this page before/after/during one or more events"
                sx={{
                  marginTop: 1,
                }}
              />
              {showWhen === 'one-or-more-events' && (
                <Box sx={{ marginLeft: 4, marginY: 2 }}>
                  <Typography>CHOOSE EVENT(S)</Typography>
                  <Autocomplete
                    multiple
                    id="multiple-events"
                    options={upcomingEvents?.data}
                    getOptionLabel={(option) => `${option.name} | ${formatDate(option.start_date_time)}`}
                    renderInput={(params) => <TextField {...params} />}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={option.event_id}
                          label={`${option.name} | ${formatDate(option.start_date_time)}`}
                          {...getTagProps({ index })}
                          sx={{ borderRadius: '4px', backgroundColor: '#D8D8D8' }}
                        />
                      ))
                    }
                  />
                  <FormGroup>
                    {eventStates?.map((es) => (
                      <FormControlLabel label={es?.name} key={es?.value} value={es?.value} control={<Checkbox />} />
                    ))}
                  </FormGroup>
                </Box>
              )}
              <FormControlLabel
                value="discrete-range"
                control={<Radio />}
                label="Show this page during a discrete date/time range"
                sx={{
                  marginTop: 1,
                }}
              />
              {showWhen === 'discrete-range' && (
                <Box sx={{ marginLeft: 4 }}>
                  <DateTimeRangePicker />
                </Box>
              )}
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs>
          <Title
            title="Where do you want this page to display?"
            description="This page will only display only for users at this location."
            infoText="These are based off of tickets scanned in. "
          />
          <FormControl sx={{ marginTop: 6 }}>
            <RadioGroup defaultValue={'everywhere'} onChange={handlePlaceConstraintChange}>
              <FormControlLabel value="everywhere" control={<Radio />} label="Show this page everywhere" />
              <FormControlLabel
                value="specific-spaces"
                control={<Radio />}
                label="Only show this page in specific spaces"
                sx={{
                  marginTop: 1,
                }}
              />
              {showWhere === 'specific-spaces' && (
                <FormGroup sx={{ marginLeft: 4 }}>
                  {locations?.map((loc) => (
                    <FormControlLabel key={loc?.value} label={loc?.name} value={loc?.value} control={<Checkbox />} />
                  ))}
                </FormGroup>
              )}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Title
            title="Who do you want see this page?"
            description="This page will only display for the selected users."
            infoText="These are based off our loyalty buckets and other subgroups, if you would like to have a custom group made please reach out to our Support Team."
          />
          <FormControl sx={{ marginTop: 6 }}>
            <RadioGroup defaultValue={'everyone'} onChange={handleUserConstraintChange}>
              <FormControlLabel value="everyone" control={<Radio />} label="Show to page to all users" />
              <FormControlLabel
                value="select-users"
                control={<Radio />}
                label="Only show this page to select users"
                sx={{
                  marginTop: 1,
                }}
              />
              {showWhom === 'select-users' && (
                <FormGroup sx={{ marginLeft: 4 }}>
                  {userSegments?.map((us) => (
                    <FormControlLabel value={us?.value} label={us?.name} control={<Checkbox />} />
                  ))}
                </FormGroup>
              )}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Divider sx={{ borderBottomWidth: 2 }} />
      <Stack direction="row" justifyContent={'flex-end'} padding={2}>
        <Button variant="outlined" sx={{ marginRight: 2 }} onClick={handleCancel}>
          CANCEL
        </Button>
        <LoadingButton variant="contained" onClick={handleConstraintsSave} loading={isLoading}>
          SAVE
        </LoadingButton>
      </Stack>
      <AlertDialog
        title={alertTitle}
        description={alertDescription}
        isOpen={isAlertOpen}
        handleClose={handleAlertDialogClose}
        actions={<AlertDialogAction />}
      />
      <AlertDialog
        title="You haven’t saved your work!"
        description="You have made updates to this page without saving your work.  Do you want to save before leaving this page?"
        isOpen={isNotSavedAlertOpen}
        handleClose={() => setIsNotSavedAlertOpen(false)}
        actions={<NotSavedAlertDialogActions />}
      />
    </Box>
  );
};

export default Constraints;
