import React, { useState } from 'react';
import { Box, Typography, Stack, Chip, Tabs, Tab } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector } from '@mui/lab';

import colors from '../../../../common/colors';
import { GameCenterComponentProps } from '../../types';

const GameCenterComponent: React.FC<GameCenterComponentProps> = ({
  data = { default_tab: 0, tab_mode: 'scrollable' },
}) => {
  const [activeTab, setActiveTab] = useState<number>(data.default_tab);

  const handleChange = (event: React.SyntheticEvent, newTab: number): void => {
    setActiveTab(newTab);
  };

  const defaultPeriodData = [
    {
      title: 'First half',
      label: 'First',
      events: [
        { time: '20:00', type: 'FACEOFF', description: 'Phillip Danault #24 faceoff won against Mason McTavish #37' },
        { time: '19:47', type: 'HIT', description: 'Mason McTavish #37 hit Trevor Moore #12' },
        { time: '19:25', type: 'HIT', description: 'Drew Doughty #8 hit John Klingberg #3' },
      ],
    },
    {
      title: 'Second half',
      label: 'Second',
      events: [
        { time: '20:00', type: 'FACEOFF', description: 'Phillip Danault #24 faceoff won against Mason McTavish #37' },
        { time: '19:25', type: 'HIT', description: 'Drew Doughty #8 hit John Klingberg #3' },
      ],
    },
    {
      title: 'Third half',
      label: 'Third',
      events: [
        { time: '20:00', type: 'FACEOFF', description: 'Phillip Danault #24 faceoff won against Mason McTavish #37' },
        { time: '19:47', type: 'HIT', description: 'Mason McTavish #37 hit Trevor Moore #12' },
      ],
    },
  ];

  const periodData = defaultPeriodData;

  return (
    <Box sx={{ width: '100%', bgcolor: colors.gameCenter.background, overflow: 'hidden' }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="game periods"
        variant={data.tab_mode}
        sx={{
          borderRadius: '10px',
          justifyContent: 'center',
          '.MuiTabs-indicator': {
            backgroundColor: 'transparent',
          },
          '.MuiTab-root': {
            textTransform: 'none',
            color: colors.gameCenter.tab.text,
            backgroundColor: colors.gameCenter.tab.default,
            '&.Mui-selected': {
              color: colors.gameCenter.tab.selectedText,
              backgroundColor: colors.gameCenter.tab.selected,
              borderRadius: '10px',
            },
          },
        }}
      >
        {periodData.map((period, index) => (
          <Tab label={period.label} key={index} />
        ))}
      </Tabs>
      <Timeline>
        {periodData[activeTab]?.events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                color="inherit"
                sx={{
                  bgcolor: `linear-gradient(45deg, ${colors.gameCenter.gradient.start} 30%, ${colors.gameCenter.gradient.end} 90%)`,
                  border: `0.5px solid ${colors.gameCenter.timeline.dotBorder}`,
                  mt: '-5px',
                  mb: '0px',
                }}
              />
              {index < periodData[activeTab].events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '8px', px: 2 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', mt: '-4px' }} alignItems="center">
                <Chip
                  label={event.type}
                  variant="outlined"
                  sx={{
                    backgroundColor: colors.gameCenter.timeline.chipBackground,
                    borderColor: colors.gameCenter.timeline.dotBorder,
                    color: colors.gameCenter.timeline.text,
                    '.MuiChip-label': {
                      paddingX: '15px',
                    },
                  }}
                />
                <Typography variant="body2" color={colors.gameCenter.timeline.text}>
                  {event.time}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color={colors.gameCenter.timeline.text}
                sx={{ flexGrow: 3, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {event.description}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default GameCenterComponent;
