export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        name: 'register-result',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './user/register',
      },
      {
        component: '404',
      },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          // {
          //   path: '/dashboard',
          //   name: 'dashboard',
          //   icon: 'dashboard',
          //   routes: [
          //     {
          //       name: 'analysis',
          //       path: '/dashboard/analysis',
          //       component: './dashboard/analysis',
          //     },
          //   ],
          // },
          // {
          //   name: 'exception',
          //   icon: 'warning',
          //   path: '/exception',
          //   routes: [
          //     // exception
          //     {
          //       path: '/exception/403',
          //       name: 'not-permission',
          //       component: './Exception/403',
          //     },
          //     {
          //       path: '/exception/404',
          //       name: 'not-find',
          //       component: './Exception/404',
          //     },
          //     {
          //       path: '/exception/500',
          //       name: 'server-error',
          //       component: './Exception/500',
          //     },
          //   ],
          // },
          {
            component: '404',
          },
        ],
      },
    ],
  },
];
