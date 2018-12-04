module.exports = {
  proxy: {
    '/proxy': {    //将www.exaple.com印射为/proxy
      target: 'http://106.12.108.23:8080',  // 接口域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/proxy': ''   //需要rewrite的,
      }
    }
  }
}
