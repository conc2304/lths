const payload = {
  data: {
    title: 'User Segmention',
    subtitle: 'Who is using the app? And how old are they?',
    description: 'A donut chart showing the distribution of app users by age group.',
    metrics: [
      {
        title: 'Active Users',
        description: 'Total number of active users segmented by location',
        subtitle: null,
        data: [
          {
            title: 'North America',
            value: 800,
          },
          {
            title: 'Europe',
            value: 700,
          },
          {
            title: 'Asia',
            value: 600,
          },
          {
            title: 'South America',
            value: 400,
          },
          {
            title: 'Africa',
            value: 300,
          },
        ],
      },
      {
        title: 'new users',
        description: 'Number of new users in the past 30 days',
        subtitle: 'Who is using the app? And how old are they?',
        data: [
          { title: '18-24', value: 983 },
          { title: '25-34', value: 1647 },
          { title: '35-44', value: 1220 },
          { title: '45-54', value: 544 },
          { title: '55+', value: 201 },
        ],
      },
    ],
  },
};
export default payload;
