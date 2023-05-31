const payload = {
  data: [
    {
      title: 'Overall Conversion',
      subtitle: 'The number of new users in the past 7 days',
      info: {
        description: 'The number of new users who signed up in the past 7 days',
        url: 'www.newusers.com/info',
      },
      value: 43,
      unit: '%',
      data: [
        {
          duration: 7,
          span: {
            title: 'Prev 7 days',
            unit: '%',
            value: 19,
            direction: 'up',
          },
          median: {
            title: 'Median',
            unit: '%',
            value: 7,
            direction: 'up',
          },
        },
        {
          duration: 30,
          span: {
            title: 'Past 30 days',
            unit: null,
            value: 500,
            direction: 'up',
          },
          median: {
            title: 'Past 30 days',
            unit: null,
            value: 450,
            direction: 'up',
          },
        },
      ],
      sparkline: [
        { date: '2022-03-01', value: 80 },
        { date: '2022-03-02', value: 95 },
        { date: '2022-03-03', value: 110 },
        { date: '2022-03-04', value: 120 },
        { date: '2022-03-05', value: 150 },
        { date: '2022-03-06', value: 125 },
        { date: '2022-03-07', value: 130 },
        { date: '2022-03-08', value: 140 },
        { date: '2022-03-09', value: 170 },
        { date: '2022-03-10', value: 200 },
      ],
    },
    {
      title: 'Total Users In',
      subtitle: 'Engagement metric',
      info: {
        description: 'The average amount of time users spend on a given page',
        url: 'https://www.example.com/metrics/avg-time-on-page',
      },
      value: 1234,
      unit: null,
      data: [
        {
          duration: 7,
          span: {
            title: 'Prev 7 days',
            unit: '%',
            value: 1234,
            direction: 'up',
          },
          median: {
            title: 'Median',
            unit: '%',
            value: 12,
            direction: 'up',
          },
        },
        {
          duration: 30,
          span: {
            title: 'Prev 30 days',
            unit: 'sec',
            value: 58,
            direction: 'up',
          },
          median: {
            title: 'Prev 30 days',
            unit: 'sec',
            value: 60,
            direction: 'down',
          },
        },
      ],
      sparkline: [
        { date: '2022-03-25T00:00:00.000Z', value: 60 },
        { date: '2022-03-26T00:00:00.000Z', value: 55 },
        { date: '2022-03-27T00:00:00.000Z', value: 52 },
        { date: '2022-03-28T00:00:00.000Z', value: 63 },
        { date: '2022-03-29T00:00:00.000Z', value: 57 },
        { date: '2022-03-30T00:00:00.000Z', value: 54 },
        { date: '2022-03-31T00:00:00.000Z', value: 58 },
        { date: '2022-04-01T00:00:00.000Z', value: 61 },
        { date: '2022-04-02T00:00:00.000Z', value: 56 },
        { date: '2022-04-03T00:00:00.000Z', value: 59 },
      ],
    },
    {
      title: 'Total Dropped Users',
      subtitle: 'How long users are staying on the website?',
      info: {
        description:
          'Session duration metric measures the amount of time a user spends on a website during a single session.',
        url: 'https://www.example.com/metrics/session-duration',
      },
      value: 532,
      unit: null,
      data: [
        {
          duration: 7,
          span: {
            title: 'Prev 7 days',
            unit: '%',
            value: 16,
            direction: 'down',
          },
          median: {
            title: 'Median',
            unit: '%',
            value: 23,
            direction: 'up',
          },
        },
      ],
      sparkline: [
        { date: '2022-03-25', value: 187 },
        { date: '2022-03-26', value: 183 },
        { date: '2022-03-27', value: 177 },
        { date: '2022-03-28', value: 175 },
        { date: '2022-03-29', value: 182 },
        { date: '2022-03-30', value: 180 },
        { date: '2022-03-31', value: 176 },
        { date: '2022-04-01', value: 172 },
        { date: '2022-04-02', value: 169 },
        { date: '2022-04-03', value: 175 },
      ],
    },
    {
      title: 'Average Completion Time',
      subtitle: 'Measure of the number of times a page has been viewed.',
      info: {
        description: 'The total number of times a specific page or set of pages has been viewed.',
        url: 'https://example.com/metrics/pageviews',
      },
      value: 189,
      unit: 'secs',
      data: [
        {
          duration: 7,
          span: {
            title: 'Past 30 days',
            unit: '%',
            value: 6,
            direction: 'up',
          },
          median: {
            title: 'Median',
            unit: '%',
            value: -9,
            direction: 'up',
          },
        },
      ],
      sparkline: [
        { date: '2022-03-26T00:00:00.000Z', value: 400 },
        { date: '2022-03-27T00:00:00.000Z', value: 500 },
        { date: '2022-03-28T00:00:00.000Z', value: 900 },
        { date: '2022-03-29T00:00:00.000Z', value: 800 },
        { date: '2022-03-30T00:00:00.000Z', value: 1000 },
        { date: '2022-03-31T00:00:00.000Z', value: 1100 },
        { date: '2022-04-01T00:00:00.000Z', value: 1200 },
        { date: '2022-04-02T00:00:00.000Z', value: 1400 },
        { date: '2022-04-03T00:00:00.000Z', value: 1700 },
        { date: '2022-04-04T00:00:00.000Z', value: 1800 },
      ],
    },
  ],
};

export default payload;
