const payload = {
  data: [
    {
      subtitle: 'Active Users',
      title: 'How many people are using the app?',
      info: {
        description: 'Information about histogram view',
        url: 'www.histogram.com/info',
      },
      unit: null,
      data: [
        {
          datetime: '2023-04-01T00:00:00Z',
          value: 2350,
          trends: {
            duration: 1,
            span: {
              title: 'Prev Day',
              unit: '%',
              value: 12,
              direction: 'up',
            },
            median: {
              title: 'Prev Day',
              unit: '%',
              value: 12,
              direction: 'up',
            },
          },
        },
        {
          datetime: '2023-03-28T00:00:00Z',
          value: 2145,
          trends: {
            duration: 7,
            span: {
              title: 'Prev 7 days',
              unit: '%',
              value: 23,
              direction: 'up',
            },
            median: {
              title: 'Prev 7 days',
              unit: '%',
              value: 23,
              direction: 'up',
            },
          },
        },
        {
          datetime: '2023-03-05T00:00:00Z',
          value: 1890,
          trends: {
            duration: 30,
            span: {
              title: 'Past 30 days',
              unit: '%',
              value: 27,
              direction: 'down',
            },
            median: {
              title: 'Past 30 days',
              unit: '%',
              value: 27,
              direction: 'down',
            },
          },
        },
      ],
      options: {
        events: [
          {
            datetime: '2023-04-02T08:30:00Z',
            title: 'New feature release',
            id: 'evt-0987',
            description: 'Update for version 2.1',
            details: 'Check release notes for more info',
          },
          {
            datetime: '2023-03-31T14:45:00Z',
            title: 'Bug fixes',
            id: 'evt-7890',
          },
        ],
      },
    },
  ],
};

export default payload;
