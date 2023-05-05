const payload = {
  data: [
    {
      title: 'Dwell Time',
      subtitle: 'How long are users viewing this page?',
      info: {
        description: 'Information about histogram view',
        url: 'www.histogram.com/info',
      },
      unit: 'sec',
      data: [
        {
          datetime: '2023-04-01T00:00:00Z',
          value: 2350,
          trends: {
            duration: 1,
            span: {
              title: 'Prev Day',
              unit: 'sec',
              value: 12,
              direction: 'up',
            },
            median: {
              title: 'Prev Day',
              unit: 'sec',
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
              unit: 'sec',
              value: 23,
              direction: 'up',
            },
            median: {
              title: 'Prev 7 days',
              unit: 'sec',
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
              unit: 'sec',
              value: 27,
              direction: 'down',
            },
            median: {
              title: 'Past 30 days',
              unit: 'sec',
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
    {
      title: 'How many users viewed this page?',
      subtitle: 'Aggregated Page View vs Unique Page Views',
      info: {
        description: 'Information about histogram view',
        url: 'www.histogram.com/views',
      },
      unit: null,
      data: [
        {
          title: 'Page Views',
          data: [
            {
              datetime: '2023-04-01T00:00:00Z',
              value: 2350,
              trends: {
                duration: 1,
                span: {
                  title: 'Prev Day',
                  unit: 'sec',
                  value: 12,
                  direction: 'up',
                },
                median: {
                  title: 'Prev Day',
                  unit: 'sec',
                  value: 12,
                  direction: 'up',
                },
              },
            },
            {
              datetime: '2023-04-01T00:00:00Z',
              value: 1000,
              trends: {
                duration: 1,
                span: {
                  title: 'Prev Day',
                  unit: 'sec',
                  value: 12,
                  direction: 'up',
                },
                median: {
                  title: 'Prev Day',
                  unit: 'sec',
                  value: 10,
                  direction: 'up',
                },
              },
            },
          ],
        },
        {
          title: 'Unique Page Views',
          data: [
            {
              datetime: '2023-03-28T00:00:00Z',
              value: 2145,
              trends: {
                duration: 7,
                span: {
                  title: 'Prev 7 days',
                  unit: 'sec',
                  value: 23,
                  direction: 'up',
                },
                median: {
                  title: 'Prev 7 days',
                  unit: 'sec',
                  value: 23,
                  direction: 'up',
                },
              },
            },
            {
              datetime: '2023-03-28T00:00:00Z',
              value: 2005,
              trends: {
                duration: 7,
                span: {
                  title: 'Prev 7 days',
                  unit: 'sec',
                  value: 13,
                  direction: 'down',
                },
                median: {
                  title: 'Prev 7 days',
                  unit: 'sec',
                  value: 23,
                  direction: 'up',
                },
              },
            },
          ],
        },
      ],
      options: {
        events: [
          {
            datetime: '2023-04-02T08:30:00Z',
            title: 'Beyonce',
            id: 'evt-0987',
            description: 'Update for version 2.1',
            details: 'Check release notes for more info',
          },
          {
            datetime: '2023-03-31T14:45:00Z',
            title: 'Ducks Vs Red wings',
            id: 'evt-7890',
          },
        ],
      },
    },
  ],
};

export default payload;
