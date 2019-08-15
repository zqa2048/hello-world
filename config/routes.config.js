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
        name: 'findPwd',
        path: '/user/findPwd',
        component: './user/findPwd',
      },
      {
        name: 'findPwd-result',
        path: '/user/findPwd-result',
        component: './user/findPwd-result',
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
          {
            path: '/cdn',
            name: 'cdn',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/cdn',
                redirect: '/cdn/list',
              },
              {
                path: '/cdn/new',
                name: 'cdn',
                icon: 'dashboard',
                component: './cdn/new',
              },
              {
                path: '/cdn/list',
                name: 'cdn',
                icon: 'dashboard',
                component: './cdn/list',
              },
            ],
          },
          {
            name: 'account',
            icon: 'user',
            path: '/account',
            hideInMenu: true,
            routes: [
              // {
              //   name: 'center',
              //   path: '/account/center',
              //   component: './account/center',
              // },
              {
                name: 'settings',
                path: '/account/settings',
                component: './account/settings',
              },
            ],
          },
          {
            path: '/',
            redirect: '/cdn/new',
            authority: ['admin', 'user'],
          },
          {
            name: 'exception',
            icon: 'warning',
            path: '/exception',
            hideInMenu: true,
            routes: [
              {
                name: '403',
                path: '/exception/403',
                component: './exception/403',
              },
              {
                name: '404',
                path: '/exception/404',
                component: './exception/404',
              },
              {
                name: '500',
                path: '/exception/500',
                component: './exception/500',
              },
            ],
          },
          {
            component: '404',
          },
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
          //     {
          //       name: 'monitor',
          //       path: '/dashboard/monitor',
          //       component: './dashboard/monitor',
          //     },
          //     {
          //       name: 'workplace',
          //       path: '/dashboard/workplace',
          //       component: './dashboard/workplace',
          //     },
          //   ],
          // },
          // {
          //   path: '/form',
          //   icon: 'form',
          //   name: 'form',
          //   routes: [
          //     {
          //       name: 'basic-form',
          //       path: '/form/basic-form',
          //       component: './form/basic-form',
          //     },
          //     {
          //       name: 'step-form',
          //       path: '/form/step-form',
          //       component: './form/step-form',
          //     },
          //     {
          //       name: 'advanced-form',
          //       path: '/form/advanced-form',
          //       component: './form/advanced-form',
          //     },
          //   ],
          // },
          // {
          //   path: '/list',
          //   icon: 'table',
          //   name: 'list',
          //   routes: [
          //     {
          //       path: '/list/search',
          //       name: 'search-list',
          //       component: './list/search',
          //       routes: [
          //         {
          //           path: '/list/search',
          //           redirect: '/list/search/articles',
          //         },
          //         {
          //           name: 'articles',
          //           path: '/list/search/articles',
          //           component: './list/search/articles',
          //         },
          //         {
          //           name: 'projects',
          //           path: '/list/search/projects',
          //           component: './list/search/projects',
          //         },
          //         {
          //           name: 'applications',
          //           path: '/list/search/applications',
          //           component: './list/search/applications',
          //         },
          //       ],
          //     },
          //     {
          //       name: 'table-list',
          //       path: '/list/table-list',
          //       component: './list/table-list',
          //     },
          //     {
          //       name: 'basic-list',
          //       path: '/list/basic-list',
          //       component: './list/basic-list',
          //     },
          //     {
          //       name: 'card-list',
          //       path: '/list/card-list',
          //       component: './list/card-list',
          //     },
          //   ],
          // },
          // {
          //   path: '/profile',
          //   name: 'profile',
          //   icon: 'profile',
          //   routes: [
          //     {
          //       name: 'basic',
          //       path: '/profile/basic',
          //       component: './profile/basic',
          //     },
          //     {
          //       name: 'advanced',
          //       path: '/profile/advanced',
          //       component: './profile/advanced',
          //     },
          //   ],
          // },
          // {
          //   name: 'result',
          //   icon: 'check-circle-o',
          //   path: '/result',
          //   routes: [
          //     {
          //       name: 'success',
          //       path: '/result/success',
          //       component: './result/success',
          //     },
          //     {
          //       name: 'fail',
          //       path: '/result/fail',
          //       component: './result/fail',
          //     },
          //   ],
          // },
          // {
          //   name: 'exception',
          //   icon: 'warning',
          //   path: '/exception',
          //   routes: [
          //     {
          //       name: '403',
          //       path: '/exception/403',
          //       component: './exception/403',
          //     },
          //     {
          //       name: '404',
          //       path: '/exception/404',
          //       component: './exception/404',
          //     },
          //     {
          //       name: '500',
          //       path: '/exception/500',
          //       component: './exception/500',
          //     },
          //   ],
          // },
          // {
          //   name: 'account',
          //   icon: 'user',
          //   path: '/account',
          //   routes: [
          //     {
          //       name: 'center',
          //       path: '/account/center',
          //       component: './account/center',
          //     },
          //     {
          //       name: 'settings',
          //       path: '/account/settings',
          //       component: './account/settings',
          //     },
          //   ],
          // },
          // {
          //   name: 'editor',
          //   icon: 'highlight',
          //   path: '/editor',
          //   routes: [
          //     {
          //       name: 'flow',
          //       path: '/editor/flow',
          //       component: './editor/flow',
          //     },
          //     {
          //       name: 'mind',
          //       path: '/editor/mind',
          //       component: './editor/mind',
          //     },
          //     {
          //       name: 'koni',
          //       path: '/editor/koni',
          //       component: './editor/koni',
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
];
