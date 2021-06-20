module.exports = {
    devServer : {
        proxy : {
            '/dianying' : {
                target : 'https://m.maoyan.com',
                changeOrigin : true
            },
            '/ajax' : {
                target : 'https://m.maoyan.com',
                changeOrigin : true
            }
        }
    }
}