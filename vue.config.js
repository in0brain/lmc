module.exports = {
    devServer: {
        open: false,
        port: 8080,
        // 代理
        proxy: {
            '/': {
                target: 'http://10.25.37.158:8079',
                changeOrigin: true
            }
        }
    }
}
