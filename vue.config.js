module.exports = {
    devServer: {
        open: false,
        port: 8080,
        // 代理
        proxy: {
            '/': {
                target: 'http://172.18.13.210:8079',
                // target: 'http://10.25.38.105:8079',
                changeOrigin: true
            }
        }
    }
}
