const GetInsightsOverviewResponse = {
  payload: {
    data: {
      kpi: [
        {
          title: 'New Users',
          subtitle: 'The number of new users in the past 7 days',
          info: {
            description: 'The number of new users who signed up in the past 7 days',
            url: 'www.newusers.com/info',
          },
          value: 100,
          unit: null,
          data: [
            {
              duration: 7,
              span: {
                title: 'Prev 7 days',
                unit: null,
                value: 100,
                direction: 'up',
              },
              median: {
                title: 'Prev 7 days',
                unit: null,
                value: 100,
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
          title: 'Average Time on Page',
          subtitle: 'Engagement metric',
          info: {
            description: 'The average amount of time users spend on a given page',
            url: 'https://www.example.com/metrics/avg-time-on-page',
          },
          value: 56,
          unit: 'sec',
          data: [
            {
              duration: '7 days',
              span: {
                title: 'Prev 7 days',
                unit: 'sec',
                value: 62,
                direction: 'down',
              },
              median: {
                title: 'Prev 7 days',
                unit: 'sec',
                value: 54,
                direction: 'up',
              },
            },
            {
              duration: '30 days',
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
          title: 'Session Duration',
          subtitle: 'How long users are staying on the website?',
          info: {
            description: 'Session duration metric measures the amount of time a user spends on a website during a single session.',
            url: 'https://www.example.com/metrics/session-duration',
          },
          value: 175,
          unit: 'sec',
          data: [
            {
              duration: 'Last 30 days',
              span: {
                title: 'Prev 30 days',
                unit: 'sec',
                value: 185,
                direction: 'down',
              },
              median: {
                title: 'Prev 30 days',
                unit: 'sec',
                value: 180,
                direction: 'down',
              },
            },
            {
              duration: 'Last 7 days',
              span: {
                title: 'Prev 7 days',
                unit: 'sec',
                value: 170,
                direction: 'up',
              },
              median: {
                title: 'Prev 7 days',
                unit: 'sec',
                value: 172,
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
          title: 'Pageviews',
          subtitle: 'Measure of the number of times a page has been viewed.',
          info: {
            description: 'The total number of times a specific page or set of pages has been viewed.',
            url: 'https://example.com/metrics/pageviews',
          },
          value: 4200,
          unit: null,
          data: [
            {
              duration: 30,
              span: {
                title: 'Past 30 days',
                unit: null,
                value: 4200,
                direction: 'up',
              },
              median: {
                title: 'Past 30 days',
                unit: null,
                value: 4000,
                direction: 'up',
              },
            },
            {
              duration: 7,
              span: {
                title: 'Past 7 days',
                unit: null,
                value: 1200,
                direction: 'up',
              },
              median: {
                title: 'Past 7 days',
                unit: null,
                value: 1100,
                direction: 'up',
              },
            },
            {
              duration: 1,
              span: {
                title: 'Yesterday',
                unit: null,
                value: 150,
                direction: 'down',
              },
              median: {
                title: 'Yesterday',
                unit: null,
                value: 160,
                direction: 'down',
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
      histogram: [
        {
          title: 'Active Users',
          subtitle: 'How many people are using the app?',
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
      segmentations: {
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
      overview: {
        title: 'Usage Metrics',
        info: {
          description: 'Look at how people are using usage metrics!',
          url: 'www.example.com/useage-metrics',
        },
        options: {
          curr_filter: 'user-engagement-metric',
        },
        metrics: [
          {
            id: 'table-metric-1',
            title: 'Page Views',
            subtitle: 'What are our users viewing?',
            labels: [
              {
                page_path: 'Page Path',
              },
              {
                total_views: 'Total Views',
              },
              {
                unique_views: 'Unique Views',
              },
            ],
            data: [
              {
                page_path: '/home',
                total_views: {
                  value: 1000,
                  unit: null,
                },
                unique_views: {
                  value: 800,
                  unit: null,
                },
              },
              {
                page_path: '/about',
                total_views: {
                  value: 500,
                  unit: null,
                },
                unique_views: {
                  value: 400,
                  unit: null,
                },
              },
              {
                page_path: '/contact',
                total_views: {
                  value: 200,
                  unit: null,
                },
                unique_views: {
                  value: 150,
                  unit: null,
                },
              },
            ],
          },
          {
            id: 'user-engagement-metric',
            title: 'User Engagement',
            subtitle: 'How engaged are our users?',
            labels: [
              { 'metric-type': 'Metric Type' },
              { 'total-users': 'Total Users' },
              { 'active-users': 'Active Users' },
              { 'sessions-per-user': 'Sessions per User' },
              { 'avg-session-duration': 'Average Session Duration' },
            ],
            data: [
              {
                'metric-type': 'Week 1',
                'total-users': '250',
                'active-users': '150',
                'sessions-per-user': '2.5',
                'avg-session-duration': { value: '1.5', unit: 'minutes' },
              },
              {
                'metric-type': 'Week 2',
                'total-users': '275',
                'active-users': '180',
                'sessions-per-user': '3.0',
                'avg-session-duration': { value: '2.0', unit: 'minutes' },
              },
              {
                'metric-type': 'Week 3',
                'total-users': '300',
                'active-users': '200',
                'sessions-per-user': '3.5',
                'avg-session-duration': { value: '2.5', unit: 'minutes' },
              },
            ],
          },
          {
            id: 'time_spent',
            title: 'Time Spent on App',
            subtitle: 'How long are users engaging with the app?',
            labels: [
              {
                time_spent_seconds: 'Time Spent (seconds)',
              },
              {
                average_time_spent_seconds: 'Average Time Spent (seconds)',
              },
              {
                total_time_spent_seconds: 'Total Time Spent (seconds)',
              },
            ],
            data: [
              {
                time_spent_seconds: {
                  value: 456,
                  unit: 'seconds',
                },
                average_time_spent_seconds: {
                  value: 120,
                  unit: 'seconds',
                },
                total_time_spent_seconds: {
                  value: 10800,
                  unit: 'seconds',
                },
              },
              {
                time_spent_seconds: {
                  value: 320,
                  unit: 'seconds',
                },
                average_time_spent_seconds: {
                  value: 60,
                  unit: 'seconds',
                },
                total_time_spent_seconds: {
                  value: 7200,
                  unit: 'seconds',
                },
              },
              {
                time_spent_seconds: {
                  value: 640,
                  unit: 'seconds',
                },
                average_time_spent_seconds: {
                  value: 180,
                  unit: 'seconds',
                },
                total_time_spent_seconds: {
                  value: 14400,
                  unit: 'seconds',
                },
              },
            ],
          },
          {
            id: 'shopping-funnel-analytics',
            title: 'Shopping Funnel Analytics',
            subtitle: 'Conversion rates for different stages of the shopping funnel',
            labels: [
              { slug: 'step', label: 'Step' },
              { slug: 'visits', label: 'Visits' },
              { slug: 'cart_additions', label: 'Cart Additions' },
              { slug: 'checkouts', label: 'Checkouts' },
              { slug: 'purchases', label: 'Purchases' },
              { slug: 'conversion_rate', label: 'Conversion Rate' },
            ],
            data: [
              {
                step: 'Homepage',
                visits: { value: 10000, unit: null },
                cart_additions: { value: 2000, unit: null },
                checkouts: { value: 1000, unit: null },
                purchases: { value: 500, unit: null },
                conversion_rate: { value: 5, unit: '%' },
              },
              {
                step: 'Category Page',
                visits: { value: 5000, unit: null },
                cart_additions: { value: 1500, unit: null },
                checkouts: { value: 1000, unit: null },
                purchases: { value: 400, unit: null },
                conversion_rate: { value: 8, unit: '%' },
              },
              {
                step: 'Product Page',
                visits: { value: 2500, unit: null },
                cart_additions: { value: 1000, unit: null },
                checkouts: { value: 500, unit: null },
                purchases: { value: 250, unit: null },
                conversion_rate: { value: 10, unit: '%' },
              },
              {
                step: 'Cart',
                visits: { value: 2000, unit: null },
                cart_additions: { value: 2000, unit: null },
                checkouts: { value: 1500, unit: null },
                purchases: { value: 1000, unit: null },
                conversion_rate: { value: 50, unit: '%' },
              },
              {
                step: 'Checkout',
                visits: { value: 1500, unit: null },
                cart_additions: { value: 1500, unit: null },
                checkouts: { value: 1500, unit: null },
                purchases: { value: 1250, unit: null },
                conversion_rate: { value: 83.3, unit: '%' },
              },
            ],
          },
        ],
      },
    },
  },
};

export default GetInsightsOverviewResponse;
