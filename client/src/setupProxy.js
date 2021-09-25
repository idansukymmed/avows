const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    const path = require('path');
    require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

    app.use('/api/', createProxyMiddleware({
        target: `${process.env.LOCALIPADDRESS}:3018`,
        changeOrigin: true,
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        }
    }))
}