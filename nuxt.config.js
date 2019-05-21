import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Router
  */
  router: {
    extendRoutes(routes, resolve) {
      // WORKING
      // let index = routes.findIndex(route => route.name === 'index')
      // routes[index] = {
      //   ...routes[index],
      //   components: {
      //     default: routes[index].component,
      //     popup: resolve(__dirname, 'components/PopupDefault.vue')
      //   },
      //   chunkNames: {
      //     popup: 'components/PopupDefault'
      //   }
      // }

      // WORKING
      // let index = routes.findIndex(route => route.name === 'index')
      // const children = [{
      //   name: 'post',
      //   path: 'post/:id',
      //   components: {
      //     default: routes[index].component,
      //     popup: resolve(__dirname, 'components/PopupDefault.vue')
      //   },
      //   chunkNames: {
      //     popup: 'components/PopupDefault'
      //   }
      // }]
      // routes[index]['children'] = children

      // console.log('routes', routes);

      // get all the indexes in array

      let indexes = []

      routes.forEach(el => {
        if (el.name === 'index' || el.name === 'posts') {
          indexes.push(routes.indexOf(el))
        }
      });

      console.log('indexes', indexes)

      // let index = routes.findIndex(route => route.name === 'index')

      indexes.forEach(index => {
        const children = [{
          name: routes[index].name + '-' + 'post', //Need unique names
          path: 'post/:id',
          components: {
            default: routes[index].component,
            popup: resolve(__dirname, 'components/PopupDefault.vue')
          },
          chunkNames: {
            popup: 'components/PopupDefault'
          }
        }]
        routes[index]['children'] = children
      })

      console.log('routes', routes)

      // const children = [{
      //   name: 'post',
      //   path: 'post/:id',
      //   components: {
      //     default: routes[index].component,
      //     popup: resolve(__dirname, 'components/PopupDefault.vue')
      //   },
      //   chunkNames: {
      //     popup: 'components/PopupDefault'
      //   }
      // }]
      // routes[index]['children'] = children



    }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [

  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  styleResources: {
    scss: [
      '~/assets/functions.scss'
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
