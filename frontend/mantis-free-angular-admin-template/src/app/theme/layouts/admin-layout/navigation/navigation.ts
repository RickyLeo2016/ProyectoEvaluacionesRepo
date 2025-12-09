// export interface NavigationItem {
//   id: string;
//   title: string;
//   type: 'item' | 'collapse' | 'group';
//   translate?: string;
//   icon?: string;
//   hidden?: boolean;
//   url?: string;
//   classes?: string;
//   groupClasses?: string;
//   exactMatch?: boolean;
//   external?: boolean;
//   target?: boolean;
//   breadcrumbs?: boolean;
//   children?: NavigationItem[];
//   link?: string;
//   description?: string;
//   path?: string;
// }

// export const NavigationItems: NavigationItem[] = [
//   {
//     id: 'dashboard',
//     title: 'Dashboard',
//     type: 'group',
//     icon: 'icon-navigation',
//     children: [
//       {
//         id: 'default',
//         title: 'Default',
//         type: 'item',
//         classes: 'nav-item',
//         url: '/dashboard/default',
//         icon: 'dashboard',
//         breadcrumbs: false
//       }
//     ]
//   },
//   {
//     id: 'authentication',
//     title: 'Authentication',
//     type: 'group',
//     icon: 'icon-navigation',
//     children: [
//       {
//         id: 'login',
//         title: 'Login',
//         type: 'item',
//         classes: 'nav-item',
//         url: '/login',
//         icon: 'login',
//         target: true,
//         breadcrumbs: false
//       },
//       {
//         id: 'register',
//         title: 'Register',
//         type: 'item',
//         classes: 'nav-item',
//         url: '/register',
//         icon: 'profile',
//         target: true,
//         breadcrumbs: false
//       }
//     ]
//   },
//   {
//     id: 'utilities',
//     title: 'UI Components',
//     type: 'group',
//     icon: 'icon-navigation',
//     children: [
//       {
//         id: 'typography',
//         title: 'Typography',
//         type: 'item',
//         classes: 'nav-item',
//         url: '/typography',
//         icon: 'font-size'
//       },
//       {
//         id: 'color',
//         title: 'Colors',
//         type: 'item',
//         classes: 'nav-item',
//         url: '/color',
//         icon: 'bg-colors'
//       },
//       {
//         id: 'ant-icons',
//         title: 'Ant Icons',
//         type: 'item',
//         classes: 'nav-item',
//         url: 'https://ant.design/components/icon',
//         icon: 'ant-design',
//         target: true,
//         external: true
//       }
//     ]
//   },

//   {
//     id: 'other',
//     title: 'Other',
//     type: 'group',
//     icon: 'icon-navigation',
//     children: [
//       {
//         id: 'sample-page',
//         title: 'Sample Page',
//         type: 'item',
//         url: '/sample-page',
//         classes: 'nav-item',
//         icon: 'chrome'
//       },
//       {
//         id: 'document',
//         title: 'Document',
//         type: 'item',
//         classes: 'nav-item',
//         url: 'https://codedthemes.gitbook.io/mantis-angular/',
//         icon: 'question',
//         target: true,
//         external: true
//       }
//     ]
//   }
// ];

// export interface NavigationItem {
//   id: string;
//   title: string;
//   type: 'item' | 'collapse' | 'group';
//   icon?: string;
//   url?: string;
//   children?: NavigationItem[];
//   external?: boolean;
//   target?: boolean;
//   breadcrumbs?: boolean;
//   // ...otros campos
// }


// export interface NavigationItem {
//   id: string;
//   title: string;
//   type: 'item' | 'collapse' | 'group';
//   translate?: string;
//   icon?: string;
//   hidden?: boolean;
//   url?: string;
//   classes?: string;
//   groupClasses?: string;
//   exactMatch?: boolean;
//   external?: boolean;
//   target?: boolean;
//   breadcrumbs?: boolean;
//   children?: NavigationItem[];
//   link?: string;
//   description?: string;
//   path?: string;
// }


export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}


export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },

  {
    id: 'configuracion',
    title: 'Configuración',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'tipoCatalogo',
        title: 'Tipo Catálogo',
        type: 'item',
        classes: 'nav-item',
        url: '/tipoCatalogo',
        icon: 'font-size'
      },
      {
        id: 'catalogo',
        title: 'Catálogo',
        type: 'item',
        classes: 'nav-item',
        url: '/catalogo',
        icon: 'bg-colors'
      }
    ]
  },

  {
    id: 'ui-components',
    title: 'UI Components',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'typography',
        title: 'Typography',
        type: 'item',
        classes: 'nav-item',
        url: '/typography',
        icon: 'font-size'
      },
      {
        id: 'color',
        title: 'Colors',
        type: 'item',
        classes: 'nav-item',
        url: '/color',
        icon: 'bg-colors'
      },
      {
        id: 'ant-icons',
        title: 'Ant Icons',
        type: 'collapse',
        classes: 'nav-item',
        icon: 'chrome',
        children: [
          {
            id: 'fa-icons',
            title: 'fa Icons',
            type: 'item',
            url: '/ui/icons/fa',
            icon: 'chrome'
          },
          {
            id: 'fas-icons',
            title: 'fas Icons',
            type: 'item',
            url: '/ui/icons/fas',
            icon: 'bg-colors'
          },
          {
            id: 'clear-icons',
            title: 'Clear Icons',
            type: 'collapse',  // corregido: tiene children, así que debe ser 'collapse'
            url: '/ui/icons/clear',
            icon: 'clear',
            children: [
              {
                id: 'fa-icons-2',
                title: 'fa Icons 2',
                type: 'item',
                url: '/ui/icons/fa2',
                icon: 'fa'
              },
              {
                id: 'fas-icons-2',
                title: 'fas Icons 2',
                type: 'item',
                url: '/ui/icons/fas2',
                icon: 'fas'
              },
              {
                id: 'clear-icons-2',
                title: 'Clear Icons responsable de cartera',
                type: 'item',
                url: '/ui/icons/clear2',
                icon: 'clear'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'login',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/register',
        icon: 'profile',
        target: true,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/mantis-angular/',
        icon: 'question',
        target: true,
        external: true
      }
    ]
  }
];