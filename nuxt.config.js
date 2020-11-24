export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'zapper-mask',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://arwow.ru'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/element-ui', '@/plugins/vue-qr'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-clipboard2',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyAYNcS2XmjydN9HqukhcprqKaYyLyv3Ikk',
          authDomain: 'zapper-mask.firebaseapp.com',
          databaseURL: 'https://zapper-mask.firebaseio.com',
          projectId: 'zapper-mask',
          storageBucket: 'zapper-mask.appspot.com',
          messagingSenderId: '406847081647',
          appId: '1:406847081647:web:f32cf110950de060e6185a',
          measurementId: 'G-3QS7M1GZ5Z',
        },
        services: {
          auth: true, // Just as example. Can be any other service.
          database: true,
          storage: true
        },
      },
    ],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  router: {
    middleware: 'auth'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  },
}
