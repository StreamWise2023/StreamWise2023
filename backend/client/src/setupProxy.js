const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://1b3f-176-52-19-188.ngrok-free.app',
            changeOrigin: true,

        })
    );
};