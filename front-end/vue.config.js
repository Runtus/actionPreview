module.exports = {
    lintOnSave: false ,  // 取消 eslint 验证
    publicPath : process.env.NODE_ENV === "production" ? "/" : "/", //部署应用包时的基本 URL
    indexPath: "index.html",
    productionSourceMap : false,
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction || devNeedCdn) args[0].cdn = cdn;
            return args
        })
    },
    configureWebpack: config => {
        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) {config.externals = cdn.externals}
    }
};


// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

const devNeedCdn = false;

const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        // vuex: 'Vuex',
        'vue-router': 'VueRouter',
        // 'axios' : 'axios',
    },
    // cdn的css链接
    css: [],
    // cdn的js链接
    js: [
        'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
        // 'http://lib.baomitu.com/vuex/3.1.2/vuex.esm.browser.js',
        'https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js',
        // 'https://unpkg.com/axios/dist/axios.min.js',

    ]
};

