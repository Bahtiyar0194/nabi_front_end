export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: 'NABI Distribution',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css' }
        ],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#DDCF73' },
    /*
     ** Global CSS
     */
    css: [
        '~assets/css/main.css'
    ],
    /*
     ** Customize the environment variables
     */
    env: {
        baseUrl: process.env.BASE_URL,
        apiBaseUrl: process.env.API_BASE_URL,
    },
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/axios.js',
        '~/plugins/debounce.js',
        '~/plugins/myLib.js',
        { src: '~/plugins/particles.js', ssr: false },
        { src: '~/plugins/notifications-client.js', ssr: false }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/tailwindcss'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/auth-next',
        ['nuxt-i18n', {
            detectBrowserLanguage: {
                useCookie: true,
                cookieKey: 'lang',
                alwaysRedirect: true
            },
            locales: [{
                name: 'Қазақша',
                code: 'kk',
                iso: 'kz-KZ',
                file: 'kz-KZ.js',
                flag_img: 'kaz.svg'
            },
            {
                name: 'Русский',
                code: 'ru',
                iso: 'ru-RU',
                file: 'ru-RU.js',
                flag_img: 'rus.svg'
            },
            {
                name: 'English',
                code: 'en',
                iso: 'en-US',
                file: 'en-US.js',
                flag_img: 'eng.svg'
            }
            ],
            lazy: true,
            langDir: 'lang/',
            strategy: 'no_prefix',
            defaultLocale: 'ru',
        }]
    ],
    auth: {
        localStorage: false,
        strategies: {
            'laravelJWT': {
                provider: 'laravel/jwt',
                url: 'api/',
                endpoints: {
                    login: { url: 'auth/login', method: 'post', propertyName: false },
                    user: { url: 'auth/profile', method: 'get', propertyName: false },
                    refresh: { url: 'auth/refresh', method: 'post', propertyName: false },
                    logout: { url: 'auth/logout', method: 'post', propertyName: false }
                },
                token: {
                    property: 'access_token',
                    maxAge: 60 * 24
                },
                refreshToken: {
                    maxAge: 20160 * 60
                },
            },
        },
        redirect: {
            login: '/auth/login',
            callback: '/',
            user: '/office'
        },
        plugins: ['@/plugins/auth-lang-redirect.js']
    },

    pwa: {
        meta: {
            title: 'Nabi Distribution',
            author: 'Kalauov Bakhtiyar',
            theme_color: '#005564'
        },
        manifest: {
            name: 'Nabi Distribution',
            short_name: 'Nabi',
            lang: 'ru',
            display: 'standalone',
            background_color: '#031c20'
        },
        icon: {
            source: 'assets/img/icon/icon.png',
            sizes: [64, 120, 144, 152, 192, 384, 512]
        }
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        standalone: true,
        extend(config, ctx) { }
    }
}