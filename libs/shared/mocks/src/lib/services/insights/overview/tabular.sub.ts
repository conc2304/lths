const payload = {
  data: {
    title: 'What are our users viewing?',
    info: {
      description: 'Look at how people are using usage metrics!',
      url: 'www.example.com/useage-metrics',
    },
    options: {
      curr_filter: 'table-metric-0',
    },
    metrics: [
      {
        id: 'table-metric-0',
        title: 'Page',
        subtitle: 'Usage Metrics',
        labels: [
          { slug: 'screen', label: 'SCREEN' },
          { slug: 'total_views', label: 'VIEWS', type: 'number' },
          { slug: 'dwell', label: 'DWELL', unit: 's', type: 'number' },
          { slug: 'exit', label: 'EXIT', unit: '%', type: 'number' },
        ],
        data: [
          {
            screen: 'Home',
            total_views: 6789,
            dwell: 24,
            exit: 15,
          },
          {
            screen: 'View tickets',
            total_views: 5678,
            dwell: 67,
            exit: 24,
          },

          {
            screen: 'Mobile ordering',
            total_views: 4567,
            dwell: 123,
            exit: 17,
          },
          {
            screen: 'Event calendar',
            total_views: 2345,
            dwell: 45,
            exit: 56,
          },
          {
            screen: 'Home',
            total_views: 6789,
            dwell: 24,
            exit: 15,
          },
          {
            screen: 'View tickets',
            total_views: 5678,
            dwell: 67,
            exit: 24,
          },

          { screen: 'Super hero day promo', total_views: 2213, dwell: 23, exit: 18 },
          { screen: 'Arena map', total_views: 1345, dwell: 78, exit: 25 },
          { screen: 'Food & drinks', total_views: 999, dwell: 112, exit: 43 },
          { screen: 'Ducks radio', total_views: 984, dwell: 54, exit: 67 },
          { screen: 'Ducks news', total_views: 653, dwell: 67, exit: 17 },
        ],
      },

      {
        id: 'table-metric-1',
        title: 'App',
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
};

export default payload;
