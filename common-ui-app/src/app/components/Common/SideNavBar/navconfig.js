export default ({ credit, identity }) => [
  {
    heading: 'main_heading',
    items: [
      {
        key: 'dashboard',
        url: '/dashboard',
      },
      credit && {
        key: 'credit_center',
        url: '/credit-center',
      },
      {
        key: 'alert_center',
        url: '/alert-center',
      },
      identity && {
        key: 'identity_center',
        url: '/identity-center',
      },
      {
        key: 'education_center',
        url: '/education-center',
      },
      {
        key: 'plan_details',
        url: '/plan-details',
      },
      {
        key: 'contactus',
        url: '/contact-us',
      },
    ].filter((item) => item),
  },
  {
    heading: 'account_heading',
    items: [
      {
        key: 'profile',
        url: '/profile',
      },
      {
        key: 'logout',
        url: '/logout',
      },
    ],
  },
]
