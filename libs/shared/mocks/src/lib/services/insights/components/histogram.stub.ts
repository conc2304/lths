const payload = {
  data: [
    {
      title: 'How many users viewed and clicked on the component?',
      subtitle: 'Impressions vs Click-throughs',
      info: {
        description: 'Information about component details histogram view',
        url: 'www.histogram.com/component',
      },
      unit: null,
      data: [
        {
          title: 'Impressions',
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
              },
            },
            {
              datetime: '2023-04-01T00:00:00Z',
              value: 1150,
              trends: {
                duration: 1,
                span: {
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
          title: 'Click-throughs',
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
              },
            },
            {
              datetime: '2023-03-28T00:00:00Z',
              value: 3745,
              trends: {
                duration: 7,
                span: {
                  title: 'Prev 7 days',
                  unit: 'sec',
                  value: 13,
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
