const payload = {
  data: {
    title: 'Who is using the app?  And where do they use it?',
    subtitle: 'User Segments & locations',
    description: 'A donut chart showing the distribution of app users by age group.',
    metrics: [
      {
        title: 'Users',
        description: 'Total number of active users segmented by location',
        subtitle: null,
        data: [
          {
            title: 'Club memebers',
            value: 1234,
          },
          {
            title: 'Mighty Program members',
            value: 2345,
          },
          {
            title: 'New attendees',
            value: 781,
          },
        ],
      },
      {
        title: 'Users',
        description: 'Number of new users in the past 30 days',
        subtitle: 'Who is using the app? And how old are they?',
        data: [
          { title: 'In arena', value: 2500 },
          { title: 'In district', value: 1900 },
          { title: 'At home', value: 650 },
        ],
      },
    ],
  },
};
export default payload;
