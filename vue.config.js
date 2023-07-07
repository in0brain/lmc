module.exports = {
    devServer: {
        open: false,
        port: 8080,
        // 代理
        proxy: {
            '/': {
                target: 'http://10.25.36.151:8079',
                changeOrigin: true
            }
        }
    }
}
